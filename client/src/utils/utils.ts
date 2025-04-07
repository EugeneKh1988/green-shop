import { IImage, IPlantCart } from "@/lib/Interfaces";

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

// get from localStorage
export function fromLocalStorage<StorageType>(key: string): StorageType | null {
  // null if run on server
  if(typeof window === "undefined") {
    return null;
  }
  const itemStr = localStorage?.getItem(key);
  if (itemStr) {
    const item: StorageType = JSON.parse(itemStr);
    return item;
  } else {
    return null;
  }
}

// set data to localStorage
export function toLocalStorage<StorageType>(key: string, data: StorageType) {
  // if run on server
  if(typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
}

// delete data from localStorage
export function delFromLocalStorage(key: string) {
  // if run on server
  if(typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(key);
}

// add plant to cart
export const toCart = (plantCart: IPlantCart) => {
  const cartPlants = fromLocalStorage<IPlantCart[]>("cart");
  // if empty
  if (!cartPlants) {
    toLocalStorage<IPlantCart[]>("cart", [plantCart]);
  }
  if (cartPlants && cartPlants.length >= 0) {
    // change cart count value
    const foundedIndex = cartPlants.findIndex(
      (cartItem) =>
        cartItem.documentId == plantCart.documentId &&
        cartItem.sizeCount?.size == plantCart.sizeCount?.size
    );
    if (
      foundedIndex >= 0 &&
      cartPlants[foundedIndex].sizeCount &&
      cartPlants[foundedIndex].sizeCount.count &&
      plantCart.sizeCount?.count
    ) {
      cartPlants[foundedIndex].sizeCount.count = plantCart.sizeCount?.count;
    }
    // add new item to cart
    else {
      cartPlants.push(plantCart);
    }
    toLocalStorage<IPlantCart[]>("cart", cartPlants);
  }
};

 // total plant's count in cart
 export const plantsCount = () => {
  const cartPlants = fromLocalStorage<IPlantCart[]>("cart");
  if(cartPlants && cartPlants.length > 0) {
    let count = 0;
    cartPlants.forEach(plantItem => plantItem.sizeCount?.count ? count += plantItem.sizeCount?.count : null);
    return count;
  }
  else {
    return 0;
  }
};
