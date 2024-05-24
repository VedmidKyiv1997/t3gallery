import { getUserImage } from "../server/queries";

export default async function FullPageImageView(props: { photoId: number }) {
  const image = await getUserImage(props.photoId);
  return <img src={image.url} className="w-96" />;
}
