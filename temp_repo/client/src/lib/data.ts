// Product Data
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'women' | 'men' | 'accessories';
};

export const products: Product[] = [
  {
    id: 1,
    name: "Artistic Denim Jacket",
    description: "Hand-painted design",
    price: 89,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "women"
  },
  {
    id: 2,
    name: "Sketched Graphic Tee",
    description: "Organic cotton, relaxed fit",
    price: 45,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "men"
  },
  {
    id: 3,
    name: "Doodled Canvas Tote",
    description: "Hand-drawn original design",
    price: 38,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "accessories"
  },
  {
    id: 4,
    name: "Artisan Printed Dress",
    description: "Sustainable viscose blend",
    price: 120,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "women"
  },
  {
    id: 5,
    name: "Artist's Bomber Jacket",
    description: "Embroidered details",
    price: 135,
    image: "https://images.unsplash.com/photo-1559582798-678dfc71ccd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "men"
  },
  {
    id: 6,
    name: "Handcrafted Beanie",
    description: "Recycled yarn, one size",
    price: 32,
    image: "https://images.unsplash.com/photo-1622760807800-66cf1466ad49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "accessories"
  }
];

// Lookbook Images
export type LookbookImage = {
  id: number;
  image: string;
  alt: string;
};

export const lookbookImages: LookbookImage[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Fashion lookbook model 1"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Fashion lookbook model 2"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Fashion lookbook model 3"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Fashion lookbook model 4"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Fashion lookbook model 5"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Fashion lookbook model 6"
  }
];

// Testimonials
export type Testimonial = {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah J.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
    text: "\"Their clothes are like wearable art! Every time I put on their hand-painted jacket, I get so many compliments. The quality is amazing and I love supporting a brand that cares about sustainability.\"",
    rating: 5
  },
  {
    id: 2,
    name: "Michael R.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
    text: "\"As a fashion photographer, I'm picky about my clothes. Sketch & Stitch stands out because of their unique artistic approach. The detailed hand-drawn designs make each piece special - like owning custom artwork.\"",
    rating: 5
  },
  {
    id: 3,
    name: "Elena T.",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80",
    text: "\"I've never been much of a fashion person until I discovered Sketch & Stitch. Their creative approach to clothing completely changed my perspective. Now I can express my artistic side through what I wear!\"",
    rating: 5
  }
];
