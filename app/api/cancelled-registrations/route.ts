import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs'; // Prisma cần Node runtime

// GET /api/cancelled-registrations?page=0&pageSize=10&query=...&sortField=...&sortDir=asc|desc
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? '0'); // 0-based
    const pageSize = Number(searchParams.get('pageSize') ?? '10');
    const query = searchParams.get('query') ?? '';
    const sortField = (searchParams.get('sortField') ?? 'created_at') as
        | 'id' | 'masv' | 'ma_hoc_phan' | 'ten_hoc_phan' | 'dot_dang_ky' | 'loai_dang0_ky' 
        | 'hoc0_ky' | 'trang_thai' | 'created_at' | 'updated_at';
    const sortDir = (searchParams.get('sortDir') ?? 'desc') as 'asc' | 'desc';

    const where = query
        ? {
            OR: [
                { ma_hoc_phan: { contains: query } },
                { ten_hoc_phan: { contains: query } },
                { ly_do: { contains: query } },
                { ghi_chu: { contains: query } },
                { cccd_mt: { contains: query } },
                { cccd_ms: { contains: query } },
                // masv là Int: cho phép tìm khi query là số
                ...(Number.isFinite(Number(query)) ? [{ masv: Number(query) }] : []),
                // id là Int
                ...(Number.isFinite(Number(query)) ? [{ id: Number(query) }] : []),
                // dot_dang_ky là Int
                ...(Number.isFinite(Number(query)) ? [{ dot_dang_ky: Number(query) }] : []),
                // loai_dang0_ky là Int
                ...(Number.isFinite(Number(query)) ? [{ loai_dang0_ky: Number(query) }] : []),
                // hoc0_ky là Int
                ...(Number.isFinite(Number(query)) ? [{ hoc0_ky: Number(query) }] : []),
            ],
        }
        : {};

    const [rows, total] = await Promise.all([
        prisma.huy_dang_ky.findMany({
            where,
            orderBy: [
                { [sortField]: sortDir },
                { id: 'asc' } // Secondary sort by id to ensure stable pagination
            ],
            skip: page * pageSize,
            take: pageSize,
        }),
        prisma.huy_dang_ky.count({ where }),
    ]);

    return NextResponse.json({ rows, total });
}

// POST /api/cancelled-registrations (tạo mới hủy đăng ký)
export async function POST(req: Request) {
    const body = await req.json();
    
    // Validate các trường bắt buộc
    if (typeof body.masv !== 'number' || !body.ly_do) {
        return NextResponse.json({ 
            message: 'masv (number) và ly_do (string) là bắt buộc' 
        }, { status: 400 });
    }

    // Đặt giá trị mặc định
    const dataToCreate = {
        ...body,
        trang_thai: body.trang_thai ?? false, // Mặc định là chờ duyệt
        ghi_chu: body.ghi_chu ?? '',
        he_thong: body.he_thong ?? 'Manual input',
    };

    try {
        const created = await prisma.huy_dang_ky.create({ data: dataToCreate });
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error('Error creating cancelled registration:', error);
        return NextResponse.json({ 
            message: 'Lỗi khi tạo hủy đăng ký' 
        }, { status: 500 });
    }
}