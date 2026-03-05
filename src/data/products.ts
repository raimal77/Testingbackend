export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: "Running" | "Lifestyle" | "Basketball" | "Training";
  image: string;
  description: string;
  sizes: number[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Air Max Pulse",
    brand: "Nike",
    price: 150,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "The Air Max Pulse pulls inspiration from the London music scene, bringing an underground touch to the iconic Air Max line. Its textile-wrapped midsole and vacuum-sealed accents keep it looking fresh and clean, while point-loaded Air cushioning—revamped from the incredibly plush Air Max 270—delivers better bounce, helping you push past your limits.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Red", "White", "Black"],
  },
  {
    id: "2",
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 190,
    category: "Running",
    image: "https://images.unsplash.com/photo-1587563871167-1ee797455c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole, a new generation of adidas BOOST. Its unique molecule design achieves the lightest BOOST foam to date.",
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ["White", "Black", "Grey"],
  },
  {
    id: "3",
    name: "Dunk Low Retro",
    brand: "Nike",
    price: 110,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with perfectly sheened overlays and original university colors. With its classic hoops design, the Nike Dunk Low Retro channels '80s vintage back onto the streets while its padded, low-cut collar lets you take your game anywhere—in comfort.",
    sizes: [7, 8, 9, 10, 11, 12, 13],
    colors: ["Blue", "White"],
  },
  {
    id: "4",
    name: "Gel-Kayano 30",
    brand: "Asics",
    price: 160,
    category: "Running",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "From 5Ks to full marathons, the GEL-KAYANO® 30 shoe is designed to provide advanced stability and softer cushioning properties. The new 4D GUIDANCE SYSTEM™ helps provide adaptive stability.",
    sizes: [8, 9, 10, 11, 12],
    colors: ["Blue", "Green", "Black"],
  },
  {
    id: "5",
    name: "Air Jordan 1 Mid",
    brand: "Jordan",
    price: 125,
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Inspired by the original AJ1, the Air Jordan 1 Mid offers fans a chance to follow in MJ's footsteps. Fresh color trims the clean, classic materials, injecting some newness into the familiar design.",
    sizes: [7, 8, 9, 10, 11, 12, 13, 14],
    colors: ["Red", "Black", "White"],
  },
  {
    id: "6",
    name: "Yeezy Boost 350",
    brand: "Adidas",
    price: 230,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "The YEEZY BOOST 350 V2 features an upper composed of re-engineered Primeknit. The post-dyed monofilament side stripe is woven into the upper. The midsole utilizes adidas' innovative BOOST™ technology.",
    sizes: [5, 6, 7, 8, 9, 10],
    colors: ["Grey", "Black"],
  },
  {
    id: "7",
    name: "Metcon 9",
    brand: "Nike",
    price: 150,
    category: "Training",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Whatever your 'why' is for working out, the Metcon 9 makes it all worth it. We improved on the 8 with a larger Hyperlift plate and added rubber rope wrap. Sworn by some of the greatest athletes in the world.",
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ["Green", "Black"],
  },
  {
    id: "8",
    name: "Chuck 70 Vintage",
    brand: "Converse",
    price: 90,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "The Chuck 70 is built off of the original 1970s design, with premium materials and an extraordinary attention to detail. We added an extra cushy insole for arch support and stability, and used wing tongue stitching on 12oz canvas for durability.",
    sizes: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    colors: ["Black", "White", "Red"],
  }
];
