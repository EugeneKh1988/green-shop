
interface ILink {
    name: string;
    href: string;
}

export interface IImage {
    name: string;
    url: string;
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

export interface IHomePage {
  homepage: {
    header: IHeader;
    images: IImage[];
    carousel: ICarousel;
    info: IInfo;
  };
  blogs: IBlog[];
}
