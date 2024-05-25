import { clerkClient } from "@clerk/nextjs/server";
import { deleteUserImage, getUserImage } from "../server/queries";
import { Button } from "../components/ui/button";
import Image from "next/image";

export default async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getUserImage(idAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="relative flex w-full">
        <Image
          src={image.url}
          alt={image.name}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-shrink-0 flex-col border-l text-white">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col p-2">
          <span>Uploaded By</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col p-2">
          <form
            action={async () => {
              "use server";
              await deleteUserImage(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
