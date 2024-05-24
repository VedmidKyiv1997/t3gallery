import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

function getUser() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  return user;
}

export async function getUserImages() {
  const user = getUser();

  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
}

export async function getUserImage(id: number) {
  const user = getUser();

  const image = await db.query.images.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, id), eq(model.userId, user.userId)),
  });

  if (!image) throw new Error("Image not found");

  return image;
}
