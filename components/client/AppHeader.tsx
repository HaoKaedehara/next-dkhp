'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Menu as MuiMenu,
  MenuItem,
  Divider,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Menu,
  Notifications,
  AccountCircle,
  KeyboardArrowDown,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material'

interface AppHeaderProps {
  onToggleSidebar?: () => void
  onToggleCollapse?: () => void
  isSidebarCollapsed?: boolean
}

export default function AppHeader({ 
  onToggleSidebar, 
  onToggleCollapse, 
  isSidebarCollapsed = false 
}: AppHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        {/* Left side - Logo and title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* Mobile menu toggle - keep at start for mobile */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="toggle sidebar"
              onClick={onToggleSidebar}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          
          {/* Logo image - changes based on sidebar state */}
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {!isMobile && isSidebarCollapsed ? (
              /* Collapsed logo - compact version */
              <img 
                src="https://dangkyhoclai.sandboxnctu.qzz.io/assets/img/logo_truong_only.png" 
                alt="ĐKHP" 
                style={{ 
                  height: 40, 
                  width: 'auto',
                  transition: 'all 0.3s ease'
                }}
              />
            ) : (
              /* Full logo - expanded version */
              <img 
                src="https://dangkyhoclai.sandboxnctu.qzz.io/assets/img/logo_truong.png" 
                alt="ĐKHP - Đăng ký học phần" 
                style={{ 
                  height: 40, 
                  width: 'auto',
                  transition: 'all 0.3s ease'
                }}
              />
            )}
          </Box>

          {/* Desktop sidebar collapse toggle */}
          {!isMobile && (
            <IconButton
              color="inherit"
              aria-label="toggle sidebar collapse"
              onClick={onToggleCollapse}
              size="small"
              sx={{ 
                opacity: 0.7,
                transition: 'all 0.2s ease',
                '&:hover': {
                  opacity: 1,
                  bgcolor: 'action.hover',
                  transform: 'scale(1.1)'
                }
              }}
            >
              {isSidebarCollapsed ? (
                <ChevronRight fontSize="small" />
              ) : (
                <ChevronLeft fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>

        {/* Right side - User info and actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* User menu */}
          <IconButton
            onClick={handleUserMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main', 
                  width: 32, 
                  height: 32,
                  fontSize: '0.875rem'
                }}
              >
                SV
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Sinh viên
                </Typography>
              </Box>
              <KeyboardArrowDown fontSize="small" />
            </Box>
          </IconButton>

          <MuiMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                sx: { mt: 1, minWidth: 200 }
              }
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <AccountCircle sx={{ mr: 2 }} />
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              Đổi mật khẩu
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={handleUserMenuClose}
              sx={{ color: 'error.main' }}
            >
              Đăng xuất
            </MenuItem>
          </MuiMenu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}