import path from "path";
import type { CollectionConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Văn bản thay thế",
    },
  ],
};
