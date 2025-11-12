'use client'

import { useState } from 'react'
import { Box, useTheme, useMediaQuery, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight, Padding } from '@mui/icons-material'
import AppHeader from '@/components/client/AppHeader'
import AppSidebar from '@/components/client/AppSidebar'

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    const toggleSidebarCollapse = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    // Calculate main content padding based on sidebar state
    const getMainContentPadding = () => {
        if (isMobile) {
            return 0 // No padding on mobile
        }
        return sidebarCollapsed ? '64px' : '280px' // Collapsed or full width
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
            {/* Header */}
            <AppHeader
                onToggleSidebar={toggleSidebar}
                onToggleCollapse={toggleSidebarCollapse}
                isSidebarCollapsed={sidebarCollapsed}
            />

            {/* Sidebar */}
            <AppSidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={toggleSidebarCollapse}
            />


            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 8, // Account for AppBar height (64px)
                    //   pl: getMainContentPadding(),
                    transition: theme.transitions.create(['padding-left'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    minHeight: '100vh'
                }}
            >
                <Box sx={{
                    p: 3,
                    maxWidth: '100%',
                    overflow: 'hidden'
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}