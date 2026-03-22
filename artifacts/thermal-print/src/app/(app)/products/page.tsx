"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_PRODUCTS, CATEGORIES, BRANDS, PRICE_RANGES, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, LayoutGrid, List, SlidersHorizontal, Check } from "lucide-react";

type ViewMode = "grid" | "list";
type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i.product.id === product.id);

  return (
    <Button
      size="sm"
      variant={inCart ? "secondary" : "default"}
      onClick={() => addToCart(product)}
      className="flex items-center gap-1.5"
    >
      {inCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
      {inCart ? "Đã thêm" : "Thêm giỏ"}
    </Button>
  );
}

function ProductCard({ product, view }: { product: Product; view: ViewMode }) {
  if (view === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow duration-200 flex flex-row overflow-hidden">
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center flex-shrink-0 w-36 relative">
          <span className="text-5xl">{product.emoji}</span>
          {product.badge && (
            <span className={`absolute top-2 left-2 ${product.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
          <div>
            <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
              {product.category} · {product.brand}
            </div>
            <h3 className="font-bold text-foreground text-base mb-1.5 leading-snug">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{product.description}</p>
            <div className="flex flex-wrap gap-2">
              {product.specs.slice(0, 3).map((spec, i) => (
                <Badge key={i} variant="secondary" className="text-xs font-normal">
                  {spec.label}: {spec.value}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-border">
            <span className="text-xl font-bold text-primary whitespace-nowrap">{product.price}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <AddToCartButton product={product} />
              <Button size="sm" variant="outline" asChild>
                <a href="#contact">Liên Hệ</a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-200 group">
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center relative rounded-t-lg overflow-hidden">
        <span className="text-7xl">{product.emoji}</span>
        {product.badge && (
          <span className={`absolute top-3 right-3 ${product.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
          {product.category} · {product.brand}
        </div>
        <h3 className="font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{product.description}</p>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2">
          <span className="text-base font-bold text-primary">{product.price}</span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </Card>
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
    if (selectedCategory !== "all") result = result.filter((p) => p.category === selectedCategory);
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
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

  const hasActiveFilters = selectedCategory !== "all" || selectedBrands.length > 0 || selectedPriceRange !== "all";

  const Sidebar = () => (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-foreground text-base">Bộ Lọc</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-primary hover:text-primary/80 font-medium">
            Xóa tất cả
          </button>
        )}
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Danh Mục</h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                selectedCategory === cat.id
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{cat.name}</span>
              <Badge variant={selectedCategory === cat.id ? "default" : "secondary"} className="text-xs h-5">
                {cat.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Thương Hiệu</h3>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
              />
              <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Mức Giá</h3>
        <div className="space-y-1">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedPriceRange(range.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                selectedPriceRange === range.id
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                selectedPriceRange === range.id ? "border-primary" : "border-border"
              }`}>
                {selectedPriceRange === range.id && <span className="w-2 h-2 rounded-full bg-primary" />}
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
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Sản phẩm</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Tất Cả Sản Phẩm</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-5 sticky top-20">
              <Sidebar />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white border border-border rounded-xl px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden flex items-center gap-1.5"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Bộ lọc
                  {hasActiveFilters && (
                    <Badge className="h-4 w-4 p-0 flex items-center justify-center text-xs">
                      {(selectedCategory !== "all" ? 1 : 0) + selectedBrands.length + (selectedPriceRange !== "all" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filtered.length}</span> sản phẩm
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm border border-border rounded-lg px-3 py-1.5 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="name-asc">Tên A-Z</option>
                </select>

                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button onClick={() => setView("grid")} className={`p-2 transition-colors ${view === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setView("list")} className={`p-2 transition-colors ${view === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {sidebarOpen && (
              <div className="lg:hidden bg-white border border-border rounded-xl p-5 mb-6">
                <Sidebar />
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="bg-white border border-border rounded-xl p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-muted-foreground mb-5">Thử thay đổi bộ lọc để xem thêm sản phẩm.</p>
                <Button onClick={clearFilters}>Xóa bộ lọc</Button>
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
