"use client";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import WorkIcon from "@mui/icons-material/Work";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "./sidebarStore";
import { useEffect, useState } from "react";
import { PiStudent } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePlaylistPlay, MdOutlinePlaylistRemove } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { PiNotebook } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiTimelineView } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md"; import { FiUsers } from "react-icons/fi";


const drawerWidth = 240;
const miniDrawerWidth = 64;

const nav = [
    // { group: "", label: "Tổng quan", href: "/admin", icon: <RxDashboard /> },

    { group: "", label: "Đăng ký", href: "/admin/qly-dang-ky", icon: <MdOutlinePlaylistPlay fontSize={"24px"} /> },
    // { group: "", label: "Hủy", href: "/admin/qly-huy-dang-ky", icon: <MdOutlinePlaylistRemove fontSize={"24px"} /> },

    { group: "", label: "Sinh viên", href: "/admin/student", icon: <PiStudent fontSize={"22px"} /> },
    // { group: "", label: "Học phần", href: "/admin/qly-hoc-phan", icon: <IoBookOutline fontSize={"22px"} /> },
    { group: "", label: "Lớp học phần", href: "/admin/qly-lop-hoc-phan", icon: <MdOutlineBrandingWatermark fontSize={"22px"} /> },
    { group: "", label: "Loại đăng ký", href: "/admin/qly-loai-dang-ky", icon: <PiNotebook fontSize={"22px"} /> },

    { group: "", label: "Thông báo", href: "/admin/qly-thong-bao", icon: <IoMdNotificationsOutline fontSize={"22px"} /> },
    { group: "", label: "Đợt đăng ký", href: "/admin/qly-dot-dang-ky", icon: <BsBookmark fontSize={"22px"} /> },
    // { group: "", label: "Học kỳ", href: "/admin/qly-hoc-ky", icon: <RiTimelineView fontSize={"22px"} /> },

    // { group: "", label: "Vai trò", href: "/admin/ql-roles", icon: <FiUsers fontSize={"22px"} /> },
    { group: "", label: "Người dùng", href: "/admin/ql-users", icon: <MdOutlineManageAccounts fontSize={"22px"} /> },
];

// Styled components for better mini variant drawer
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    minHeight: 64,
    transition: theme.transitions.create(['padding'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const openedMixin = (theme: any) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    minHeight: 48,
    justifyContent: 'center',
    px: 2.5,
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main + '14',
        borderRight: `3px solid ${theme.palette.primary.main}`,
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
        '& .MuiListItemText-primary': {
            color: theme.palette.primary.main,
            fontWeight: 600,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main + '1F',
        },
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, open }: { theme?: any; open: boolean }) => ({
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
}));

// Logo component
const Logo = ({ collapsed }: { collapsed: boolean }) => (
    <LogoContainer sx={{ background: "white" }}>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                transition: 'all 0.3s ease',
                width: '100%',
                height: '100%',
            }}
        >
            <Image
                src={collapsed
                    ? "/images/logo_truong_only.png"
                    : "/images/logo_truong.png"}
                alt="Logo"
                width={collapsed ? 36 : 150}
                height={collapsed ? 36 : 38}
                style={{
                    transition: 'all 0.3s ease',
                    objectFit: 'contain',
                }}
                priority
            />
        </Box>
    </LogoContainer>
);

export default function AppSidebar() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const { open, collapsed, close } = useSidebarStore((s) => ({
        open: s.open,
        collapsed: s.collapsed,
        close: s.close
    }));

    const isExpanded = !collapsed;

    // Handle hydration mismatch for pathname-dependent rendering
    useEffect(() => {
        setMounted(true);
    }, []);

    const renderNavItem = (item: typeof nav[0]) => {
        // Only determine active state after hydration to prevent mismatch
        const active = mounted ? (
            item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(item.href + "/")
        ) : false;

        const listItem = (
            <StyledListItemButton
                component={Link}
                href={item.href}
                selected={active}
                onClick={close}
                sx={{
                    minHeight: 48,
                    justifyContent: isExpanded ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 0
                }}
            >
                <StyledListItemIcon
                    open={isExpanded}
                    sx={{
                        minWidth: 0,
                        mr: isExpanded ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {item.icon}
                </StyledListItemIcon>
                <ListItemText
                    primary={item.label}
                    sx={{
                        opacity: isExpanded ? 1 : 0,
                        transition: 'opacity 0.3s',
                    }}
                />
            </StyledListItemButton>
        );

        // Wrap with tooltip when collapsed
        if (!isExpanded) {
            return (
                <Tooltip key={item.href} title={item.label} placement="right" arrow>
                    {listItem}
                </Tooltip>
            );
        }

        return <div key={item.href}>{listItem}</div>;
    };

    return (
        <>
            {/* Permanent drawer for desktop - Mini variant */}
            <StyledDrawer
                variant="permanent"
                open={isExpanded}
                sx={{
                    display: { xs: "none", md: "block" },
                    '& .MuiDrawer-paper': {
                        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                        backgroundColor: '#fafafa',
                    },
                }}
            >
                <Logo collapsed={collapsed} />
                <Divider />
                <List>
                    {nav.map(renderNavItem)}
                </List>
            </StyledDrawer>

            {/* Temporary drawer for mobile */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={close}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: '#fafafa',
                    },
                }}
            >
                <Logo collapsed={false} />
                <Divider />
                <List>
                    {nav.map((item) => {
                        // Only determine active state after hydration to prevent mismatch
                        const active = mounted ? (
                            item.href === "/admin"
                                ? pathname === "/admin"
                                : pathname === item.href || pathname.startsWith(item.href + "/")
                        ) : false;
                        return (
                            <StyledListItemButton
                                key={item.href}
                                component={Link}
                                href={item.href}
                                selected={active}
                                onClick={close}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </StyledListItemButton>
                        );
                    })}
                </List>
            </Drawer>
        </>
    );
}
