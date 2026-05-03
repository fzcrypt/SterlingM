import { MangoVariety, FarmLog } from './types';

export const MANGO_VARIETIES: MangoVariety[] = [
  {
    id: 'dasheri',
    name: 'Dasheri',
    scientificName: 'Mangifera indica L. var. Dasheri',
    description: 'The Dasheri mango is a mango cultivar which originated in a village near Malihabad in Lucknow district and was recognised in the 18th century. It is a sweet and fragrant variety of mango grown in India and Nepal. Malihabad in Uttar Pradesh is the largest producer.',
    pricePerKg: 199,
    seasonStatus: 'In Stock',
    harvestDate: 'June 15, 2026',
    purityScore: 99,
    certification: ['Organic Certified', 'Carbide-Free', 'Hand-Picked'],
    images: ['/dasheri-mango.jpg'],
    availableWeights: [1, 2, 5, 10]
  },
  {
    id: 'langra',
    name: 'Langra',
    scientificName: 'Mangifera indica L. var. Langra',
    description: 'The \'Langra\' mango, also known as Benarasi Langra, is a mango cultivar that was first cultivated in Banaras in present-day Uttar Pradesh, India 250 to 300 years ago. Apart from Uttar Pradesh, it is also grown in the states of Bihar and West Bengal. This cultivar retains a greenish tinge while ripening. It is normally harvested during mid-June to last half of July. Around 2006, it was known to be gaining popularity on the international market. It is considered suitable for slicing and canning.',
    pricePerKg: 249,
    seasonStatus: 'Pre-Order',
    harvestDate: 'July 1, 2026',
    purityScore: 100,
    certification: ['Organic Certified', 'Carbide-Free'],
    images: ['/langra-mango.jpg'],
    availableWeights: [2, 5, 10]
  },
  {
    id: 'chausa',
    name: 'Chaunsa (Sumer Bahist)',
    scientificName: 'Mangifera indica L. var. Chaunsa',
    description: 'Chaunsa (Sindhi: چونسو, Punjabi: چونسا) is a variety of mango. Origin Chausa, Bihar India. Also called "sumer bahist" This variety of mango was originally made popular by Sher Shah Suri throughout the subcontinent. While commemorating his victory over Humayun at Chausa, he gave his favorite mango the name Chaunsa. Chaunsa mango has a golden yellow color when It is soft, almost fibreless and has an aromatic pleasant sweet flavor. Commonly available varieties in India are greenish-yellow. The unique taste and richness in its flavor makes it a worldwide favorite. Chaunsa is commonly called the "King of Mangoes". Overall it is considered the best mango in terms of its rich aroma, sweet taste, juicy pulp and high nutritional value. The season for Chaunsa in India normally starts at the beginning of June, and ends in the third week of August. Due to demand, it is heavily exported to the Middle East, Europe, and most recently to the United States. There are three known types of Chaunsa mangoes: Honey Chaunsa, Sweet Chaunsa, and White Chaunsa. White Chaunsa is considered best for export due to its longer shelf life.',
    pricePerKg: 299,
    seasonStatus: 'Season Opening',
    harvestDate: 'July 15, 2026',
    purityScore: 98,
    certification: ['Organic Certified', 'Carbide-Free', 'Naturally Ripened'],
    images: ['/chaunsa-mango.jpg'],
    availableWeights: [5, 10]
  },
  {
    id: 'alphonso',
    name: 'Hapoos (Alphonso)',
    scientificName: 'Mangifera indica L. var. Alphonso',
    description: 'The Alphonso mango is a named mango cultivar that originates from India. In the UK in 2012, it was considered one of the most prized mangoes, known for its saffron-coloured flesh and culinary uses in various dishes and desserts.',
    pricePerKg: 599,
    seasonStatus: 'Sold Out',
    harvestDate: 'May 10, 2026',
    purityScore: 100,
    certification: ['Organic Certified', 'Carbide-Free', 'Export Grade'],
    images: ['https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=2574&auto=format&fit=crop'],
    availableWeights: [3, 6]
  }
];

export const FARM_LOGS: FarmLog[] = [
  {
    id: 'log-1',
    date: 'April 25, 2026',
    activity: 'Tree Pruning & Nutrition',
    description: 'Carefully pruned 200 Dasheri trees to ensure better sunlight penetration for the upcoming harvest. Applied fermented organic compost.',
    image: '/pruning.png',
    category: 'Pruning'
  },
  {
    id: 'log-2',
    date: 'April 28, 2026',
    activity: 'Fruit Inspection',
    description: 'Random sampling of Langra fruits showed excellent skin health and zero pest infestation. Organic neem oil spray applied as a preventive measure.',
    image: '/hero-mango-generated.png',
    category: 'Inspection'
  }
];
