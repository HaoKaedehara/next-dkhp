"use client";
import * as React from "react";
import {
    DataGrid,
    type GridPaginationModel,
    type GridSortModel,
    type GridColDef,
    type GridRowSelectionModel,
    type GridValidRowModel,
    GridToolbarFilterButton,
    useGridSelector,
    useGridApiContext,
    gridPageCountSelector,
    type GridFilterModel,
} from "@mui/x-data-grid";
import { Box, Stack, Typography, TextField } from "@mui/material";
import ShareToolbar, { type ShareToolbarProps } from "./ShareToolbar";
import DropdownMenu, { type BulkAction } from "./DropdownMenu";
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Pagination({
    page,
    onPageChange,
    className,
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const [pageInput, setPageInput] = React.useState<string>('');

    const handleGoToPage = () => {
        const targetPage = parseInt(pageInput, 10);
        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= pageCount) {
            onPageChange({} as any, targetPage - 1);
            setPageInput('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleGoToPage();
        }
    };

    const currentPage = page + 1;

    return (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: 'auto', px: 2 }}>
            {/* Previous button */}
            <Typography
                component="span"
                onClick={() => currentPage > 1 && onPageChange({} as any, page - 1)}
                sx={{
                    cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
                    opacity: currentPage > 1 ? 1 : 0.5,
                    fontSize: '1.2rem', userSelect: 'none',
                    px: 1,
                }}
            >
                <ArrowBackIosIcon sx={{ verticalAlign: 'text-bottom' }} />
            </Typography>

            {/* First page */}
            <Typography
                component="span"
                onClick={() => onPageChange({} as any, 0)}
                sx={{
                    cursor: 'pointer',
                    fontWeight: currentPage === 1 ? 'bold' : 'normal',
                    color: currentPage === 1 ? 'primary.main' : 'text.primary',
                    fontSize: '0.875rem',
                    px: 1,
                    userSelect: 'none',
                }}
            >
                1
            </Typography>

            {/* Ellipsis before input */}
            {pageCount > 2 && (
                <Typography variant="body2" color="text.secondary"></Typography>
            )}

            {/* Go to page input */}
            <TextField
                size="small"
                type="number"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={handleGoToPage}
                placeholder={`${currentPage}`}
                sx={{
                    width: 60,
                    '& input': {
                        textAlign: 'center',
                        padding: '4px 6px',
                        fontSize: '0.875rem',
                    },
                }}
                InputProps={{
                    inputProps: {
                        min: 1,
                        max: pageCount,
                        'aria-label': 'Go to page'
                    }
                }}
            />

            {/* Ellipsis after input */}
            {pageCount > 2 && (
                <Typography variant="body2" color="text.secondary"></Typography>
            )}

            {/* Last page */}
            {pageCount > 1 && (
                <Typography
                    component="span"
                    onClick={() => onPageChange({} as any, pageCount - 1)}
                    sx={{
                        cursor: 'pointer',
                        fontWeight: currentPage === pageCount ? 'bold' : 'normal',
                        color: currentPage === pageCount ? 'primary.main' : 'text.primary',
                        fontSize: '0.875rem',
                        px: 1,
                        userSelect: 'none',
                    }}
                >
                    {pageCount}
                </Typography>
            )}

            {/* Next button */}
            <Typography
                component="p"
                onClick={() => currentPage < pageCount && onPageChange({} as any, page + 1)}
                sx={{
                    cursor: currentPage < pageCount ? 'pointer' : 'not-allowed',
                    opacity: currentPage < pageCount ? 1 : 0.5,
                    fontSize: '1.2rem',
                    userSelect: 'none',
                    px: 1,
                }}
            >
                <ArrowForwardIosIcon sx={{ verticalAlign: 'text-bottom' }} />
            </Typography>
        </Stack>
    );
}

export type SharedDataGridProps<T extends GridValidRowModel = GridValidRowModel> = {
    rows: T[];
    columns: GridColDef<T>[];
    rowCount?: number;
    loading?: boolean;
    paginationModel?: GridPaginationModel;
    onPaginationModelChange?: (m: GridPaginationModel) => void;
    sortModel?: GridSortModel;
    onSortModelChange?: (m: GridSortModel) => void;
    filterModel?: GridFilterModel;
    onFilterModelChange?: (m: GridFilterModel) => void;
    checkboxSelection?: boolean;
    height?: number | string;
    storageKey?: string;
    defaultColumnVisibilityModel?: Record<string, boolean>;
    columnVisibilityModel?: Record<string, boolean>;
    onColumnVisibilityModelChange?: (model: Record<string, boolean>) => void;
    getRowId?: (r: T) => string | number;
    toolbarConfig?: ShareToolbarProps;
    pageSizeOptions?: number[];
    initialPageSize?: number;
    onRowSelectionChange?: (selection: GridRowSelectionModel) => void;
    /** Giữ lại selections ngay cả khi hàng không còn trong dataset (useful cho server-side pagination) */
    keepNonExistentRowsSelected?: boolean;
    /** Bulk actions khi có items được chọn */
    bulkActions?: BulkAction[];
    /** Enable built-in DataGrid filter panel */
    enableFilter?: boolean;
};

// Custom Toolbar that shows selection count (using props instead of hooks)
// const CustomToolbarWithSelection = React.memo(({
//     toolbarConfig,
//     selectedCount,
//     bulkActions,
//     enableFilter = false,
// }: {
//     toolbarConfig?: ShareToolbarProps;
//     selectedCount: number;
//     bulkActions?: BulkAction[];
//     enableFilter?: boolean;
// }) => {
//     // LUÔN render toolbar nếu có toolbarConfig, bất kể selectedCount
//     if (!toolbarConfig) {
//         return null;
//     }

//     return (
//         <Box
//             sx={{
//                 p: 2,
//                 borderBottom: 1,
//                 borderColor: 'divider',
//             }}
//         >
//             <Stack
//                 direction="row"
//                 spacing={2}
//                 alignItems="center"
//                 sx={{
//                     width: '100%',
//                     px: 2,
//                     py: 1,
//                     borderBottom: selectedCount > 0 ? 1 : 0,
//                     borderColor: 'divider',
//                     minHeight: selectedCount > 0 ? 'auto' : 0,
//                 }}
//             >
//                 {/* Built-in DataGrid Filter Button */}
//                 {enableFilter && (
//                     <Box sx={{ mr: 1 }}>
//                         <GridToolbarFilterButton />
//                     </Box>
//                 )}

//                 {/* Selection Count - hiển thị khi có checkbox selection */}
//                 {selectedCount > 0 && (
//                     <Typography
//                         variant="body2"
//                         sx={{
//                             fontWeight: 600,
//                             minWidth: 'fit-content',
//                             height: 40,
//                         }}
//                     >
//                         {selectedCount} hàng đã chọn
//                     </Typography>
//                 )}

//                 {/* Share Toolbar actions with bulk actions integrated */}
//                 {toolbarConfig && (
//                     <Box sx={{ flex: 1, ml: selectedCount > 0 ? 2 : 0, height: 40 }}>
//                         <ShareToolbar
//                             {...toolbarConfig}
//                             disableMargin
//                             bulkActions={bulkActions}
//                             selectedCount={selectedCount}
//                         />
//                     </Box>
//                 )}
//             </Stack>
//         </Box>
//     );
// });


const SharedDataGrid = React.memo(function SharedDataGrid<T extends GridValidRowModel = GridValidRowModel>({
    rows,
    columns,
    rowCount,
    loading,
    paginationModel,
    onPaginationModelChange,
    sortModel,
    onSortModelChange,
    filterModel,
    onFilterModelChange,
    checkboxSelection,
    height = '75vh',
    getRowId,
    toolbarConfig,
    pageSizeOptions = [10, 25, 50, 100],
    initialPageSize = 25,
    defaultColumnVisibilityModel,
    columnVisibilityModel,
    onColumnVisibilityModelChange,
    onRowSelectionChange,
    keepNonExistentRowsSelected = true, // Default true cho server-side pagination
    bulkActions,
    enableFilter = false,
}: SharedDataGridProps<T>) {

    // Track selection count internally for toolbar display
    const [selectedCount, setSelectedCount] = React.useState<number>(0);

    // Handle row selection with optional callback
    const handleRowSelectionChange = React.useCallback((newSelection: GridRowSelectionModel) => {
        // GridRowSelectionModel trong MUI v8 có cấu trúc: { type: string, ids: Set<GridRowId> }
        // hoặc có thể là array tùy theo version/config
        let count = 0;

        if (Array.isArray(newSelection)) {
            // Trường hợp là array (một số config của MUI)
            count = newSelection.length;
        } else if (newSelection && typeof newSelection === 'object' && 'ids' in newSelection) {
            // Trường hợp là object với property 'ids' là Set
            const selectionObj = newSelection as { ids: Set<any> };
            count = selectionObj.ids.size;
        }

        setSelectedCount(count);

        // Call parent callback if provided (không cần await vì là sync)
        onRowSelectionChange?.(newSelection);
    }, [onRowSelectionChange]);

    return (
        <Box sx={{
            height: height,
            width: "100%",
            bgcolor: "white",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1
        }}>
            <DataGrid<T>
                rows={rows}
                columns={columns}
                rowCount={rowCount}
                loading={loading}
                disableRowSelectionOnClick
                getRowId={getRowId}
                checkboxSelection={checkboxSelection}
                keepNonExistentRowsSelected={keepNonExistentRowsSelected}
                paginationMode={onPaginationModelChange ? "server" : "client"}
                sortingMode={onSortModelChange ? "server" : "client"}
                filterMode={onFilterModelChange ? "server" : "client"}
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                sortModel={sortModel}
                onSortModelChange={onSortModelChange}
                filterModel={filterModel}
                onFilterModelChange={onFilterModelChange}
                onRowSelectionModelChange={handleRowSelectionChange}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}

                /* Pagination Settings */
                pageSizeOptions={pageSizeOptions}
                slotProps={{
                    basePagination: {
                        material: {
                            ActionsComponent: Pagination,
                        },
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: initialPageSize
                        },
                    },
                    columns: {
                        columnVisibilityModel: defaultColumnVisibilityModel || {},
                    },
                }}

            /* Custom slots (v8+ API) */
            // slots={{
            //     toolbar: () => <CustomToolbarWithSelection
            //         toolbarConfig={toolbarConfig}
            //         selectedCount={selectedCount}
            //         bulkActions={bulkActions}
            //         enableFilter={enableFilter}
            //     />,
            // }}
            />
        </Box>
    );
}) as <T extends GridValidRowModel = GridValidRowModel>(
    props: SharedDataGridProps<T>
) => React.JSX.Element;

export default SharedDataGrid;