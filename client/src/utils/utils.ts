import { IImage } from "@/lib/Interfaces";

export const getImageUrl = (imageName: string, images: IImage[]) => {
  const imageItem = images.filter((item) => item.name.startsWith(imageName));
  return imageItem && imageItem.length > 0 ? imageItem[0].url : "#";
};
