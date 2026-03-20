"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#categories" className="text-gray-300 hover:text-white transition-colors">
              Danh Mục
            </a>
            <a href="#products" className="text-gray-300 hover:text-white transition-colors">
              Sản Phẩm
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Tính Năng
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Liên Hệ
            </a>
            <a
              href="tel:0909123456"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              0909 123 456
            </a>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
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

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 flex flex-col gap-4 text-sm font-medium">
            <a href="#categories" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
              Danh Mục
            </a>
            <a href="#products" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
              Sản Phẩm
            </a>
            <a href="#features" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
              Tính Năng
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
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
