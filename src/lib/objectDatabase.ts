interface ObjectData {
  id: string;
  name: string;
  modelPath: string;
  description: string;
  manufacturer?: string;
  year?: string;
  dimensions?: string;
  weight?: string;
  display?: string;
  category?: string;
  preservation?: string;
  purpose?: string;
  species?: string;
  engine?: string;
  transmission?: string;
  performance?: string;
  fuelType?: string;
}

export const objectDatabase: ObjectData[] = [
  {
    id: 'iphone',
    name: 'iPhone 5S',
    modelPath: '/models/iphone/iphone_5s.glb',
    description: 'Classic iPhone model with premium aluminum design.',
    manufacturer: 'Apple',
    year: '2013',
    dimensions: '123.8 x 58.6 x 7.6 mm',
    weight: '112g',
    display: '4-inch Retina Display'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    modelPath: '/models/laptop/lowpoly_laptop_closed.glb',
    description: 'Modern laptop computer with sleek design.',
    manufacturer: 'Generic',
    category: 'Electronics',
    purpose: 'Computing'
  },
  {
    id: 'PORSCHE-911-CARRERA',
    name: 'Porsche 911 Carrera',
    modelPath: '/models/PORSCHE-911-CARRERA.glb',
    description: 'Iconic sports car known for its distinctive design and exceptional performance.',
    manufacturer: 'Porsche',
    year: '2024',
    category: 'Sports Car',
    engine: '3.0L Twin-Turbo Flat-Six',
    transmission: '8-Speed PDK',
    performance: '0-60 mph in 3.5 seconds',
    fuelType: 'Premium Gasoline',
    dimensions: '177.9 x 72.9 x 51.1 inches',
    weight: '3,354 lbs'
  },
  {
    id: 'PORSCHE-911-TURBO',
    name: 'Porsche 911 Turbo',
    modelPath: '/models/PORSCHE-911-TURBO.glb',
    description: 'High-performance variant of the legendary 911, featuring enhanced power and aerodynamics.',
    manufacturer: 'Porsche',
    year: '2024',
    category: 'Sports Car',
    engine: '3.8L Twin-Turbo Flat-Six',
    transmission: '8-Speed PDK',
    performance: '0-60 mph in 2.8 seconds',
    fuelType: 'Premium Gasoline',
    dimensions: '178.6 x 74.9 x 51.3 inches',
    weight: '3,635 lbs'
  },
  {
    id: 'ERTIGA',
    name: 'Suzuki Ertiga',
    modelPath: '/models/ERTIGA.glb',
    description: 'Compact MPV offering versatile family transportation with comfort and efficiency.',
    manufacturer: 'Suzuki',
    year: '2024',
    category: 'MPV',
    engine: '1.5L K15B Smart Hybrid',
    transmission: '5-Speed Manual/4-Speed Automatic',
    performance: 'Fuel efficiency focused',
    fuelType: 'Petrol',
    dimensions: '184.5 x 69.1 x 66.5 inches',
    weight: '2,425 lbs'
  },
  {
    id: 'SWIFT',
    name: 'Suzuki Swift',
    modelPath: '/models/SWIFT.glb',
    description: 'Compact hatchback combining sporty styling with urban practicality.',
    manufacturer: 'Suzuki',
    year: '2024',
    category: 'Hatchback',
    engine: '1.2L DualJet',
    transmission: '5-Speed Manual/CVT',
    performance: 'Agile urban performance',
    fuelType: 'Petrol',
    dimensions: '145.7 x 66.7 x 58.7 inches',
    weight: '1,984 lbs'
  },
  {
    id: 'CRETA',
    name: 'Hyundai Creta',
    modelPath: '/models/CRETA.glb',
    description: 'Modern compact SUV offering style, comfort, and advanced features.',
    manufacturer: 'Hyundai',
    year: '2024',
    category: 'SUV',
    engine: '1.5L MPi Petrol/1.5L CRDi Diesel',
    transmission: '6-Speed Manual/IVT/6-Speed AT',
    performance: 'Balanced power and efficiency',
    fuelType: 'Petrol/Diesel',
    dimensions: '169.3 x 70.9 x 65.0 inches',
    weight: '2,790 lbs'
  },
  {
    id: 'humanskull',
    name: 'Human Skull',
    modelPath: '/models/humanskull.glb',
    description: 'Detailed human skull specimen for medical study.',
    category: 'Anatomical',
    purpose: 'Medical Education',
    preservation: 'Excellent'
  },
  {
    id: 'animalskull',
    name: 'Animal Skull',
    modelPath: '/models/animalskull.glb',
    description: 'Detailed animal skull specimen for biological study.',
    species: 'Mammalian',
    preservation: 'Excellent',
    category: 'Biological',
    purpose: 'Research'
  },
  {
    id: 'prosthetichand',
    name: 'Prosthetic Hand',
    modelPath: '/models/prosthetichand.glb',
    description: 'Advanced prosthetic hand model with articulated joints.',
    category: 'Medical',
    purpose: 'Prosthetics',
    manufacturer: 'Medical Innovations'
  },
  {
    id: 'engineblock',
    name: 'Engine Block',
    modelPath: '/models/engineblock.glb',
    description: 'Detailed engine block model for engineering study.',
    category: 'Mechanical',
    purpose: 'Engineering Study'
  },
  {
    id: 'uav',
    name: 'UAV Drone',
    modelPath: '/models/uav.glb',
    description: 'Unmanned Aerial Vehicle for surveillance and mapping.',
    category: 'Aviation',
    purpose: 'Aerial Survey'
  },
  {
    id: 'uav2',
    name: 'Advanced UAV',
    modelPath: '/models/uav2.glb',
    description: 'Advanced Unmanned Aerial Vehicle with enhanced capabilities.',
    category: 'Aviation',
    purpose: 'Advanced Operations'
  },
  {
    id: 'dna',
    name: 'DNA Structure',
    modelPath: '/models/dna.glb',
    description: 'Detailed DNA double helix structure model.',
    category: 'Biological',
    purpose: 'Scientific Study'
  },
  {
    id: 'atoms',
    name: 'Atomic Structure',
    modelPath: '/models/atoms.glb',
    description: 'Atomic structure visualization for chemistry education.',
    category: 'Chemistry',
    purpose: 'Education'
  },
  {
    id: 'fossil',
    name: 'Fossil Specimen',
    modelPath: '/models/fossil.glb',
    description: 'Ancient fossil specimen for paleontological study.',
    category: 'Paleontology',
    preservation: 'Good',
    purpose: 'Research'
  },
  {
    id: 'sofa',
    name: 'Modern Sofa',
    modelPath: '/models/sofa.glb',
    description: 'Contemporary furniture design showcase.',
    category: 'Furniture',
    purpose: 'Interior Design'
  },
  {
    id: 'sclupture',
    name: 'Modern Sculpture',
    modelPath: '/models/sclupture.glb',
    description: 'Contemporary art sculpture piece.',
    category: 'Art',
    purpose: 'Exhibition'
  },
  {
    id: 'egyptscluptures',
    name: 'Egyptian Sculptures',
    modelPath: '/models/egyptscluptures.glb',
    description: 'Ancient Egyptian sculptural artifacts.',
    category: 'Archaeological',
    purpose: 'Historical Study',
    preservation: 'Well Preserved'
  },
  {
    id: 'greek',
    name: 'Greek Artifact',
    modelPath: '/models/greek.glb',
    description: 'Ancient Greek architectural artifact.',
    category: 'Archaeological',
    purpose: 'Historical Study',
    preservation: 'Excellent'
  },
  {
    id: 'aquincum_city__budapest',
    name: 'Aquincum City',
    modelPath: '/models/aquincum_city__budapest.glb',
    description: 'Ancient Roman city reconstruction from Budapest.',
    category: 'Archaeological',
    purpose: 'Historical Reconstruction'
  },
  {
    id: 'ancientcity',
    name: 'Ancient City',
    modelPath: '/models/ancientcity.glb',
    description: 'Detailed reconstruction of an ancient city.',
    category: 'Archaeological',
    purpose: 'Historical Study',
    preservation: 'Digital Reconstruction'
  }
];

export default objectDatabase; 