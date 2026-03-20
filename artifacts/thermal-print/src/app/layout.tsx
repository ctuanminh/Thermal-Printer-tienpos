import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThermalPrint - Máy In Nhiệt & Giấy In Nhiệt Chất Lượng Cao",
  description:
    "Nhà cung cấp máy in nhiệt và giấy in nhiệt chất lượng cao hàng đầu Việt Nam. Epson, Citizen, Zebra, Bixolon. Giao hàng toàn quốc.",
  keywords: "máy in nhiệt, giấy in nhiệt, máy in hóa đơn, máy in nhãn, giấy in bill",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
