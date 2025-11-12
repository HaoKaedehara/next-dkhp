'use client';
import type { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { DangKy, HuyDangKy } from './types';

const fmtDate = (v: unknown) => {
    if (!v) return '';
    try { return new Date(String(v)).toLocaleString(); } catch { return String(v); }
};

const fmtBoolean = (value: boolean | null) => {
    if (value === null) return 'N/A';
    return value ? 'Có' : 'Không';
};

export const dangKyColumns: GridColDef<DangKy>[] = [
    { field: 'id', headerName: 'ID', type: 'number', minWidth: 80, flex: 0.3, sortable: true },
    { field: 'masv', headerName: 'Mã SV', type: 'number', minWidth: 110, flex: 0.5, sortable: true },
    { field: 'ma_lop_hoc_phan', headerName: 'Mã LHP', minWidth: 130, flex: 0.7, sortable: true },
    { field: 'ma_hoc_phan', headerName: 'Mã HP', minWidth: 120, flex: 0.6, sortable: true },
    { field: 'ten_hoc_phan', headerName: 'Tên học phần', minWidth: 250, flex: 1.2, sortable: true },
    { field: 'nhom', headerName: 'Nhóm', minWidth: 100, flex: 0.5 },
    { field: 'loai_dang_ky', headerName: 'Loại ĐK', type: 'number', minWidth: 100, flex: 0.5, sortable: true },
    { field: 'dot_dang_ky', headerName: 'Đợt ĐK', type: 'number', minWidth: 100, flex: 0.5, sortable: true },
    { field: 'hoc_ky', headerName: 'Học kỳ', type: 'number', minWidth: 100, flex: 0.5, sortable: true },
    {
        field: 'waited',
        headerName: 'Chờ',
        minWidth: 80,
        flex: 0.4,
        type: 'boolean',
        renderCell: (p) => (
            <Chip 
                size="small" 
                variant="outlined" 
                color={p.value ? 'warning' : 'default'} 
                label={fmtBoolean(p.value)} 
            />
        ),
    },
    {
        field: 'trang_thai',
        headerName: 'Trạng thái',
        minWidth: 120,
        flex: 0.6,
        type: 'boolean',
        renderCell: (p) => (
            <Chip 
                size="small" 
                variant="outlined" 
                color={p.value ? 'success' : 'error'} 
                label={p.value ? 'Hoạt động' : 'Không hoạt động'} 
            />
        ),
    },
    {
        field: 'status',
        headerName: 'Trạng thái hệ thống',
        minWidth: 150,
        flex: 0.8,
        type: 'boolean',
        renderCell: (p) => (
            <Chip 
                size="small" 
                variant="outlined" 
                color={p.value ? 'success' : 'default'} 
                label={p.value ? 'Kích hoạt' : 'Tắt'} 
            />
        ),
    },
    {
        field: 'da_gui',
        headerName: 'Đã gửi',
        minWidth: 100,
        flex: 0.5,
        type: 'boolean',
        renderCell: (p) => (
            <Chip 
                size="small" 
                variant="outlined" 
                color={p.value ? 'info' : 'default'} 
                label={fmtBoolean(p.value)} 
            />
        ),
    },
    { field: 'ly_do', headerName: 'Lý do', minWidth: 200, flex: 1, sortable: false },
    { field: 'ghi_chu', headerName: 'Ghi chú', minWidth: 200, flex: 1, sortable: false },
    { field: 'created_at', headerName: 'Tạo lúc', minWidth: 160, flex: 0.8, valueFormatter: (params) => fmtDate(params?.value), sortable: true },
    { field: 'updated_at', headerName: 'Cập nhật', minWidth: 160, flex: 0.8, valueFormatter: (params) => fmtDate(params?.value), sortable: true },
    { field: 'approved_at', headerName: 'Duyệt lúc', minWidth: 160, flex: 0.8, valueFormatter: (params) => fmtDate(params?.value), sortable: true },
    { field: 'deadline_at', headerName: 'Hạn chót', minWidth: 160, flex: 0.8, valueFormatter: (params) => fmtDate(params?.value), sortable: true },
];

export const huyDangKyColumns: GridColDef<HuyDangKy>[] = [
    { field: 'id', headerName: 'ID', type: 'number', minWidth: 80, flex: 0.3, sortable: true },
    { field: 'masv', headerName: 'Mã SV', type: 'number', minWidth: 110, flex: 0.5, sortable: true },
    { field: 'ma_hoc_phan', headerName: 'Mã HP', minWidth: 120, flex: 0.6, sortable: true },
    { field: 'ten_hoc_phan', headerName: 'Tên học phần', minWidth: 250, flex: 1.2, sortable: true },
    { field: 'dot_dang_ky', headerName: 'Đợt ĐK', type: 'number', minWidth: 100, flex: 0.5, sortable: true },
    { field: 'loai_dang0_ky', headerName: 'Loại ĐK', type: 'number', minWidth: 100, flex: 0.5, sortable: true },
    { field: 'hoc0_ky', headerName: 'Học kỳ', type: 'number', minWidth: 100, flex: 0.5, sortable: true },
    {
        field: 'trang_thai',
        headerName: 'Trạng thái',
        minWidth: 120,
        flex: 0.6,
        type: 'boolean',
        renderCell: (p) => (
            <Chip 
                size="small" 
                variant="outlined" 
                color={p.value ? 'success' : 'error'} 
                label={p.value ? 'Đã duyệt' : 'Chờ duyệt'} 
            />
        ),
    },
    { field: 'ly_do', headerName: 'Lý do hủy', minWidth: 200, flex: 1, sortable: false },
    { field: 'ghi_chu', headerName: 'Ghi chú', minWidth: 200, flex: 1, sortable: false },
    { field: 'cccd_mt', headerName: 'CCCD Mặt trước', minWidth: 180, flex: 0.9, sortable: false },
    { field: 'cccd_ms', headerName: 'CCCD Mặt sau', minWidth: 180, flex: 0.9, sortable: false },
    { field: 'created_at', headerName: 'Tạo lúc', minWidth: 160, flex: 0.8, valueFormatter: (params) => fmtDate(params?.value), sortable: true },
    { field: 'updated_at', headerName: 'Cập nhật', minWidth: 160, flex: 0.8, valueFormatter: (params) => fmtDate(params?.value), sortable: true },
];