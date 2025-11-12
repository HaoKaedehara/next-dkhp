"use client";

import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppHeader from "@/components/admin/AppHeader";
import AppSidebar from "@/components/admin/AppSidebar";
import "@/public/fonts/fonts.css";

interface AdminClientWrapperProps {
    userEmail: string;
    userName: string;
    userImage: string;
    children: ReactNode;
}

export default function AdminClientWrapper({
    userEmail,
    userName,
    userImage,
    children,
}: AdminClientWrapperProps) {
    // Remove the mounted state pattern entirely to avoid hydration mismatch
    // Since this is a client component, we can render the full UI directly
    // return (<></>);
    return (
        <Box sx={{ 
            display: "flex", 
            minHeight: "100vh",
            width: "100vw",
            overflow: "hidden", // Prevent horizontal scroll at root level
        }}>
            {/* Navigation Drawer */}
            <AppSidebar />

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5",
                    width: 0, // Allow flex item to shrink below content size
                    minWidth: 0, // Allow flex item to shrink below content size
                }}
            >
                {/* Fixed AppBar */}
                <AppHeader
                    userEmail={userEmail}
                    userName={userName}
                    userImage={userImage}
                />

                {/* Toolbar spacer to push content below fixed AppBar */}
                <Toolbar />

                {/* Page Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: "#f5f5f5",
                        overflow: "auto", // Enable scrolling in content area
                        width: "100%",
                        minWidth: 0,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
