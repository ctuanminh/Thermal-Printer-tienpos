import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LexicalRenderer } from "@/lib/lexical-renderer";
import { Calendar, ArrowLeft, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let article: any = null;
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "news",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    article = result.docs[0] || null;
  } catch (e) {
    article = null;
  }

  if (!article) notFound();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-primary transition-colors">Tin tức</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[180px]">{article.title}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Tin tức</Badge>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {article.publishedAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>5 phút đọc</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-border p-6 md:p-10 shadow-sm">
          <LexicalRenderer content={article.content} />
        </div>

        <Separator className="my-10" />

        <div className="flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link href="/news" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách
            </Link>
          </Button>
          <Button asChild>
            <Link href="/#contact">Liên hệ tư vấn</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
