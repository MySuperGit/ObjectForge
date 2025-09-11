export interface GalleryItem {
  id: string;
  thumb: string;
  full: string;
  tags: string[];
  author: string;
}

export const gallery: GalleryItem[] = [
  {
    id: '1',
    thumb: 'https://picsum.photos/seed/plaza1/300/400',
    full: 'https://picsum.photos/seed/plaza1/1200/1600',
    tags: ['gallery', 'hot'],
    author: 'Alice'
  },
  {
    id: '2',
    thumb: 'https://picsum.photos/seed/plaza2/300/350',
    full: 'https://picsum.photos/seed/plaza2/1200/1400',
    tags: ['idea', 'tech'],
    author: 'Bob'
  },
  {
    id: '3',
    thumb: 'https://picsum.photos/seed/plaza3/300/500',
    full: 'https://picsum.photos/seed/plaza3/1200/2000',
    tags: ['festival', 'gallery'],
    author: 'Carol'
  },
  {
    id: '4',
    thumb: 'https://picsum.photos/seed/plaza4/300/450',
    full: 'https://picsum.photos/seed/plaza4/1200/1800',
    tags: ['tech'],
    author: 'Dave'
  },
  {
    id: '5',
    thumb: 'https://picsum.photos/seed/plaza5/300/400',
    full: 'https://picsum.photos/seed/plaza5/1200/1600',
    tags: ['idea', 'hot'],
    author: 'Eve'
  },
  {
    id: '6',
    thumb: 'https://picsum.photos/seed/plaza6/300/360',
    full: 'https://picsum.photos/seed/plaza6/1200/1440',
    tags: ['gallery', 'festival'],
    author: 'Frank'
  },
  {
    id: '7',
    thumb: 'https://picsum.photos/seed/plaza7/300/420',
    full: 'https://picsum.photos/seed/plaza7/1200/1680',
    tags: ['hot'],
    author: 'Grace'
  },
  {
    id: '8',
    thumb: 'https://picsum.photos/seed/plaza8/300/380',
    full: 'https://picsum.photos/seed/plaza8/1200/1520',
    tags: ['tech', 'idea'],
    author: 'Heidi'
  }
]

export default gallery
