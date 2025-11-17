"use client";
import { Stack, Button, Typography } from "@mui/material";
import {
    Add as AddIcon,
    FileDownload as ExportIcon,
    FilterList as FilterIcon,
} from "@mui/icons-material";
import DropdownMenu, { type BulkAction } from "./DropdownMenu";
import SearchInput from "./SearchInput";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Box, { BoxProps } from '@mui/material/Box';

export interface ShareToolbarProps {
    // Search functionality
    query?: string;
    onQueryChange?: (value: string) => void;
    placeholder?: string;
    showSearch?: boolean;
    searchOnEnter?: boolean; // Thêm option để search khi nhấn Enter

    // Add functionality
    onAdd?: () => void;
    addLabel?: string;
    showAdd?: boolean;

    // Export functionality
    onExport?: () => void;
    exportLabel?: string;
    showExport?: boolean;

    // Filter functionality
    onFilter?: () => void;
    filterLabel?: string;
    showFilter?: boolean;

    // Custom actions
    customActions?: React.ReactNode;

    // Styling
    disableMargin?: boolean; // Để disable margin khi dùng trong DataGrid

    // Bulk actions
    bulkActions?: BulkAction[];
    selectedCount?: number;

    // Column dialog
    onShowColumnDialog?: () => void;
    showColumnDialog?: boolean;
    showColumnDialogLabel?: string;
}

export default function ShareToolbar({
    query = "",
    onQueryChange,
    placeholder = "Tìm kiếm...",
    showSearch = true,
    searchOnEnter = false,

    onAdd,
    addLabel = "Thêm",
    showAdd = true,

    onExport,
    exportLabel = "Xuất danh sách",
    showExport = false,

    onFilter,
    filterLabel = "Bộ lọc",
    showFilter = false,

    customActions,
    disableMargin = false,

    bulkActions,
    selectedCount = 0,

    onShowColumnDialog,
    showColumnDialog = true,
    showColumnDialogLabel = "Cột",
}: ShareToolbarProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}
        >
            <Box sx={{ minWidth: '500px' }}>
                {showSearch && onQueryChange && (
                    <SearchInput
                        value={query}
                        onChange={onQueryChange}
                        placeholder={placeholder}
                        // minWidth={200}
                        searchOnEnter={searchOnEnter}
                    />
                )}
            </Box>
            {/* Actions Container */}
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                {/* Bulk Actions Dropdown - hiển thị khi có items được chọn */}

                {bulkActions && bulkActions.length > 0 && selectedCount > 0 && (
                    <DropdownMenu
                        selectedCount={selectedCount}
                        actions={bulkActions}
                        variant="outlined"
                        color="primary"
                    />
                )}

                {/* Filter Button */}
                {showFilter && onFilter && (
                    <Button
                        variant="outlined"
                        startIcon={<FilterIcon />}
                        onClick={onFilter}
                        sx={{ borderRadius: 2 }}
                    >
                        {filterLabel}
                    </Button>
                )}

                {/* Column Dialog Button */}
                {showColumnDialog && onShowColumnDialog && (
                    <Button
                        variant="outlined"
                        startIcon={<ViewColumnIcon />}
                        onClick={onShowColumnDialog}
                        sx={{ borderRadius: 2 }}
                    >
                        {showColumnDialogLabel}
                    </Button>
                )}

                {/* Export Button */}
                {showExport && onExport && (
                    <Button
                        variant="outlined"
                        startIcon={<ExportIcon />}
                        onClick={onExport}
                        sx={{ borderRadius: 2 }}
                        color="success"
                    >
                        {exportLabel}
                    </Button>
                )}

                {/* Custom Actions */}
                {customActions}

                {/* Add Button */}
                {showAdd && onAdd && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        sx={{ borderRadius: 2 }}
                    >
                        {addLabel}
                    </Button>
                )}
            </Stack>
        </Box>
    );
    return (
        <Box component="section"
            // direction={{ xs: "column", sm: "row" }}
            // spacing={2}
            // alignItems={{ xs: "stretch", sm: "center" }}
            // sx={{ mb: disableMargin ? 0 : 3 }}
            sx={{ justifyContent: 'space-between' }}
        >
            {/* Search Field */}
            {showSearch && onQueryChange && (
                <SearchInput
                    value={query}
                    onChange={onQueryChange}
                    placeholder={placeholder}
                    minWidth={200}
                    searchOnEnter={searchOnEnter}
                />
            )}

            {/* Actions Container */}
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                {/* Bulk Actions Dropdown - hiển thị khi có items được chọn */}

                {bulkActions && bulkActions.length > 0 && selectedCount > 0 && (
                    <DropdownMenu
                        selectedCount={selectedCount}
                        actions={bulkActions}
                        variant="outlined"
                        color="primary"
                    />
                )}

                {/* Filter Button */}
                {showFilter && onFilter && (
                    <Button
                        variant="outlined"
                        startIcon={<FilterIcon />}
                        onClick={onFilter}
                        sx={{ borderRadius: 2 }}
                    >
                        {filterLabel}
                    </Button>
                )}

                {/* Column Dialog Button */}
                {showColumnDialog && onShowColumnDialog && (
                    <Button
                        variant="outlined"
                        startIcon={<ViewColumnIcon />}
                        onClick={onShowColumnDialog}
                        sx={{ borderRadius: 2 }}
                    >
                        {showColumnDialogLabel}
                    </Button>
                )}

                {/* Export Button */}
                {showExport && onExport && (
                    <Button
                        variant="outlined"
                        startIcon={<ExportIcon />}
                        onClick={onExport}
                        sx={{ borderRadius: 2 }}
                        color="success"
                    >
                        {exportLabel}
                    </Button>
                )}

                {/* Custom Actions */}
                {customActions}

                {/* Add Button */}
                {showAdd && onAdd && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        sx={{ borderRadius: 2 }}
                    >
                        {addLabel}
                    </Button>
                )}
            </Stack>
        </Box>
    );
}