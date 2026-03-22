"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { ALL_PRODUCTS, type Product, ZALO_NUMBER, PHONE_NUMBER } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search, Download, Plus, Minus, CheckCircle2,
  Trash2, FileText, Upload, X, ChevronRight,
  Tag, Phone, Mail, User, ClipboardList,
} from "lucide-react";

type QuoteItem = { product: Product; qty: number };

function downloadQuote(items: QuoteItem[], customer: { name: string; phone: string; email: string }) {
  const lines: string[] = [
    "=== YÊU CẦU BÁO GIÁ - THERMALPRINT ===",
    `Ngày: ${new Date().toLocaleDateString("vi-VN")}`,
    "",
    "THÔNG TIN KHÁCH HÀNG:",
    `  Họ tên  : ${customer.name || "(chưa nhập)"}`,
    `  SĐT/Zalo: ${customer.phone || "(chưa nhập)"}`,
    `  Email   : ${customer.email || "(chưa nhập)"}`,
    "",
    "DANH SÁCH SẢN PHẨM CẦN BÁO GIÁ:",
    "─".repeat(60),
  ];
  items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.product.name}`);
    lines.push(`   Thương hiệu : ${item.product.brand}`);
    lines.push(`   Số lượng   : ${item.qty}`);
    lines.push(`   Đơn giá ref: ${item.product.price}`);
    lines.push(`   Thành tiền : ${(item.product.priceNumber * item.qty).toLocaleString("vi-VN")} VNĐ`);
    lines.push("");
  });
  const total = items.reduce((s, i) => s + i.product.priceNumber * i.qty, 0);
  lines.push("─".repeat(60));
  lines.push(`TỔNG THAM KHẢO: ${total.toLocaleString("vi-VN")} VNĐ`);
  lines.push("");
  lines.push("Liên hệ tư vấn: " + PHONE_NUMBER);
  lines.push("Zalo: " + ZALO_NUMBER);
  lines.push("Website: thermalprint.vn");

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bao-gia-thermalprint-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function BaoGiaPage() {
  const [search, setSearch] = useState("");
  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search]);

  const getQty = (id: number) => qtyMap[id] ?? 1;

  const setQty = (id: number, val: number) =>
    setQtyMap((prev) => ({ ...prev, [id]: Math.max(1, Math.min(999, val)) }));

  const addToQuote = (product: Product) => {
    const qty = getQty(product.id);
    setQuoteItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty }];
    });
  };

  const removeFromQuote = (id: number) =>
    setQuoteItems((prev) => prev.filter((i) => i.product.id !== id));

  const updateQuoteQty = (id: number, qty: number) => {
    if (qty <= 0) { removeFromQuote(id); return; }
    setQuoteItems((prev) => prev.map((i) => i.product.id === id ? { ...i, qty } : i));
  };

  const inQuote = (id: number) => quoteItems.some((i) => i.product.id === id);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).slice(0, 3 - files.length);
    setFiles((prev) => [...prev, ...selected].slice(0, 3));
  };

  const handleSubmit = () => {
    if (!name || !phone) { alert("Vui lòng nhập họ tên và số điện thoại."); return; }
    if (quoteItems.length === 0) { alert("Vui lòng chọn ít nhất 1 sản phẩm cần báo giá."); return; }
    setSubmitted(true);
  };

  const total = quoteItems.reduce((s, i) => s + i.product.priceNumber * i.qty, 0);

  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center shadow-lg">
          <div className="p-10">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Gửi Yêu Cầu Thành Công!</h2>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              Cảm ơn <strong>{name}</strong>! Chúng tôi sẽ liên hệ báo giá qua số <strong>{phone}</strong> trong vòng 30 phút.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {quoteItems.length} sản phẩm · Tổng tham khảo: <span className="font-bold text-primary">{total.toLocaleString("vi-VN")} VNĐ</span>
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => { setSubmitted(false); setQuoteItems([]); setName(""); setPhone(""); setEmail(""); setFiles([]); }}>
                Tạo yêu cầu mới
              </Button>
              <Button variant="outline" asChild><Link href="/">Về trang chủ</Link></Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Báo Giá</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Yêu Cầu Báo Giá</h1>
              <p className="text-sm text-muted-foreground">Chọn sản phẩm và gửi yêu cầu — chúng tôi phản hồi trong 30 phút</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Search + Download */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Nhập tên sản phẩm tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11 text-sm"
            />
          </div>
          <Button
            variant="outline"
            className="h-11 gap-2 border-green-500 text-green-700 hover:bg-green-50 font-semibold whitespace-nowrap"
            onClick={() => downloadQuote(quoteItems, { name, phone, email })}
            disabled={quoteItems.length === 0}
          >
            <Download className="w-4 h-4" />
            Download bảng báo giá
          </Button>
        </div>

        {/* Product list */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3 bg-muted/40 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {filtered.length} sản phẩm
            </span>
            {search && (
              <button onClick={() => setSearch("")} className="text-xs text-primary hover:underline flex items-center gap-1">
                <X className="w-3 h-3" /> Xóa tìm kiếm
              </button>
            )}
          </div>

          <div className="divide-y divide-border">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>Không tìm thấy sản phẩm phù hợp</p>
              </div>
            ) : (
              filtered.map((product) => {
                const added = inQuote(product.id);
                return (
                  <div key={product.id} className={`flex items-center gap-4 px-4 py-3.5 transition-colors ${added ? "bg-green-50/60" : "hover:bg-muted/30"}`}>
                    {/* Thumbnail */}
                    <Link href={`/products/${product.id}`} className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg flex items-center justify-center border border-border hover:border-primary/40 transition-colors">
                        <span className="text-2xl">{product.emoji}</span>
                      </div>
                    </Link>

                    {/* Name + price */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
                        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                          {product.name}
                        </p>
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold text-green-600">{product.price}</span>
                        {product.badge && (
                          <Badge className={`${product.badgeColor} text-white text-[10px] h-4 px-1.5`}>
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Qty input */}
                    <div className="flex items-center border-2 border-border rounded-lg overflow-hidden flex-shrink-0">
                      <button
                        onClick={() => setQty(product.id, getQty(product.id) - 1)}
                        className="w-8 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={999}
                        value={getQty(product.id)}
                        onChange={(e) => setQty(product.id, Number(e.target.value) || 1)}
                        className="w-12 h-9 text-center text-sm font-bold text-foreground bg-background border-x-2 border-border focus:outline-none focus:bg-primary/5"
                      />
                      <button
                        onClick={() => setQty(product.id, getQty(product.id) + 1)}
                        className="w-8 h-9 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Add button */}
                    <button
                      onClick={() => addToQuote(product)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        added
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    >
                      {added ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      <span className="hidden sm:inline">{added ? "Đã thêm" : "Thêm vào giỏ"}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Selected items summary */}
        {quoteItems.length > 0 && (
          <Card className="overflow-hidden border-green-200">
            <div className="px-5 py-3 bg-green-600 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Tag className="w-4 h-4" />
                <span className="font-bold text-sm">Danh Sách Báo Giá ({quoteItems.length} sản phẩm)</span>
              </div>
              <span className="text-white/90 text-sm font-semibold">
                Tổng tham khảo: {total.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
            <div className="divide-y divide-border">
              {quoteItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-xl flex-shrink-0">{item.product.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{item.product.price} / đơn vị</p>
                  </div>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden flex-shrink-0">
                    <button onClick={() => updateQuoteQty(item.product.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-muted text-muted-foreground">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => updateQuoteQty(item.product.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-muted text-muted-foreground">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-primary w-28 text-right flex-shrink-0">
                    {(item.product.priceNumber * item.qty).toLocaleString("vi-VN")}đ
                  </span>
                  <button onClick={() => removeFromQuote(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Contact form + file upload */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3.5 bg-muted/40 border-b border-border">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              GỬI YÊU CẦU BÁO GIÁ
            </h2>
          </div>

          <div className="p-5 grid md:grid-cols-2 gap-6">
            {/* Step 1 – Customer info */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                1. Nhập thông tin
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tên quý khách hàng *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Số điện thoại / Zalo *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                    type="tel"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Email liên hệ (không bắt buộc)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    type="email"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 – File upload */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                2. Tải file báo giá có sẵn (nếu có)
              </p>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*,.pdf,.xlsx,.xls,.doc,.docx"
                className="hidden"
                onChange={handleFiles}
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={files.length >= 3}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 rounded-xl px-4 py-5 transition-colors text-sm text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-5 h-5" />
                {files.length === 0 ? "Chọn file (ảnh, Excel, PDF)" : `Thêm file (${files.length}/3)`}
              </button>
              <p className="text-xs text-muted-foreground mt-1.5">
                * Tối đa 3 file (gồm hình ảnh, Excel hoặc PDF)
              </p>

              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-foreground flex-1 truncate">{f.name}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {(f.size / 1024).toFixed(0)}KB
                      </span>
                      <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Step 3 – Submit */}
          <div className="p-5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              3. Gửi yêu cầu báo giá
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 gap-2 text-base"
                onClick={handleSubmit}
              >
                <ClipboardList className="w-5 h-5" />
                GỬI YÊU CẦU BÁO GIÁ
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 h-12 border-green-500 text-green-700 hover:bg-green-50 font-semibold"
                onClick={() => downloadQuote(quoteItems, { name, phone, email })}
                disabled={quoteItems.length === 0}
              >
                <Download className="w-4 h-4" />
                Download báo giá
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Hoặc liên hệ trực tiếp:{" "}
              <a href={`tel:${PHONE_NUMBER}`} className="text-primary font-semibold">{PHONE_NUMBER}</a>
              {" · "}
              <a href={`https://zalo.me/${ZALO_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-[#0068FF] font-semibold">Chat Zalo</a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
