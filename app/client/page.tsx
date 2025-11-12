import Link from 'next/link'
import {
  Box, Typography, Grid, Card, CardContent, Button, Avatar, Chip, Alert, Paper, Stack, IconButton
} from '@mui/material'
import {
  MenuBook, CheckCircle, BarChart, Payment, Add, Visibility, CreditCard, Circle
} from '@mui/icons-material'

export default function ClientHomePage() {
  const stats = [
    {
      title: 'Môn học khả dụng',
      value: '45',
      iconType: 'MenuBook',
      color: 'primary'
    },
    {
      title: 'Đã đăng ký',
      value: '6',
      iconType: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Tổng tín chỉ',
      value: '18',
      iconType: 'BarChart',
      color: 'secondary'
    },
    {
      title: 'Học phí chưa thanh toán',
      value: '12.500.000đ',
      iconType: 'Payment',
      color: 'warning'
    }
  ]

  const quickActions = [
    {
      title: 'Đăng ký môn học',
      description: 'Tìm kiếm và đăng ký môn học mới',
      href: '/client/courses-reg',
      color: 'primary',
      iconType: 'Add'
    },
    {
      title: 'Xem danh sách môn học',
      description: 'Xem tất cả môn học khả dụng',
      href: '/client/courses-list',
      color: 'success',
      iconType: 'Visibility'
    },
    {
      title: 'Thanh toán học phí',
      description: 'Thanh toán học phí các môn đã đăng ký',
      href: '/client/courses-pay',
      color: 'secondary',
      iconType: 'CreditCard'
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'MenuBook': return <MenuBook />
      case 'CheckCircle': return <CheckCircle />
      case 'BarChart': return <BarChart />
      case 'Payment': return <Payment />
      case 'Add': return <Add />
      case 'Visibility': return <Visibility />
      case 'CreditCard': return <CreditCard />
      default: return <MenuBook />
    }
  }

  const recentActivities = [
    {
      action: 'Đăng ký môn học',
      course: 'Lập trình hướng đối tượng',
      time: '2 giờ trước',
      status: 'success'
    },
    {
      action: 'Hủy đăng ký',
      course: 'Cấu trúc dữ liệu và giải thuật',
      time: '1 ngày trước',
      status: 'warning'
    },
    {
      action: 'Thanh toán học phí',
      course: 'Cơ sở dữ liệu',
      time: '3 ngày trước',
      status: 'success'
    }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Welcome section */}
      <Paper
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          p: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Chào mừng bạn đến với hệ thống ĐKHP
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Quản lý việc đăng ký học phần một cách dễ dàng và hiệu quả
        </Typography>
      </Paper>

      {/* Statistics */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: `${stat.color}.main`,
                      mr: 2,
                      width: 56,
                      height: 56
                    }}
                  >
                    {getIcon(stat.iconType)}
                  </Avatar>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick actions */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Thao tác nhanh
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Link href={action.href} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color={action.color as any}
                    fullWidth
                    sx={{
                      p: 2,
                      justifyContent: 'flex-start',
                      textAlign: 'left'
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      {getIcon(action.iconType)}
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {action.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {action.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Recent activities */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Hoạt động gần đây
              </Typography>
              <Stack spacing={2}>
                {recentActivities.map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Circle
                      sx={{
                        fontSize: 8,
                        mt: 1,
                        color: activity.status === 'success' ? 'success.main' : 'warning.main'
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {activity.action}: {activity.course}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Thông báo
              </Typography>
              <Stack spacing={2}>
                <Alert severity="info">
                  <Typography variant="body2" fontWeight="medium">
                    Thời gian đăng ký học phần
                  </Typography>
                  <Typography variant="caption">
                    Đăng ký học phần kỳ 2 từ 15/01 đến 25/01/2024
                  </Typography>
                </Alert>
                <Alert severity="warning">
                  <Typography variant="body2" fontWeight="medium">
                    Nhắc nhở thanh toán
                  </Typography>
                  <Typography variant="caption">
                    Hạn cuối thanh toán học phí: 30/01/2024
                  </Typography>
                </Alert>
                <Alert severity="success">
                  <Typography variant="body2" fontWeight="medium">
                    Cập nhật hệ thống
                  </Typography>
                  <Typography variant="caption">
                    Hệ thống đã được cập nhật phiên bản mới
                  </Typography>
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}