import React, { useState, useCallback } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

interface SinhVienFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void; // gọi sau khi submit thành công
}

type FormState = {
    masv: string;
    ho_ten: string;
    ngay_sinh: string;
    noi_sinh: string;
    gioi_tinh: string;
    cccd: string;
    email: string;
    dien_thoai: string;
    lop: string;
    dangnhap_0st: boolean;
    cccd_mt: string;
    cccd_ms: string;
    threadId: string;
};

const initialFormState: FormState = {
    masv: "",
    ho_ten: "",
    ngay_sinh: "",
    noi_sinh: "",
    gioi_tinh: "",
    cccd: "",
    email: "",
    dien_thoai: "",
    lop: "",
    dangnhap_0st: false,
    cccd_mt: "",
    cccd_ms: "",
    threadId: "",
};

export default function SinhVienFormDialog({
    open,
    onClose,
    onSuccess,
}: SinhVienFormDialogProps) {
    const [form, setForm] = useState<FormState>(initialFormState);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const handleCheckChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, checked } = e.target;
            setForm((prev) => ({ ...prev, [name]: checked }));
        },
        []
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const payload = {
                ...form,
                masv: form.masv ? Number(form.masv) : null,
            };

            console.log("Submit sinh_vien:", payload);
            // TODO: gọi API tạo/cập nhật sinh viên ở đây

            // Nếu cần reset form:
            // setForm(initialFormState);

            if (onSuccess) onSuccess();
            onClose();
        },
        [form, onClose, onSuccess]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                <Typography variant="h6">Thêm / Sửa Sinh Viên</Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    component="form"
                    id="sinhvien-form"
                    onSubmit={handleSubmit}
                    sx={{
                        mt: 1,
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                        },
                    }}
                >
                    <TextField
                        label="Mã sinh viên (masv)"
                        name="masv"
                        type="number"
                        value={form.masv}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Họ tên (ho_ten)"
                        name="ho_ten"
                        value={form.ho_ten}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Ngày sinh (ngay_sinh)"
                        name="ngay_sinh"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={form.ngay_sinh}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Nơi sinh (noi_sinh)"
                        name="noi_sinh"
                        value={form.noi_sinh}
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        label="Giới tính (gioi_tinh)"
                        name="gioi_tinh"
                        value={form.gioi_tinh}
                        onChange={handleChange}
                    >
                        <MenuItem value="">-- Chọn --</MenuItem>
                        <MenuItem value="Nam">Nam</MenuItem>
                        <MenuItem value="Nữ">Nữ</MenuItem>
                        <MenuItem value="Khác">Khác</MenuItem>
                    </TextField>

                    <TextField
                        label="CCCD (cccd)"
                        name="cccd"
                        value={form.cccd}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Điện thoại (dien_thoai)"
                        name="dien_thoai"
                        value={form.dien_thoai}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Email (email)"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Lớp (lop)"
                        name="lop"
                        value={form.lop}
                        onChange={handleChange}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="dangnhap_0st"
                                    checked={form.dangnhap_0st}
                                    onChange={handleCheckChange}
                                />
                            }
                            label="Đã đăng nhập lần 0"
                        />
                    </Box>

                    <TextField
                        label="Thread ID (threadId)"
                        name="threadId"
                        value={form.threadId}
                        onChange={handleChange}
                    />

                    <TextField
                        label="CCCD mặt trước (cccd_mt)"
                        name="cccd_mt"
                        value={form.cccd_mt}
                        onChange={handleChange}
                    />

                    <TextField
                        label="CCCD mặt sau (cccd_ms)"
                        name="cccd_ms"
                        value={form.cccd_ms}
                        onChange={handleChange}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>
                <Button type="submit" form="sinhvien-form" variant="contained">
                    Lưu sinh viên
                </Button>
            </DialogActions>
        </Dialog>
    );
}
