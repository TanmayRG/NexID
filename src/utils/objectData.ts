export interface ObjectData {
  id: string;
  name: string;
  description: string;
  confidence: number;
  modelPath: string;
  thumbnail: string;
  details: {
    [key: string]: string | number;
  };
}

// Real 3D model data
export const objectDatabase: ObjectData[] = [
  // Car Models
  {
    id: "PORSCHE-911-CARRERA",
    name: "Porsche 911 Carrera",
    description: "Iconic sports car known for its distinctive design and performance.",
    confidence: 0.98,
    modelPath: "/models/cars/PORSCHE-911-CARRERA.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'%3E%3C/path%3E%3C/svg%3E",
    details: {
      manufacturer: "Porsche",
      model: "911 Carrera",
      year: 2023,
      engine: "Twin-Turbo Flat-6",
      power: "379 hp",
      acceleration: "4.0s 0-60 mph"
    }
  },
  {
    id: "PORSCHE-911-TURBO",
    name: "Porsche 911 Turbo",
    description: "High-performance variant of the iconic 911 series.",
    confidence: 0.98,
    modelPath: "/models/cars/PORSCHE-911-TURBO.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'%3E%3C/path%3E%3C/svg%3E",
    details: {
      manufacturer: "Porsche",
      model: "911 Turbo",
      year: 2023,
      engine: "Twin-Turbo Flat-6",
      power: "572 hp",
      acceleration: "2.8s 0-60 mph"
    }
  },
  {
    id: "ERTIGA",
    name: "Suzuki Ertiga",
    description: "Compact MPV with versatile seating and comfort features.",
    confidence: 0.97,
    modelPath: "/models/cars/ERTIGA.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'%3E%3C/path%3E%3C/svg%3E",
    details: {
      manufacturer: "Suzuki",
      model: "Ertiga",
      year: 2023,
      engine: "1.5L K15B",
      seating: "7 seats",
      transmission: "5-speed Manual/4-speed Auto"
    }
  },
  {
    id: "SWIFT",
    name: "Suzuki Swift",
    description: "Compact hatchback known for its agile handling and efficiency.",
    confidence: 0.97,
    modelPath: "/models/cars/SWIFT.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'%3E%3C/path%3E%3C/svg%3E",
    details: {
      manufacturer: "Suzuki",
      model: "Swift",
      year: 2023,
      engine: "1.2L DualJet",
      transmission: "5-speed Manual/CVT",
      fuelEfficiency: "23.2 km/l"
    }
  },
  {
    id: "CRETA",
    name: "Hyundai Creta",
    description: "Popular compact SUV with modern features and comfortable ride.",
    confidence: 0.97,
    modelPath: "/models/cars/CRETA.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'%3E%3C/path%3E%3C/svg%3E",
    details: {
      manufacturer: "Hyundai",
      model: "Creta",
      year: 2023,
      engine: "1.5L MPi Petrol",
      transmission: "6-speed Manual/IVT",
      features: "Panoramic Sunroof, ADAS"
    }
  },
  {
    id: "iphone",
    name: "iPhone 5s",
    description: "Classic iPhone model with premium aluminum design.",
    confidence: 0.98,
    modelPath: "/models/iphone/iphone_5s.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'%3E%3C/path%3E%3C/svg%3E",
    details: {
      manufacturer: "Apple",
      model: "iPhone 5s",
      year: 2013,
      dimensions: "123.8 x 58.6 x 7.6 mm",
      weight: "112g",
      display: "4-inch Retina Display"
    }
  },
  {
    id: "laptop",
    name: "Laptop Computer",
    description: "Modern laptop with sleek design and powerful performance.",
    confidence: 0.96,
    modelPath: "/models/laptop/lowpoly_laptop_closed.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'%3E%3C/path%3E%3C/svg%3E",
    details: {
      manufacturer: "TechCorp",
      model: "UltraBook Pro",
      year: 2023,
      processor: "Quantum Core i9",
      memory: "32GB DDR5",
      storage: "2TB SSD"
    }
  },
  {
    id: "humanskull",
    name: "Human Skull",
    description: "Anatomically accurate human skull model for medical study.",
    confidence: 0.95,
    modelPath: "/models/humanskull.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'%3E%3C/path%3E%3C/svg%3E",
    details: {
      type: "Anatomical Model",
      material: "Digital Scan",
      category: "Medical",
      purpose: "Educational"
    }
  },
  {
    id: "animalskull",
    name: "Animal Skull",
    description: "Detailed animal skull specimen for biological study.",
    confidence: 0.93,
    modelPath: "/models/animalskull.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'%3E%3C/path%3E%3C/svg%3E",
    details: {
      species: "Mammalian",
      preservation: "Excellent",
      category: "Biological",
      purpose: "Research"
    }
  },
  {
    id: "prosthetichand",
    name: "Prosthetic Hand",
    description: "Advanced prosthetic hand design with articulated fingers.",
    confidence: 0.97,
    modelPath: "/models/prosthetichand.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228'%3E%3C/path%3E%3C/svg%3E",
    details: {
      type: "Medical Device",
      material: "Biocompatible",
      joints: "Fully Articulated",
      technology: "Advanced Robotics"
    }
  },
  {
    id: "engineblock",
    name: "Engine Block",
    description: "Detailed engine block model showcasing internal combustion design.",
    confidence: 0.94,
    modelPath: "/models/engineblock.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'%3E%3C/path%3E%3C/svg%3E",
    details: {
      type: "Mechanical",
      cylinders: "V8",
      material: "Cast Iron",
      application: "Automotive"
    }
  },
  {
    id: "uav",
    name: "UAV Drone",
    description: "Modern unmanned aerial vehicle with advanced capabilities.",
    confidence: 0.96,
    modelPath: "/models/uav.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.171-.879-1.172-2.303 0-3.182C10.536 7.719 11.768 7.5 12 7.5c1.45 0 2.9.439 4.003 1.318'%3E%3C/path%3E%3C/svg%3E",
    details: {
      type: "Aerial Vehicle",
      category: "Military",
      propulsion: "Quad-Rotor",
      capabilities: "Surveillance"
    }
  },
  {
    id: "dna",
    name: "DNA Structure",
    description: "Double helix structure of DNA molecule.",
    confidence: 0.98,
    modelPath: "/models/dna.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'%3E%3C/path%3E%3C/svg%3E",
    details: {
      type: "Molecular",
      category: "Biology",
      structure: "Double Helix",
      application: "Genetic Research"
    }
  },
  {
    id: "atoms",
    name: "Atomic Model",
    description: "Visualization of atomic structure and electron orbits.",
    confidence: 0.97,
    modelPath: "/models/atoms.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97'%3E%3C/path%3E%3C/svg%3E",
    details: {
      type: "Scientific",
      category: "Physics",
      elements: "Multiple",
      purpose: "Educational"
    }
  },
  {
    id: "fossil",
    name: "Fossil Specimen",
    description: "Ancient fossil specimen with detailed preservation.",
    confidence: 0.92,
    modelPath: "/models/fossil.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'%3E%3C/path%3E%3C/svg%3E",
    details: {
      era: "Jurassic",
      type: "Vertebrate",
      preservation: "Excellent",
      age: "150 Million Years"
    }
  },
  {
    id: "greek",
    name: "Ancient Greek Artifact",
    description: "Ancient fossil specimen with detailed preservation.",
    confidence: 0.92,
    modelPath: "/models/greek.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'%3E%3C/path%3E%3C/svg%3E",
    details: {
      era: "Jurassic",
      type: "Vertebrate",
      preservation: "Excellent",
      age: "150 Million Years"
    }
  },
  {
    id: "ancientcity",
    name: "Ancient City",
    description: "Ancient fossil specimen with detailed preservation.",
    confidence: 0.92,
    modelPath: "/models/ancientcity.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'%3E%3C/path%3E%3C/svg%3E",
    details: {
      era: "Ancient",
      type: "City",
      preservation: "Excellent",
      age: "150 Million Years"
    }
  },
  {
    id: "aquincum_city__budapest",
    name: "Aquincum City",
    description: "Detailed reconstruction of the ancient Roman city of Aquincum.",
    confidence: 0.94,
    modelPath: "/models/aquincum_city__budapest.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'%3E%3C/path%3E%3C/svg%3E",
    details: {
      location: "Budapest, Hungary",
      period: "Roman",
      type: "Archaeological Site",
      features: "Military Camp, Civilian City"
    }
  },
  {
    id: "sofa",
    name: "Modern Sofa",
    description: "Contemporary sofa design with clean lines and comfort.",
    confidence: 0.96,
    modelPath: "/models/sofa.glb",
    thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230EA5E9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'%3E%3C/path%3E%3C/svg%3E",
    details: {
      style: "Contemporary",
      material: "Fabric",
      dimensions: "220x85x75 cm",
      seating: "3-seater"
    }
  }
];

export function getRandomObject(): ObjectData {
  const randomIndex = Math.floor(Math.random() * objectDatabase.length);
  return objectDatabase[randomIndex];
}

export function findObjectById(id: string): ObjectData | undefined {
  return objectDatabase.find(obj => obj.id === id);
}
