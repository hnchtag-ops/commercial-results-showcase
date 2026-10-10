export interface CommercialResult {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  metadata: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    material: string;
    lighting: string[];
  };
}

export const COMMERCIAL_RESULTS: CommercialResult[] = [
  {
    id: "01",
    title: "Silken Verses",
    category: "Fashion / Editorial",
    description: "An exploration of sheer silk chiffon under diffused soft-box highlights, creating a dreamlike transparency.",
    imageUrl: "/src/assets/images/commercial_fashion_silk_1779024349623.png",
    metadata: {
      camera: "Medium Format Digital",
      lens: "80mm Anamorphic",
      aperture: "f/2.8",
      shutter: "1/250s",
      material: "Sheer Silk Chiffon",
      lighting: ["Rembrandt", "Diffused Soft-box"]
    }
  },
  {
    id: "02",
    title: "Liquid Chrome",
    category: "Product / Abstract",
    description: "Liquid metallic drapery captured with cinematic backlighting to emphasize fluid form and specular highlights.",
    imageUrl: "/src/assets/images/commercial_metallic_drapery_1779024368173.png",
    metadata: {
      camera: "Medium Format Digital",
      lens: "80mm Anamorphic",
      aperture: "f/2.8",
      shutter: "1/250s",
      material: "Liquid Metallic Drapery",
      lighting: ["Cinematic Backlighting", "Industrial Shadows"]
    }
  },
  {
    id: "03",
    title: "Woolen Architecture",
    category: "Macro / Texture",
    description: "A deep dive into matte wool weave, utilizing stark industrial shadows to define structural integrity.",
    imageUrl: "/src/assets/images/commercial_wool_texture_1779024381504.png",
    metadata: {
      camera: "Medium Format Digital",
      lens: "80mm Anamorphic",
      aperture: "f/2.8",
      shutter: "1/250s",
      material: "Matte Wool Weave",
      lighting: ["Rembrandt", "Industrial Shadows"]
    }
  },
  {
    id: "04",
    title: "The Patent Study",
    category: "Luxury / Still Life",
    description: "Capturing the intense reflectivity of patent leather under a mix of harsh industrial and soft diffused lighting.",
    imageUrl: "/src/assets/images/commercial_patent_leather_1779024397734.png",
    metadata: {
      camera: "Medium Format Digital",
      lens: "80mm Anamorphic",
      aperture: "f/2.8",
      shutter: "1/250s",
      material: "Patent Leather",
      lighting: ["Industrial Shadows", "Soft-box Highlights"]
    }
  }
];
