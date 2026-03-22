import React from "react";

type LexicalNode = {
  type: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
  children?: LexicalNode[];
  indent?: number;
  version?: number;
};

type LexicalContent = {
  root: LexicalNode;
};

function serializeNode(node: LexicalNode, index: number): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case "root":
      return (
        <React.Fragment key={index}>
          {node.children?.map((child, i) => serializeNode(child, i))}
        </React.Fragment>
      );

    case "paragraph":
      return (
        <p key={index} className="mb-4 leading-relaxed text-gray-700">
          {node.children?.length
            ? node.children.map((child, i) => serializeNode(child, i))
            : <br />}
        </p>
      );

    case "heading": {
      const tag = node.tag || "h2";
      const headingClasses: Record<string, string> = {
        h1: "text-3xl font-bold text-gray-900 mb-4 mt-8",
        h2: "text-2xl font-bold text-gray-900 mb-3 mt-6",
        h3: "text-xl font-semibold text-gray-900 mb-3 mt-5",
        h4: "text-lg font-semibold text-gray-800 mb-2 mt-4",
        h5: "text-base font-semibold text-gray-800 mb-2 mt-4",
        h6: "text-sm font-semibold text-gray-800 mb-2 mt-3",
      };
      const Heading = tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Heading key={index} className={headingClasses[tag] || headingClasses.h2}>
          {node.children?.map((child, i) => serializeNode(child, i))}
        </Heading>
      );
    }

    case "text": {
      let content: React.ReactNode = node.text;
      const fmt = node.format || 0;
      if (fmt & 1) content = <strong>{content}</strong>;
      if (fmt & 2) content = <em>{content}</em>;
      if (fmt & 8) content = <u>{content}</u>;
      if (fmt & 4) content = <s>{content}</s>;
      if (fmt & 16) content = <code className="bg-gray-100 text-gray-800 text-sm px-1.5 py-0.5 rounded font-mono">{content}</code>;
      if (fmt & 32) content = <sub>{content}</sub>;
      if (fmt & 64) content = <sup>{content}</sup>;
      return <React.Fragment key={index}>{content}</React.Fragment>;
    }

    case "linebreak":
      return <br key={index} />;

    case "list": {
      const isOrdered = node.listType === "number";
      const ListTag = isOrdered ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className={`mb-4 pl-6 space-y-1 ${isOrdered ? "list-decimal" : "list-disc"}`}
        >
          {node.children?.map((child, i) => serializeNode(child, i))}
        </ListTag>
      );
    }

    case "listitem":
      return (
        <li key={index} className="text-gray-700 leading-relaxed">
          {node.children?.map((child, i) => serializeNode(child, i))}
        </li>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-blue-400 pl-4 py-1 my-4 italic text-gray-600 bg-blue-50 rounded-r-lg"
        >
          {node.children?.map((child, i) => serializeNode(child, i))}
        </blockquote>
      );

    case "link":
      return (
        <a
          key={index}
          href={node.url || "#"}
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors"
          target={node.url?.startsWith("http") ? "_blank" : undefined}
          rel={node.url?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {node.children?.map((child, i) => serializeNode(child, i))}
        </a>
      );

    case "horizontalrule":
      return <hr key={index} className="my-6 border-gray-200" />;

    default:
      if (node.children) {
        return (
          <React.Fragment key={index}>
            {node.children.map((child, i) => serializeNode(child, i))}
          </React.Fragment>
        );
      }
      return null;
  }
}

export function LexicalRenderer({ content }: { content: LexicalContent | null | undefined }) {
  if (!content?.root) {
    return <p className="text-gray-400 italic">Chưa có nội dung.</p>;
  }
  return (
    <div className="lexical-content">
      {content.root.children?.map((child, i) => serializeNode(child, i))}
    </div>
  );
}
