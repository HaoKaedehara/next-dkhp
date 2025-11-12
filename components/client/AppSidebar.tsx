'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Backdrop,
  Tooltip
} from '@mui/material'
import {
  Home,
  MenuBook,
  Add,
  CheckCircle,
  Payment,
  Info
} from '@mui/icons-material'

interface SidebarItem {
  title: string
  href: string
  iconType: string
  badge?: string
}

interface AppSidebarProps {
  isOpen: boolean
  onClose?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const drawerWidth = 230
const collapsedDrawerWidth = 64

export default function AppSidebar({
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse
}: AppSidebarProps) {
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const menuItems: SidebarItem[] = [
    {
      title: 'Trang chủ',
      href: '/client',
      iconType: 'Home'
    },
    {
      title: 'Danh sách môn học',
      href: '/client/courses-list',
      iconType: 'MenuBook'
    },
    {
      title: 'Đăng ký môn học',
      href: '/client/courses-reg',
      iconType: 'Add',
    },
    {
      title: 'Môn học đã đăng ký',
      href: '/client/courses-app',
      iconType: 'CheckCircle'
    },
    {
      title: 'Thanh toán học phí',
      href: '/client/courses-pay',
      iconType: 'Payment'
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'Home': return <Home />
      case 'MenuBook': return <MenuBook />
      case 'Add': return <Add />
      case 'CheckCircle': return <CheckCircle />
      case 'Payment': return <Payment />
      case 'Info': return <Info />
      default: return <Home />
    }
  }

  const isActiveLink = (href: string) => {
    if (href === '/client') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleItemClick = () => {
    if (isMobile && onClose) {
      onClose()
    }
  }

  const currentDrawerWidth = !isMobile && isCollapsed ? collapsedDrawerWidth : drawerWidth

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, py: 1, overflowY: 'auto' }}>
        <List dense={isCollapsed}>
          {menuItems.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton
                  onClick={handleItemClick}
                  selected={isActiveLink(item.href)}
                  sx={{
                    borderRadius: '0px',
                    // minHeight: isCollapsed ? 48 : 'auto',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    py: 1,
                    px: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.50',
                      color: 'primary.main',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main'
                      },
                      '&:hover': {
                        bgcolor: 'primary.100'
                      }
                    },
                    // Hover effect for non-active items
                    '&:not(.Mui-selected):hover .MuiListItemIcon-root::before': {
                      backgroundColor: 'primary.light',
                      opacity: 1
                    }
                  }}
                >
                  <Tooltip title={isCollapsed ? item.title : ''} placement="right">
                    <ListItemIcon
                      sx={{
                        color: isActiveLink(item.href) ? 'primary.main' : 'text.secondary',
                        minWidth: isCollapsed ? 'auto' : 40,
                        justifyContent: 'center',
                        position: 'relative',
                        // '&::before': {
                        //   content: '""',
                        //   position: 'absolute',
                        //   left: isCollapsed ? '-16px' : '-4px',
                        //   top: '50%',
                        //   transform: 'translateY(-50%)',
                        //   width: '2px',
                        //   height: '26px',
                        //   borderRadius: '2px',
                        //   backgroundColor: isActiveLink(item.href) ? 'primary.main' : 'transparent',
                        //   opacity: isActiveLink(item.href) ? 1 : 0,
                        //   // transition: 'all 0.2s ease'
                        // }
                      }}
                    >
                      {getIcon(item.iconType)}
                    </ListItemIcon>
                  </Tooltip>
                  {!isCollapsed && (
                    <>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: isActiveLink(item.href) ? 600 : 500
                        }}
                      />
                      {item.badge && (
                        <Chip
                          label={item.badge}
                          size="small"
                          color="success"
                          sx={{
                            height: 20,
                            fontSize: '0.75rem'
                          }}
                        />
                      )}
                    </>
                  )}
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      {!isCollapsed && (
        <Box sx={{ p: 2, display: "none" }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1 }}>
            {/* <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {getIcon('Info')}
            </Box> */}
            <Box>
              <Typography variant="caption" color="text.primary">
                Phiên bản 3.0.0
              </Typography>
              {/* <Typography variant="caption" color="text.secondary" display="block">
                © 2024 ĐKHP System
              </Typography> */}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )

  return (
    <>
      {/* Mobile drawer */}
      {isMobile && (
        <>
          <Backdrop
            open={isOpen}
            onClick={onClose}
            sx={{
              zIndex: theme.zIndex.drawer - 1,
              bgcolor: 'rgba(0, 0, 0, 0.5)'
            }}
          />
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={onClose}
            ModalProps={{
              keepMounted: true
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: 64,
                height: 'calc(100vh - 64px)'
              }
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      )}

      {/* Desktop drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: currentDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: currentDrawerWidth,
              boxSizing: 'border-box',
              top: 64,
              height: 'calc(100vh - 64px)',
              position: 'fixed',
              transition: theme.transitions.create(['width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden'
            }
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  )
}