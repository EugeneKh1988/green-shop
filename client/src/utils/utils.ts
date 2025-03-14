import { IImage } from "@/lib/Interfaces";

export const getImageUrl = (imageName: string, images: IImage[]) => {
  const imageItem = images.filter((item) => item.name.startsWith(imageName));
  return imageItem && imageItem.length > 0 ? imageItem[0].url : "#";
};

export const getImageWidth = (imageName: string, images: IImage[]) => {
  const imageItem = images.filter((item) => item.name.startsWith(imageName));
  return imageItem && imageItem.length > 0 ? imageItem[0]?.width : 0;
};

export const getImageHeight = (imageName: string, images: IImage[]) => {
  const imageItem = images.filter((item) => item.name.startsWith(imageName));
  return imageItem && imageItem.length > 0 ? imageItem[0]?.height : 0;
};

export const discountPrice = (discount?: number, price?: number) => {
  if (price && discount) {
    return (price - (price * discount) / 100).toFixed(2);
  }
  return price?.toFixed(2);
};