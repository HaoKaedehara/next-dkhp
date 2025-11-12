import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ĐKHP - Đăng ký học phần",
  description: "Hệ thống đăng ký học phần trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
