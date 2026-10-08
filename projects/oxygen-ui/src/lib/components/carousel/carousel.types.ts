export type CarouselEffect = 'slide' | 'coverflow' | 'cards' | 'fade' | 'perspective';

export interface CarouselResponsiveOption {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}

export interface CarouselPageEvent {
  page: number;
}
