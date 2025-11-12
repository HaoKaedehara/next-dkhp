import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { GridFilterModel } from '@mui/x-data-grid';


export const runtime = 'nodejs'; // Prisma cần Node runtime


// GET /api/students?page=0&pageSize=10&query=...&sortField=...&sortDir=asc|desc&filterModel=...
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') ?? '0'); // 0-based
    const pageSize = Number(searchParams.get('pageSize') ?? '10');
    const query = searchParams.get('query') ?? '';
    const sortField = (searchParams.get('sortField') ?? 'created_at') as
        | 'masv' | 'ho_ten' | 'ngay_sinh' | 'noi_sinh' | 'gioi_tinh' | 'cccd' | 'email' | 'dien_thoai' | 'lop' | 'dangnhap_0st' | 'created_at' | 'updated_at';
    const sortDir = (searchParams.get('sortDir') ?? 'desc') as 'asc' | 'desc';
    
    // Parse filterModel từ query params
    const filterModelStr = searchParams.get('filterModel');
    let filterModel: GridFilterModel | null = null;
    if (filterModelStr) {
        try {
            filterModel = JSON.parse(filterModelStr);
        } catch (e) {
            console.error('Invalid filterModel JSON:', e);
        }
    }

    // Build where clause cho global search
    const searchWhere = query
        ? {
            OR: [
                { ho_ten: { contains: query } },
                { email: { contains: query } },
                { lop: { contains: query } },
                { cccd: { contains: query } },
                { dien_thoai: { contains: query } },
                // masv là Int: cho phép tìm khi query là số
                ...(Number.isFinite(Number(query)) ? [{ masv: Number(query) }] : []),
            ],
        }
        : {};

    // Build where clause từ filterModel
    const filterWhere: any = {};
    if (filterModel && filterModel.items && filterModel.items.length > 0) {
        const conditions: any[] = [];
        
        filterModel.items.forEach((item: any) => {
            const { field, operator, value } = item;
            if (!field || !operator || value === undefined || value === null || value === '') return;

            let condition: any = {};
            
            switch (operator) {
                case 'contains':
                    condition[field] = { contains: value };
                    break;
                case 'equals':
                    // Nếu là số field (masv)
                    if (field === 'masv' && Number.isFinite(Number(value))) {
                        condition[field] = Number(value);
                    } else {
                        condition[field] = value;
                    }
                    break;
                case 'startsWith':
                    condition[field] = { startsWith: value };
                    break;
                case 'endsWith':
                    condition[field] = { endsWith: value };
                    break;
                case 'isEmpty':
                    condition[field] = null;
                    break;
                case 'isNotEmpty':
                    condition[field] = { not: null };
                    break;
                case '>':
                    condition[field] = { gt: Number(value) };
                    break;
                case '>=':
                    condition[field] = { gte: Number(value) };
                    break;
                case '<':
                    condition[field] = { lt: Number(value) };
                    break;
                case '<=':
                    condition[field] = { lte: Number(value) };
                    break;
                case '!=':
                    condition[field] = { not: value };
                    break;
                default:
                    console.warn(`Unsupported operator: ${operator}`);
            }
            
            if (Object.keys(condition).length > 0) {
                conditions.push(condition);
            }
        });

        // Áp dụng logic operator (AND hoặc OR)
        if (conditions.length > 0) {
            const logicOperator = filterModel.logicOperator || 'and';
            if (logicOperator === 'or') {
                filterWhere.OR = conditions;
            } else {
                filterWhere.AND = conditions;
            }
        }
    }

    // Merge search where và filter where
    const where = Object.keys(searchWhere).length > 0 && Object.keys(filterWhere).length > 0
        ? { AND: [searchWhere, filterWhere] }
        : Object.keys(filterWhere).length > 0
            ? filterWhere
            : searchWhere;


    const [rows, total] = await Promise.all([
        prisma.sinh_vien.findMany({
            where,
            orderBy: [
                { [sortField]: sortDir },
                { masv: 'asc' } // Secondary sort by masv to ensure stable pagination
            ],
            skip: page * pageSize,
            take: pageSize,
        }),
        prisma.sinh_vien.count({ where }),
    ]);


    return NextResponse.json({ rows, total });
}


// POST /api/students (tạo mới; validate tối thiểu)
export async function POST(req: Request) {
    const body = await req.json();
    // Tùy bạn: dùng Zod để validate chặt chẽ hơn
    if (typeof body.masv !== 'number' || !body.ho_ten) {
        return NextResponse.json({ message: 'masv (number) và ho_ten (string) là bắt buộc' }, { status: 400 });
    }
    const created = await prisma.sinh_vien.create({ data: body });
    return NextResponse.json(created, { status: 201 });
}