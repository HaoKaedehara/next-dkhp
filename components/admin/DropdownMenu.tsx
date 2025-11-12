import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
                ...theme.applyStyles('dark', {
                    color: 'inherit',
                }),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

export interface BulkAction {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    divider?: boolean;
    disabled?: boolean;
}

export interface DropdownMenuProps {
    selectedCount: number;
    actions: BulkAction[];
    buttonLabel?: string;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export default function DropdownMenu({
    selectedCount,
    actions,
    buttonLabel,
    variant = 'contained',
    color = 'primary',
}: DropdownMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleAction = (action: BulkAction) => {
        action.onClick();
        handleClose();
    };

    const label = buttonLabel || `Đã chọn ${selectedCount} mục`;

    return (
        <div>
            <Button
                id="bulk-actions-button"
                aria-controls={open ? 'bulk-actions-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant={variant}
                color={color}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {label}
            </Button>
            <StyledMenu
                id="bulk-actions-menu"
                slotProps={{
                    list: {
                        'aria-labelledby': 'bulk-actions-button',
                    },
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {actions.flatMap((action, index) => {
                    const menuItem = (
                        <MenuItem 
                            key={`action-${index}`}
                            onClick={() => handleAction(action)} 
                            disableRipple
                            disabled={action.disabled}
                        >
                            {action.icon}
                            {action.label}
                        </MenuItem>
                    );
                    
                    if (action.divider) {
                        return [
                            menuItem,
                            <Divider key={`divider-${index}`} sx={{ my: 0.5 }} />
                        ];
                    }
                    
                    return [menuItem];
                })}
            </StyledMenu>
        </div>
    );
}
