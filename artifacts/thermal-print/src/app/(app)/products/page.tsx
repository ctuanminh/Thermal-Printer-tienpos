"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_PRODUCTS, CATEGORIES, BRANDS, PRICE_RANGES, type Product } from "@/data/products";

type ViewMode = "grid" | "list";
type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
    </svg>
  );
}

function ProductCard({ product, view }: { product: Product; view: ViewMode }) {
  if (view === "list") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200 flex gap-0">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center flex-shrink-0 w-40 relative">
          <span className="text-6xl">{product.emoji}</span>
          {product.badge && (
            <span className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                {product.category} · {product.brand}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1.5 hover:text-blue-700 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{product.description}</p>
              <div className="flex flex-wrap gap-2">
                {product.specs.slice(0, 3).map((spec, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 rounded-full px-2.5 py-1">
                    <span className="text-gray-400">{spec.label}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-xl font-bold text-blue-700 mb-3 whitespace-nowrap">{product.price}</div>
              <a
                href="#contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Liên Hệ
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-200 group flex flex-col">
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center relative">
        <span className="text-7xl">{product.emoji}</span>
        {product.badge && (
          <span className={`absolute top-3 right-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
          {product.category} · {product.brand}
        </div>
        <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-blue-700 transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed flex-1">{product.description}</p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-base font-bold text-blue-700">{product.price}</span>
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Liên Hệ
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedPriceRange !== "all") {
      result = result.filter((p) => {
        const n = p.priceNumber;
        if (selectedPriceRange === "under500") return n < 500000;
        if (selectedPriceRange === "500to2m") return n >= 500000 && n <= 2000000;
        if (selectedPriceRange === "2mto5m") return n > 2000000 && n <= 5000000;
        if (selectedPriceRange === "over5m") return n > 5000000;
        return true;
      });
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.priceNumber - b.priceNumber);
    else if (sortBy === "price-desc") result.sort((a, b) => b.priceNumber - a.priceNumber);
    else if (sortBy === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name, "vi"));

    return result;
  }, [selectedCategory, selectedBrands, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setSelectedPriceRange("all");
    setSortBy("default");
  };

  const hasActiveFilters =
    selectedCategory !== "all" || selectedBrands.length > 0 || selectedPriceRange !== "all";

  const Sidebar = () => (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-base">Bộ Lọc</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Danh Mục</h3>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                selectedCategory === cat.id
                  ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-xs rounded-full px-2 py-0.5 ${
                selectedCategory === cat.id ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Thương Hiệu</h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={`text-sm transition-colors ${
                selectedBrands.includes(brand) ? "text-blue-700 font-medium" : "text-gray-600 group-hover:text-gray-900"
              }`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Mức Giá</h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedPriceRange(range.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                selectedPriceRange === range.id
                  ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                selectedPriceRange === range.id ? "border-blue-600" : "border-gray-300"
              }`}>
                {selectedPriceRange === range.id && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </span>
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Sản phẩm</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tất Cả Sản Phẩm</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
              <Sidebar />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  Bộ lọc
                  {hasActiveFilters && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {(selectedCategory !== "all" ? 1 : 0) + selectedBrands.length + (selectedPriceRange !== "all" ? 1 : 0)}
                    </span>
                  )}
                </button>
                <span className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{filtered.length}</span> sản phẩm
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="name-asc">Tên A-Z</option>
                </select>

                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 transition-colors ${view === "grid" ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    title="Dạng lưới"
                  >
                    <GridIcon active={view === "grid"} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 transition-colors ${view === "list" ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    title="Dạng danh sách"
                  >
                    <ListIcon active={view === "list"} />
                  </button>
                </div>
              </div>
            </div>

            {sidebarOpen && (
              <div className="lg:hidden bg-white border border-gray-200 rounded-xl p-5 mb-6">
                <Sidebar />
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mb-5">Thử thay đổi bộ lọc để xem thêm sản phẩm.</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} view="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} view="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
