import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only public canonical pages belong here; login and private routes are excluded.
  return [{ url: "https://portofolio.axentraproject.site/" }];
}
