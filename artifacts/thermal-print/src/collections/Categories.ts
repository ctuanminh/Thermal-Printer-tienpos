import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Tên danh mục",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
    },
    {
      name: "description",
      type: "textarea",
      label: "Mô tả",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Hình ảnh",
    },
  ],
};
