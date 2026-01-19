// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export const metadata = {
  title: "CouponDine - Verified Coupons & Deals",
  description: "Discover verified coupons and deals from top global brands.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* ✅ header hamesha BODY ke andar rahega */}
      <body className="min-h-screen bg-gray-50">
        <div className="flex min-h-screen flex-col">
          <Header />               {/* <header> yahan render hoga */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
