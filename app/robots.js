export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/tools"],
    },
    sitemap: "https://segunthorpe.com/sitemap.xml",
  };
}
