import { db } from "../server/db";

export const dynamic = "force-dynamic";


export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="">
      <div className="flex flex-wrap gap-4 p-4">
        {[...images].map((img, i) => (
          <div key={img.id + "-" + i} className="flex w-48 flex-col">
            <img src={img.url} />
            <div>{img.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
