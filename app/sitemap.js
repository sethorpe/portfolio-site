import { MetadataRoute } from "next";

export default function sitemap() {
  return [
    {
      url: "https://segunthorpe.com",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://segunthorpe.com/projects",
      lastModified: new Date().toISOString(),
    },
  ];
}
