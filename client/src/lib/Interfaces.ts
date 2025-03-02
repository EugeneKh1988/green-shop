
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

export interface IHomePage {
  homepage: {
    header: IHeader;
    images: IImage[];
    carousel: ICarousel
  };
}
