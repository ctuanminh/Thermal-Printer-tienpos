"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems } = useCart();

  const homeLink = (hash: string) => (isHome ? hash : `/${hash}`);

  const navLink = (href: string, label: string) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`transition-colors ${isActive ? "text-blue-400 font-semibold" : "text-gray-300 hover:text-white"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
            </svg>
            ThermalPrint
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href={homeLink("#categories")} className="text-gray-300 hover:text-white transition-colors">
              Danh Mục
            </a>
            {navLink("/products", "Sản Phẩm")}
            {navLink("/news", "Tin Tức")}
            <a href={homeLink("#features")} className="text-gray-300 hover:text-white transition-colors">
              Tính Năng
            </a>
            <a href={homeLink("#contact")} className="text-gray-300 hover:text-white transition-colors">
              Liên Hệ
            </a>

            <Link href="/gio-hang" className="relative text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <a
              href="tel:0909123456"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              0909 123 456
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Link href="/gio-hang" className="relative text-gray-300 hover:text-white">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 flex flex-col gap-4 text-sm font-medium">
            <a href={homeLink("#categories")} className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
              Danh Mục
            </a>
            <Link href="/products" className={pathname === "/products" ? "text-blue-400" : "text-gray-300 hover:text-white"} onClick={() => setMenuOpen(false)}>
              Sản Phẩm
            </Link>
            <Link href="/news" className={pathname === "/news" ? "text-blue-400" : "text-gray-300 hover:text-white"} onClick={() => setMenuOpen(false)}>
              Tin Tức
            </Link>
            <a href={homeLink("#features")} className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
              Tính Năng
            </a>
            <a href={homeLink("#contact")} className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
              Liên Hệ
            </a>
            <a href="tel:0909123456" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
              Gọi Ngay: 0909 123 456
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
