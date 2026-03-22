"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ALL_PRODUCTS, ZALO_NUMBER, PHONE_NUMBER } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart, Check, Minus, Plus, Phone,
  Gift, Tag, ChevronRight, ArrowLeft, Star,
} from "lucide-react";

function ZaloIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" fill="currentColor">
      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm9.6 28.4c-.5.6-1.2.9-2 .9-.5 0-1-.1-1.5-.4l-4.5-2.7c-.4-.2-.8-.2-1.1.1l-2.1 1.8c-.3.3-.7.4-1.1.3-.4-.1-.7-.4-.9-.8l-1.5-4.1c-.2-.6-.7-1-1.3-1.1l-4.3-.7c-.5-.1-.9-.4-1.1-.8-.2-.4-.2-.9 0-1.3L14.6 20c.3-.5.2-1.1-.2-1.5l-2.8-3.8c-.3-.4-.4-.9-.2-1.3.2-.4.5-.7 1-.8l4.4-.8c.6-.1 1.1-.6 1.3-1.2l1.3-4.2c.1-.4.4-.8.8-.9.4-.1.8-.1 1.2.1l3.8 2.6c.4.3 1 .3 1.4 0l3.8-2.6c.4-.3.8-.3 1.2-.1.4.2.7.5.8.9l1.3 4.2c.2.6.7 1.1 1.3 1.2l4.4.8c.5.1.8.4 1 .8.2.4.1.9-.2 1.3l-2.8 3.8c-.4.4-.5 1-.2 1.5l1.9 3.8c.2.4.2.9 0 1.3-.1.5-.5.8-.9.9z" />
    </svg>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  const { addToCart, items, updateQuantity: updateCartQty } = useCart();
  const cartItem = items.find((i) => i.product.id === id);
  const inCart = !!cartItem;

  const [qty, setQty] = useState(1);

  if (!product) return notFound();

  const related = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (inCart) {
      updateCartQty(product.id, (cartItem?.quantity ?? 0) + qty);
    } else {
      for (let i = 0; i < qty; i++) addToCart(product);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-primary transition-colors">Sản phẩm</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main product section */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Left – Image */}
          <div>
            <Card className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center py-16 px-8">
                <span className="text-[120px] leading-none select-none drop-shadow-sm">
                  {product.emoji}
                </span>
              </div>
              {product.badge && (
                <span className={`absolute top-4 left-4 ${product.badgeColor} text-white text-sm font-bold px-3 py-1.5 rounded-full shadow`}>
                  {product.badge}
                </span>
              )}
            </Card>

            {/* Thumbnails row (same emoji, decorative) */}
            <div className="flex gap-2 mt-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 bg-white border-2 rounded-lg p-3 flex items-center justify-center cursor-pointer transition-colors ${i === 0 ? "border-primary" : "border-border hover:border-primary/50"}`}
                >
                  <span className="text-3xl">{product.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Info */}
          <div className="flex flex-col gap-4">
            {/* Category & brand */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
              <div className="flex items-center gap-0.5 ml-auto">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">(24)</span>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-foreground leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{product.price}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {Math.round(product.priceNumber * 1.1).toLocaleString("vi-VN")} VNĐ
                </span>
                <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs">-10%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Giá đã bao gồm VAT. Miễn phí vận chuyển nội thành.</p>
            </div>

            {/* Promotions */}
            {product.promotions && product.promotions.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-500 text-white rounded-lg p-1">
                    <Gift className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-green-800 text-sm uppercase tracking-wide">
                    Khuyến Mãi · Tặng Kèm
                  </h3>
                </div>
                <ul className="space-y-2">
                  {product.promotions.map((promo, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                      <Tag className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-600" />
                      <span>{promo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Quantity + Add to cart */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Số lượng</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                    className="w-14 h-11 text-center text-base font-bold text-foreground bg-background border-x-2 border-border focus:outline-none focus:bg-primary/5"
                  />
                  <button
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">Còn hàng</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2 text-base font-semibold h-12"
                onClick={handleAddToCart}
                variant={inCart ? "secondary" : "default"}
              >
                {inCart ? (
                  <><Check className="w-5 h-5" /> Đã có trong giỏ</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Thêm vào giỏ hàng</>
                )}
              </Button>

              {inCart && (
                <Button size="lg" asChild className="sm:flex-shrink-0 h-12 gap-2">
                  <Link href="/gio-hang">
                    Xem giỏ hàng <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Zalo + Phone */}
            <div className="flex gap-3">
              <a
                href={`https://zalo.me/${ZALO_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0057d4] text-white font-semibold h-11 rounded-xl transition-colors text-sm"
              >
                <ZaloIcon />
                Chat Zalo
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold h-11 rounded-xl transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>

        {/* Specs table */}
        <Card className="mb-10 overflow-hidden">
          <div className="bg-primary px-6 py-4">
            <h2 className="font-bold text-white text-base">Thông Số Kỹ Thuật</h2>
          </div>
          <div className="divide-y divide-border">
            {product.specs.map((spec, i) => (
              <div key={i} className={`flex items-center px-6 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}>
                <span className="w-48 text-sm text-muted-foreground font-medium flex-shrink-0">{spec.label}</span>
                <span className="text-sm text-foreground font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-foreground">Sản Phẩm Liên Quan</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products" className="flex items-center gap-1 text-primary">
                  Xem tất cả <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <Card className="hover:shadow-md transition-shadow duration-200 group cursor-pointer h-full flex flex-col">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center rounded-t-lg relative">
                      <span className="text-5xl">{p.emoji}</span>
                      {p.badge && (
                        <span className={`absolute top-2 right-2 ${p.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{p.brand}</p>
                      <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors mb-2 flex-1">
                        {p.name}
                      </h3>
                      <p className="text-base font-bold text-primary">{p.price}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mt-8">
          <Button variant="outline" asChild>
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
