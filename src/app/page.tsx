import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getUserImages } from "../server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getUserImages();
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((img) => (
        <div key={img.id} className="flex w-48 flex-col ">
          <Image
            src={img.url}
            style={{
              objectFit: "contain",
            }}
            width={480}
            height={480}
            alt={img.name}
          />
          <div>{img.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="flex h-full w-full justify-center text-2xl">
          Please sign in
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
