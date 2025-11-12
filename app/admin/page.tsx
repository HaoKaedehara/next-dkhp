import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function AdminHome() {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h5">Xin chào 👋</Typography>
                <Typography variant="body2" color="text.secondary">
                    Đây là trang tổng quan. Bạn có thể truy cập "Bài tuyển dụng" từ sidebar.
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>Widget 1</Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2 }}>Widget 2</Paper>
            </Grid>
        </Grid>
    );
}
