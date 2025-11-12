'use client';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import SharedDataGrid from '@/components/admin/SharedDataGrid';
import ShareToolbar from '@/components/admin/ShareToolbar';
import { studentColumns } from '@/features/students/columns';
import { useStudents } from '@/features/students/hooks/useStudents';
import {
    FileDownload as ExportIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Send as SendIcon
} from '@mui/icons-material';
import type { BulkAction } from '@/components/admin/DropdownMenu';

import ColumnDialog from '@/components/admin/ColumnDialog';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';


export default function StudentsPage() {

    // State cho thứ tự cột
    const [columnOrder, setColumnOrder] = useState<string[]>(studentColumns.map(col => col.field));

    // columns được sắp xếp lại theo columnOrder
    const orderedColumns = columnOrder.map(field => studentColumns.find(col => col.field === field)).filter(Boolean) as typeof studentColumns;

    // State cho dialog cột
    const [openColumnDialog, setOpenColumnDialog] = useState(false);
    const handleOpenColumnDialog = () => setOpenColumnDialog(true);
    const handleCloseColumnDialog = () => setOpenColumnDialog(false);
    const { rows, rowCount, loading, query, setQuery, paginationModel, setPaginationModel, sortModel, setSortModel, filterModel, setFilterModel } = useStudents();
    const [selectedCount, setSelectedCount] = useState(0);


    // State cho model hiển thị cột
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        studentColumns.forEach(col => { initial[col.field] = true; });
        return initial;
    });


    // Định nghĩa các bulk actions
    const bulkActions: BulkAction[] = [
        {
            label: 'Xuất đã chọn',
            icon: <ExportIcon />,
            onClick: () => alert('TODO: Xuất các sinh viên đã chọn'),
        },
        {
            label: 'Gửi email',
            icon: <SendIcon />,
            onClick: () => alert('TODO: Gửi email cho các sinh viên đã chọn'),
        },
        {
            label: 'Chỉnh sửa hàng loạt',
            icon: <EditIcon />,
            onClick: () => alert('TODO: Chỉnh sửa hàng loạt'),
            divider: true,
        },
        {
            label: 'Xóa đã chọn',
            icon: <DeleteIcon />,
            onClick: () => {
                if (confirm('Bạn có chắc muốn xóa các sinh viên đã chọn?')) {
                    alert('TODO: Xóa các sinh viên đã chọn');
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
        }}>
            {/* Page Title */}
            <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
                Quản lý sinh viên
            </Typography>

            {/* ShareToolbar - Độc lập ở ngoài */}
            <ShareToolbar
                query={query}
                onQueryChange={setQuery}
                onAdd={() => alert('TODO: mở dialog tạo sinh viên')}
                placeholder="Tìm (mã/tên/email/lớp/CCCD/điện thoại)"
                addLabel="Thêm sinh viên"
                showExport={true}
                onExport={() => alert('TODO: xuất danh sách sinh viên')}
                exportLabel="Xuất danh sách"
                showFilter={true}
                onFilter={() => alert('TODO: mở dialog filter sinh viên')}
                bulkActions={bulkActions}
                selectedCount={selectedCount}
                onShowColumnDialog={handleOpenColumnDialog}
                showColumnDialogLabel="Cột"

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
                    columns={orderedColumns}
                    rowCount={rowCount}
                    loading={loading}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    sortModel={sortModel}
                    onSortModelChange={setSortModel}
                    filterModel={filterModel}
                    onFilterModelChange={setFilterModel}
                    checkboxSelection
                    storageKey="grid:prefs:sinh_vien"
                    getRowId={(row) => row.masv}
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialPageSize={25}
                    columnVisibilityModel={visibleColumns}
                    onColumnVisibilityModelChange={setVisibleColumns}
                    enableFilter={true}
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
            {/* Dialog chọn cột và sắp xếp */}
            <ColumnDialog
                open={openColumnDialog}
                onClose={handleCloseColumnDialog}
                columns={studentColumns}
                visibleColumns={visibleColumns}
                onChange={setVisibleColumns}
                columnOrder={columnOrder}
                onOrderChange={setColumnOrder}
            />
        </Box>
    );
}