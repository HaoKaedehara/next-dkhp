'use client';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SharedDataGrid from '@/components/admin/SharedDataGrid';
import ShareToolbar from '@/components/admin/ShareToolbar';
import { dangKyColumns } from '@/features/qly-dang-ky/columns';
import { useRegistrations } from '@/features/qly-dang-ky/hooks/useRegistrations';
import {
    FileDownload as ExportIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Send as SendIcon
} from '@mui/icons-material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import type { BulkAction } from '@/components/admin/DropdownMenu';

export default function RegistrationsPage() {
    const router = useRouter();
    const { rows, rowCount, loading, query, setQuery, paginationModel, setPaginationModel, sortModel, setSortModel } = useRegistrations();
    const [selectedCount, setSelectedCount] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue === 1) {
            router.push('/admin/qly-dang-ky/huy-dang-ky');
        }
        // newValue === 0 thì ở trang hiện tại rồi
    };

    // Định nghĩa các bulk actions cho đăng ký
    const bulkActions: BulkAction[] = [
        {
            label: 'Xuất danh sách đã chọn',
            icon: <ExportIcon />,
            onClick: () => alert('TODO: Xuất các đăng ký đã chọn'),
        },
        {
            label: 'Gửi email thông báo',
            icon: <SendIcon />,
            onClick: () => alert('TODO: Gửi email cho các đăng ký đã chọn'),
        },
        {
            label: 'Duyệt hàng loạt',
            icon: <EditIcon />,
            onClick: () => alert('TODO: Duyệt hàng loạt đăng ký'),
            divider: true,
        },
        {
            label: 'Xóa đã chọn',
            icon: <DeleteIcon />,
            onClick: () => {
                if (confirm('Bạn có chắc muốn xóa các đăng ký đã chọn?')) {
                    alert('TODO: Xóa các đăng ký đã chọn');
                }
            },
        },
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: 0,
            marginTop: '-14px',
        }}>
            {/* Page Title */}
            {/* <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
                Quản lý đăng ký
            </Typography> */}

            {/* Navigation Tabs */}
            <Box sx={{ width: '100%', mb: 2 }}>
                <Tabs
                    value={0} // Trang hiện tại là tab 0 (Đăng ký)
                    onChange={handleTabChange}
                    aria-label="registration navigation tabs"
                    // textColor="secondary"
                    sx={{
                        // borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Tab label="Đăng ký" />
                    <Tab label="Hủy Đăng ký" />
                    {/* <Tab icon={<PlaylistPlayIcon />} iconPosition="start" label="Đăng ký" />
                    <Tab icon={<PlaylistRemoveIcon />} iconPosition="start" label="Hủy Đăng ký" /> */}
                </Tabs>
            </Box>

            {/* ShareToolbar */}
            <ShareToolbar
                query={query}
                onQueryChange={setQuery}
                onAdd={() => alert('TODO: mở dialog thêm đăng ký')}
                placeholder="Tìm (mã SV/mã HP/tên HP/nhóm)"
                addLabel="Thêm đăng ký"
                showExport={true}
                onExport={() => alert('TODO: xuất danh sách đăng ký')}
                exportLabel="Xuất danh sách"
                showFilter={true}
                onFilter={() => alert('TODO: mở dialog filter đăng ký')}
                bulkActions={bulkActions}
                selectedCount={selectedCount}
            />

            {/* DataGrid Container */}
            <Box sx={{
                flexGrow: 1,
                minHeight: 0,
                width: '100%',
                '& .MuiDataGrid-root': {
                    height: '100%',
                    maxHeight: 'none',
                }
            }}>
                <SharedDataGrid
                    rows={rows}
                    columns={dangKyColumns}
                    rowCount={rowCount}
                    loading={loading}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    sortModel={sortModel}
                    onSortModelChange={setSortModel}
                    checkboxSelection
                    storageKey="grid:prefs:dang_ky"
                    getRowId={(row) => row.id}
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialPageSize={25}
                    onRowSelectionChange={(selection) => {
                        // Tính selectedCount từ GridRowSelectionModel
                        let count = 0;
                        if (Array.isArray(selection)) {
                            count = selection.length;
                        } else if (selection && typeof selection === 'object' && 'ids' in selection) {
                            const selectionObj = selection as { ids: Set<any> };
                            count = selectionObj.ids.size;
                        }
                        setSelectedCount(count);
                    }}
                />
            </Box>
        </Box>
    );
}