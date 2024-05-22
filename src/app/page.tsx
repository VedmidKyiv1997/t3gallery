import { db } from "../server/db";

const mockUrls = [
  "https://utfs.io/f/d98ce118-91e9-422d-be56-d831a785efe4-skpjf0.jpeg",
  "https://utfs.io/f/77aa284b-7044-4c96-9fd4-65d55ccfe182-xuptvl.jpeg",
  "https://utfs.io/f/b3ce0253-9b7d-4c49-9655-9fa30c48cfd3-cyqnyb.jpeg",
  "https://utfs.io/f/185fbfb4-1053-4c4b-bd29-f6684d61c791-iizduz.jpeg",
  "https://utfs.io/f/d98ce118-91e9-422d-be56-d831a785efe4-skpjf0.jpeg",
  "https://utfs.io/f/77aa284b-7044-4c96-9fd4-65d55ccfe182-xuptvl.jpeg",
  "https://utfs.io/f/b3ce0253-9b7d-4c49-9655-9fa30c48cfd3-cyqnyb.jpeg",
  "https://utfs.io/f/185fbfb4-1053-4c4b-bd29-f6684d61c791-iizduz.jpeg",
  "https://utfs.io/f/d98ce118-91e9-422d-be56-d831a785efe4-skpjf0.jpeg",
  "https://utfs.io/f/77aa284b-7044-4c96-9fd4-65d55ccfe182-xuptvl.jpeg",
  "https://utfs.io/f/b3ce0253-9b7d-4c49-9655-9fa30c48cfd3-cyqnyb.jpeg",
  "https://utfs.io/f/185fbfb4-1053-4c4b-bd29-f6684d61c791-iizduz.jpeg",
  "https://utfs.io/f/d98ce118-91e9-422d-be56-d831a785efe4-skpjf0.jpeg",
  "https://utfs.io/f/77aa284b-7044-4c96-9fd4-65d55ccfe182-xuptvl.jpeg",
  "https://utfs.io/f/b3ce0253-9b7d-4c49-9655-9fa30c48cfd3-cyqnyb.jpeg",
  "https://utfs.io/f/185fbfb4-1053-4c4b-bd29-f6684d61c791-iizduz.jpeg",
];

const mockImages = mockUrls.map((url, idx) => ({
  id: idx + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4 p-4">
        {mockImages.map((img, i) => (
          <div key={img.id + "-" + i} className="w-48">
            <img src={img.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
