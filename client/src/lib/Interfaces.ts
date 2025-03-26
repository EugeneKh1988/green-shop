import { strict } from "assert";

interface ILink {
    name: string;
    href: string;
}

export interface IImage {
  name: string;
  url: string;
  width?: number;
  height?: number;
}

export interface IHeader {
  logoName: string;
  nav: ILink[];
}

// carousel

export interface ICarouselTitle {
  part1?: string;
  part2?: string;
}
export interface ICarouselSlide {
  title?: string | ICarouselTitle;
  subtitle?: string;
  description?: string;
  button?: {
    name?: string;
    href?: string;
  };
  imageName?: string;
}

export interface ICarousel {
  content?: ICarouselSlide[];
}

// info

export interface IInfoItem {
  title?: string;
  description?: string;
  imageName?: string;
  button?: {
    name?: string;
    href?: string;
  }
}

export interface IInfo {
  items: IInfoItem[];
}

// blogs
export interface IBlog {
  cover?: {
    name?: string;
    url?: string;
  };
  documentId: string;
  publishedAt?: string;
  readTime?: number;
  slug?: string;
  title?: string;
  description?: string;
}

// newsletter
export interface INewsLetter {
  imageName?: string;
  title?: string;
  description?: string;
}

export interface INewsLetters {
  features?: INewsLetter[];
}

// contacts 
export interface IContactItem {
  text?: string;
  iconName?: string;
}

export interface IContactItems {
  items?: IContactItem[];
}

// footer
export interface IFooterGroup {
  groupName?: string;
  links?: ILink[];
}

export interface ISocial {
  iconName?: string;
  href?: string;
}

// plants categories
export interface IPlantCategory {
  name?: string;
  slug?: string;
}

// plant sizes
export interface IPlantSize {
  name?: string;
  slug?: string;
}

export interface IFooterGroups {
  blocks?: IFooterGroup[];
  social?: ISocial[];
}

// banner for homepage
export interface IBanner {
  title?: string;
  offer?: string;
  href?: string;
  imageName?: string;
}

export interface ITextBlock {
  type?: string;
  children?: {
    type?: string;
    text?: string;
    bold?: boolean;
  }[];
}

export interface ISizeCount {
  count?: number;
  size?: string;
}

export interface IPlant {
  documentId?: string;
  name?: string;
  price?: number;
  discount?: number;
  cover?: IImage;
  slug?: string;
  category?: IPlantCategory;
  size?: IPlantSize;
  count?: number;
  description?: ITextBlock[];
  photos?: IImage[];
  sku?: string;
  shortDescription?: string;
  sizeCount?: ISizeCount[];
}

export interface IPlantPage {
  pageCount?: number;
  total?: number;
}

export interface IPlants {
  plants_connection: {
    nodes: IPlant[];
    pageInfo?: IPlantPage;
  };
}
export interface IHomePage {
  homepage: {
    header: IHeader;
    images: IImage[];
    carousel: ICarousel;
    banner: IBanner;
    info: IInfo;
    newsletter: INewsLetters;
    contacts: IContactItems;
    footer: IFooterGroups;
  };
  blogs: IBlog[];
  categories: IPlantCategory[];
  sizes: IPlantSize[];
}

export interface IUser {
  jwt?: string;
  user?: {
    username?: string;
    id?: string;
    email?: string;
    confirmed?: boolean;
  };
}

export interface IAccountDetail {
  documentId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  tel?: string;
  userName?: string;
  user_id?: number;
}
