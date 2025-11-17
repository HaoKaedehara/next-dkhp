'use client';
import type { GridColDef } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { SinhVien } from './types';


const fmtDate = (v: unknown) => {
    if (!v) return '';
    try { return new Date(String(v)).toLocaleString(); } catch { return String(v); }
};


export const studentColumns: GridColDef<SinhVien>[] = [
    {   
        field: 'masv', headerName: 'Mã SV', type: 'number', minWidth: 110, flex: 0.5, sortable: true,
        renderCell: (p) => (<>{p.value}</>),
    },
    { field: 'ho_ten', headerName: 'Họ tên', minWidth: 180, flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', minWidth: 220, flex: 1 },
    { field: 'lop', headerName: 'Lớp', minWidth: 120, flex: 0.6, sortable: true },
    { field: 'gioi_tinh', headerName: 'Giới tính', minWidth: 110, flex: 0.5 },
    { field: 'ngay_sinh', headerName: 'Ngày sinh', minWidth: 130, flex: 0.6 },
    { field: 'noi_sinh', headerName: 'Nơi sinh', minWidth: 180, flex: 0.9 },
    { field: 'cccd', headerName: 'CCCD', minWidth: 150, flex: 0.8 },
    { field: 'dien_thoai', headerName: 'Điện thoại', minWidth: 140, flex: 0.7 },
    {
        field: 'dangnhap_0st',
        headerName: 'Kích hoạt',
        minWidth: 120,
        flex: 0.6,
        type: 'boolean',
        renderCell: (p) => (
            <Chip size="small" variant="outlined" color={p.value ? 'success' : 'default'} label={p.value ? 'Đã kích hoạt' : 'Chưa'} />
        ),
    },
    { field: 'cccd_mt', headerName: 'CCCD Mặt trước (URL)', minWidth: 220, flex: 1, sortable: false },
    { field: 'cccd_ms', headerName: 'CCCD Mặt sau (URL)', minWidth: 220, flex: 1, sortable: false },
    { field: 'created_at', headerName: 'Tạo lúc', minWidth: 160, flex: 0.8, valueFormatter: ({ value }) => fmtDate(value), sortable: true },
    { field: 'updated_at', headerName: 'Cập nhật', minWidth: 160, flex: 0.8, valueFormatter: ({ value }) => fmtDate(value), sortable: true },
];