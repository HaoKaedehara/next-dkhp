import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs'; // Prisma cần Node runtime

// GET /api/registrations?page=0&pageSize=10&query=...&sortField=...&sortDir=asc|desc
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? '0'); // 0-based
    const pageSize = Number(searchParams.get('pageSize') ?? '10');
    const query = searchParams.get('query') ?? '';
    const sortField = (searchParams.get('sortField') ?? 'created_at') as
        | 'id' | 'masv' | 'ma_lop_hoc_phan' | 'ma_hoc_phan' | 'ten_hoc_phan' | 'nhom' | 'loai_dang_ky' 
        | 'dot_dang_ky' | 'hoc_ky' | 'trang_thai' | 'status' | 'created_at' | 'updated_at' | 'approved_at' | 'deadline_at';
    const sortDir = (searchParams.get('sortDir') ?? 'desc') as 'asc' | 'desc';

    const where = query
        ? {
            OR: [
                { ma_lop_hoc_phan: { contains: query } },
                { ma_hoc_phan: { contains: query } },
                { ten_hoc_phan: { contains: query } },
                { nhom: { contains: query } },
                { ly_do: { contains: query } },
                { ghi_chu: { contains: query } },
                // masv là Int: cho phép tìm khi query là số
                ...(Number.isFinite(Number(query)) ? [{ masv: Number(query) }] : []),
                // id là Int
                ...(Number.isFinite(Number(query)) ? [{ id: Number(query) }] : []),
                // loai_dang_ky là Int
                ...(Number.isFinite(Number(query)) ? [{ loai_dang_ky: Number(query) }] : []),
                // dot_dang_ky là Int
                ...(Number.isFinite(Number(query)) ? [{ dot_dang_ky: Number(query) }] : []),
                // hoc_ky là Int
                ...(Number.isFinite(Number(query)) ? [{ hoc_ky: Number(query) }] : []),
            ],
        }
        : {};

    const [rows, total] = await Promise.all([
        prisma.dang_ky.findMany({
            where,
            orderBy: [
                { [sortField]: sortDir },
                { id: 'asc' } // Secondary sort by id to ensure stable pagination
            ],
            skip: page * pageSize,
            take: pageSize,
        }),
        prisma.dang_ky.count({ where }),
    ]);

    return NextResponse.json({ rows, total });
}

// POST /api/registrations (tạo mới đăng ký)
export async function POST(req: Request) {
    const body = await req.json();
    
    // Validate các trường bắt buộc
    if (typeof body.masv !== 'number' || typeof body.loai_dang_ky !== 'number') {
        return NextResponse.json({ 
            message: 'masv (number) và loai_dang_ky (number) là bắt buộc' 
        }, { status: 400 });
    }

    // Đặt giá trị mặc định
    const dataToCreate = {
        ...body,
        status: body.status ?? true,
        trang_thai: body.trang_thai ?? true,
        waited: body.waited ?? false,
        da_gui: body.da_gui ?? false,
        ghi_chu: body.ghi_chu ?? '',
    };

    try {
        const created = await prisma.dang_ky.create({ data: dataToCreate });
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error('Error creating registration:', error);
        return NextResponse.json({ 
            message: 'Lỗi khi tạo đăng ký' 
        }, { status: 500 });
    }
}