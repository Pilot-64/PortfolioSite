import { getImages } from "@/lib/s3-client";
import MasonryGallery from "./components/MasonryGallery";

export default async function PhotographyPage() {
  const images = await getImages();

  return (
    <main className="pt-[100px] pb-[40px] px-6">
      <MasonryGallery images={images} />
    </main>
  );
}

// Optional: re-fetch from MinIO every 120 seconds (ISR)
export const revalidate = 120;
