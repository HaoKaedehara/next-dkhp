"use client";
import { Chip } from "@mui/material";
export default function StatusChip({ value }: { value: string }) {
    const map: Record<string, "default" | "success" | "warning" | "error" | "primary"> = {
        active: "success", graduated: "primary", inactive: "default",
        open: "success", ongoing: "warning", closed: "error",
    };
    const label = ({ active: "Đang học", graduated: "Tốt nghiệp", inactive: "Tạm dừng", open: "Mở", ongoing: "Đang diễn ra", closed: "Đóng" } as any)[value] ?? value;
    return <Chip size="small" variant="outlined" color={map[value] ?? "default"} label={label} />;
}