import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { images } from "./db/schema";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

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

export async function deleteUserImage(id: number) {
  const user = getUser();

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete-image",
    properties: {
      image_id: id,
    },
  });

  redirect("/");
}
