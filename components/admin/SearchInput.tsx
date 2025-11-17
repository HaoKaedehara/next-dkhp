"use client";
import * as React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export interface SearchInputProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    fullWidth?: boolean;
    minWidth?: number | string;
    searchOnEnter?: boolean; // Thêm option để search khi nhấn Enter
}

const SearchInput = React.memo(({
    value = "",
    onChange,
    placeholder = "Tìm kiếm...",
    fullWidth = true,
    minWidth = 300,
    searchOnEnter = false,
}: SearchInputProps) => {
    const [localValue, setLocalValue] = React.useState(value);

    // Sync localValue với value prop
    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setLocalValue(newValue);

            // Nếu không search on enter, update ngay
            if (!searchOnEnter) {
                onChange?.(newValue);
            }
        },
        [onChange, searchOnEnter]
    );

    const handleKeyPress = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && searchOnEnter) {
                onChange?.(localValue);
            }
        },
        [onChange, localValue, searchOnEnter]
    );

    const handleClear = React.useCallback(() => {
        setLocalValue('');
        onChange?.('');
    }, [onChange]);

    return (
        <TextField
            size="small"
            fullWidth={fullWidth}
            placeholder={placeholder}
            value={localValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="action" />
                    </InputAdornment>
                ),
                endAdornment: localValue && (
                    <InputAdornment position="end">
                        <IconButton
                            size="small"
                            onClick={handleClear}
                            edge="end"
                            sx={{
                                visibility: localValue ? 'visible' : 'hidden',
                                transition: 'opacity 0.2s',
                            }}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{ minWidth: { sm: minWidth }, maxWidth: '450px' }}
        />
    );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
