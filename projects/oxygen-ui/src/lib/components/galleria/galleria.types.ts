export interface GalleriaResponsiveOption {
  breakpoint: string;
  numVisible: number;
}

export interface GalleriaItem {
  itemImageSrc?: string;
  thumbnailImageSrc?: string;
  alt?: string;
  title?: string;
  caption?: string;
  [key: string]: any;
}
