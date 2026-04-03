export interface Product {
  id: string;
  title: string;
  author?: string;
  price: number;
  image: string;
  category: 'book' | 'academy';
  theme: 'quran' | 'prophets' | 'ramadan' | 'bedtime' | 'general' | 'bilingual';
  description: string;
  ageRange?: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'The Story of Prophet Nuh',
    author: 'NoorKids Editorial',
    price: 14.99,
    image: 'https://picsum.photos/seed/nuhbook/400/500',
    category: 'book',
    theme: 'prophets',
    description: 'A beautifully illustrated book telling the story of Prophet Nuh (AS) and his incredible patience and trust in Allah. Perfect for bedtime reading.',
    ageRange: '4-8 years'
  },
  {
    id: '2',
    title: 'My First Quran Stories',
    author: 'NoorKids Editorial',
    price: 18.99,
    image: 'https://picsum.photos/seed/quranbook1/400/500',
    category: 'book',
    theme: 'quran',
    description: 'Introduce your little ones to the beautiful stories of the Quran with simple language and captivating illustrations.',
    ageRange: '3-6 years'
  },
  {
    id: '3',
    title: 'Ramadan Moon Watchers',
    author: 'NoorKids Editorial',
    price: 12.99,
    image: 'https://picsum.photos/seed/ramadanbook1/400/500',
    category: 'book',
    theme: 'ramadan',
    description: 'Join Ali and Fatima as they look for the Ramadan moon and learn about the blessings of the holy month.',
    ageRange: '5-9 years'
  },
  {
    id: '4',
    title: 'Goodnight, Little Muslim',
    author: 'NoorKids Editorial',
    price: 15.99,
    image: 'https://picsum.photos/seed/bedtimebook1/400/500',
    category: 'book',
    theme: 'bedtime',
    description: 'A soothing bedtime story that incorporates evening duas and reflections on Allah\'s creations.',
    ageRange: '2-5 years'
  },
  {
    id: '5',
    title: 'Bilingual Quran Words (English/Arabic)',
    author: 'NoorKids Editorial',
    price: 16.99,
    image: 'https://picsum.photos/seed/bilingualbook1/400/500',
    category: 'book',
    theme: 'bilingual',
    description: 'Learn foundational Quranic vocabulary in both English and Arabic with this interactive board book.',
    ageRange: '0-4 years'
  },
  {
    id: '6',
    title: 'Stories of the Prophets Bundle',
    author: 'NoorKids Editorial',
    price: 45.99,
    image: 'https://picsum.photos/seed/prophetsbundle/400/500',
    category: 'book',
    theme: 'prophets',
    description: 'A complete 4-book set featuring the stories of Ibrahim, Musa, Isa, and Muhammad (Peace Be Upon Them All).',
    ageRange: '6-12 years'
  },
  {
    id: '7',
    title: 'NoorKids Academy: Monthly Subscription',
    price: 9.99,
    image: 'https://picsum.photos/seed/academy1/400/500',
    category: 'academy',
    theme: 'general',
    description: 'Get access to our interactive learning platform, featuring audio stories, printable activities, and guided learning paths.',
    ageRange: '4-10 years'
  },
  {
    id: '8',
    title: 'Ramadan Activity Pack (Digital + Print)',
    price: 19.99,
    image: 'https://picsum.photos/seed/ramadanpack/400/500',
    category: 'academy',
    theme: 'ramadan',
    description: 'A comprehensive activity pack to keep kids engaged during Ramadan. Includes daily crafts, dua cards, and a fasting tracker.',
    ageRange: '5-12 years'
  }
];
