
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

export interface IHomePage {
  homepage: {
    header: IHeader;
    images: IImage[];
  };
}
