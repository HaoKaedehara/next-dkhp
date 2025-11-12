"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { emphasize, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import { signOut } from "next-auth/react";
import { useState } from "react";
import { useSidebarStore } from "./sidebarStore";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { FaHome } from "react-icons/fa";

import { usePathname } from 'next/navigation';
import Link from "next/link";
import { BiAccessibility } from "react-icons/bi";

const drawerWidth = 240;

// Styled AppBar that shifts when drawer is open
const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
})<{ open?: boolean; collapsed?: boolean }>(({ theme, open, collapsed }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // When sidebar is expanded
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    // When sidebar is collapsed (mini variant)
    ...(!open && !collapsed && {
        marginLeft: 64, // miniDrawerWidth
        width: `calc(100% - 64px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Dynamic breadcrumb logic will be inside component

// Style for Breadcrumb
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    return {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(theme.palette.grey[100], 0.06),
            ...theme.applyStyles('dark', {
                backgroundColor: emphasize(theme.palette.grey[800], 0.06),
            }),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[100], 0.12),
            ...theme.applyStyles('dark', {
                backgroundColor: emphasize(theme.palette.grey[800], 0.12),
            }),
        },
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    };
}) as typeof Chip;

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb. Bỏ ft này khi dùng event click');
}

// Function to get label and icon for dynamic segments
const getDynamicBreadcrumb = (part: string, index: number): { label: string; icon?: React.ReactElement } => {
    // For numeric IDs or unknown parts, return a generic label
    if (/^\d+$/.test(part)) {
        return { label: `#${part}`, icon: <DescriptionIcon fontSize="small" /> };
    }
    // Capitalize first letter for unknown parts
    return {
        label: part.charAt(0).toUpperCase() + part.slice(1)
    };
};


export default function AppHeader({
    userEmail,
    userName,
    userImage
}: {
    userEmail?: string;
    userName?: string;
    userImage?: string;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const { toggle, collapsed, toggleCollapsed } = useSidebarStore((s) => ({
        toggle: s.toggle,
        collapsed: s.collapsed,
        toggleCollapsed: s.toggleCollapsed
    }));

    // Dynamic breadcrumb logic
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(part => part);

    // Enhanced mapping with labels and icons
    const pageMapping: { [key: string]: { label: string; icon: React.ReactNode } } = {
        'admin': { label: 'Quản lý', icon: <FaHome fontSize="medium" /> },
        'qly-dang-ky': { label: 'Danh sách đăng ký', icon: "" },
        'huy-dang-ky': { label: 'Danh sách hủy đăng ký', icon: "" },
        'student': { label: 'Sinh viên', icon: "" },
        'new': { label: 'Thêm mới', icon: "" },
        'dashboard': { label: 'Bảng điều khiển', icon: "" },
        'edit': { label: 'Cập nhật', icon: "" },
    };

    // Function to get label and icon for dynamic segments


    // Build breadcrumb items dynamically
    const breadcrumbItems = [
        ...pathParts
            .filter((part, index) => {
                // Skip numeric IDs and edit pages - only show main sections
                if (/^\d+$/.test(part)) return false;  // Skip numeric IDs like "123"
                if (part === 'edit') return false;     // Skip "edit" 

                // Special logic for nested routes like admin/qly-dang-ky/huy-dang-ky
                // Show admin (index 0) and the last meaningful part
                if (index === 0) return true; // Always show admin
                if (index === pathParts.length - 1) return true; // Always show last part

                // For middle parts, only show if it's not redundant with the last part
                if (pathParts.length === 3 && index === 1) {
                    // Skip middle part for 3-level routes (admin/qly-dang-ky/huy-dang-ky)
                    return false;
                }

                return index <= 1; // Default: show first 2 levels
            })
            .map((part, index) => {
                const originalIndex = pathParts.indexOf(part);
                const path = '/' + pathParts.slice(0, originalIndex + 1).join('/');
                const mapping = pageMapping[part] || getDynamicBreadcrumb(part, originalIndex);
                return {
                    path,
                    label: mapping.label,
                    icon: mapping.icon
                };
            }),
    ];

    return (
        <StyledAppBar
            position="fixed"
            elevation={1}
            open={!collapsed}
            sx={{
                backgroundColor: 'white',
                color: 'text.primary',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                // Only apply margin/width shifts on desktop
                '@media (max-width: 900px)': {
                    marginLeft: 0,
                    width: '100%',
                },
            }}
        >
            <Toolbar>
                {/* Mobile: open/close temporary drawer */}
                <IconButton
                    edge="start"
                    onClick={toggle}
                    sx={{
                        mr: 2,
                        display: { md: "none" },
                        color: 'inherit',
                    }}
                    aria-label="Open menu"
                >
                    <MenuIcon />
                </IconButton>

                {/* Desktop: collapse/expand permanent drawer */}
                <IconButton
                    onClick={toggleCollapsed}
                    sx={{
                        mr: 2,
                        display: { xs: "none", md: "inline-flex" },
                        color: 'inherit',
                    }}
                    aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
                >
                    <MenuOpenIcon
                        sx={{
                            transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 0.3s',
                        }}
                    />
                </IconButton>

                {/* <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                        color: 'text.primary',
                    }}
                >
                    Tin tuyển dụng sinh viên
                </Typography> */}

                {/* Breadcrumb */}
                <Box
                    // onClick={handleClick}
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                        color: 'text.primary',
                        cursor: 'pointer',
                    }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{
                        background: '#f5f5f5', width: 'fit-content', padding: '3px 6px', borderRadius: '16px'
                    }}>
                        {/* <StyledBreadcrumb
                            component="a"
                            href="/"
                            label="Trang chủ"
                            icon={<HomeIcon fontSize="medium" />}
                        />
                        <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
                        {breadcrumbItems.map((item, index) => {
                            return <StyledBreadcrumb
                                key={item.path}
                                component={Link}
                                href={item.path}
                                label={item.label}
                                {...(item.icon && { icon: item.icon as React.ReactElement })}
                                clickable={index < breadcrumbItems.length - 1}
                                sx={{
                                    fontSize: '0.875rem',
                                    background: '#fff', marginBottom: '0px',
                                    cursor: index < breadcrumbItems.length - 1 ? 'pointer' : 'default',
                                    ...(index === breadcrumbItems.length - 1 && {
                                        // backgroundColor: 'primary.main',
                                        // color: 'primary.contrastText',
                                        // '&:hover, &:focus': {
                                        //     backgroundColor: 'primary.dark',
                                        // },
                                    }),
                                }}
                            />
                        })}
                    </Breadcrumbs>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title={userEmail ?? "Tài khoản người dùng"}>
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{ p: 0 }}
                            aria-label="Tài khoản người dùng"
                        >
                            <Avatar
                                src={userImage}
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: 'primary.main',
                                    fontSize: '0.875rem',
                                }}
                                alt={userName ?? userEmail ?? "User"}
                            >
                                {!userImage && (userName || userEmail)?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={() => setAnchorEl(null)}
                        onClick={() => setAnchorEl(null)}
                        PaperProps={{
                            elevation: 3,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 24,
                                    height: 24,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem disabled sx={{ fontWeight: 600 }}>
                            {userName || userEmail}
                        </MenuItem>
                        <MenuItem
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            sx={{ color: 'error.main' }}
                        >
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
}

