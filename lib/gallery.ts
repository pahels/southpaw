export type GalleryItem = {
  slug: string;
  title: string;
  price?: number;
  priceMin?: number;
  priceMax?: number;
  cover: string;
  images: string[];
  description?: string;
  sizeMultiplier?: number;
  yOffset?: number;
  gridColumn?: number; // force item into this column (1, 2, or 3) on md+ screens
};

export const galleryItems: GalleryItem[] = [
  {
    slug: "iluvnerdz pot",
    title: "iluvnerds Pot",
    price: 175,
    cover: "/gallery/iluvnerdzback.png",
    images: ["/gallery/iluvnerdzback.png", "/gallery/iluvnerdzback.png", "/gallery/iluvnerdzback.png"],
    description: "Ceramic, food safe, handmade",
  },

   {
    slug: "Lighter Cases",
    title: "Lighter Cases",
    priceMin: 30,
    priceMax: 40,
    cover: "/gallery/lighter_cases_1.png",
    images: ["/gallery/lighter_cases_1.png", "/gallery/lighter-cases-2.jpg"],
    description: "Secondhand Lighter Cases - message for customization and inquiries",
    sizeMultiplier: 1.5,
    yOffset: -100
  },

  {
    slug: "Boxing Gloves",
    title: "Boxing Gloves",
    priceMin: 50,
    priceMax: 150,
    cover: "/gallery/boxing-gloves-1.png",
    images: ["/gallery/boxing-glove-1.png", "/gallery/boxing-gloves-2.jpg"],
    description: "Secondhand Gloves - message for customization and inquiries",
  },

  {
    slug: "raver v1",
    title: "raver v1",
    price: 50,
    cover: "/gallery/raver_concept.png",
    images: ["/gallery/raver_concept.png"],
    description: "Framed orignal, acrylic",
    sizeMultiplier: 1,
    yOffset: -1100
  },

  {
    slug: "$outhpaw Hoodie",
    title: "$outhpaw Hoodie",
    price: 150,
    cover: "/gallery/southpawhoodie.png",
    images: ["/gallery/southpawhoodie.png"],
    description: "Hoodie",
    sizeMultiplier: 1,
    yOffset: -600
  },

  {
    slug: "Waiting Killz",
    title: "Waiting Killz",
    price: 100,
    cover: "/gallery/waitingkillz.png",
    images: ["/gallery/waitingkillz.png"],
    description: "Acrylic on Wood",
    sizeMultiplier: 0.5,
    yOffset: -500,
    gridColumn: 2
  },


  {
    slug: "¢ipede",
    title: "¢ipede",
    price: 50,
    cover: "/gallery/¢ipede.png",
    images: ["/gallery/¢ipede.png"],
    description: "Framed orignal, watercolor",
    sizeMultiplier: 1,
    yOffset: -600,
  },

  {
    slug: "Painted Hoodie",
    title: "Painted Hoodie",
    price: 150,
    cover: "/gallery/paintedhoodie.png",
    images: ["/gallery/paintedhoodie.png"],
    description: "Hoodie",
    sizeMultiplier: 1,
    yOffset: -1600,
    gridColumn: 3
  },

  {
    slug: "Boxing Gloves x Waiting Killz",
    title: "Boxing Gloves x Waiting Killz",
    price: 100,
    cover: "/gallery/waitingkillzboxinggloves.png",
    images: ["/gallery/waitingkillzboxinggloves.png"],
    description: "18 oz Boxing Glovesr",
    sizeMultiplier: 1,
    yOffset: -4000,
    gridColumn: 1,
  },

  {
    slug: "$kin [Makeup] Pouch",
    title: "$kin [Makeup] Pouch",
    price: 30,
    cover: "/gallery/skinpouch.png",
    images: ["/gallery/skinpouch.png"],
    description: "Made of fake skin. Can fit 1-2 lip liners + 2-3 lipsticks",
    sizeMultiplier: 1,
    yOffset: -3000,
    gridColumn: 3
  },

    {
    slug: "A$htrays",
    title: "A$htrays",
    priceMin: 45,
    priceMax: 75,
    cover: "/gallery/a$htrays.png",
    images: ["/gallery/a$htrays.png"],
    description: "Metal Ashtrays",
    sizeMultiplier: 1,
    yOffset: -3800,
  },

];