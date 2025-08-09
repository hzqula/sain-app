export type Member = {
  id: string;
  name: string;
  role: string;
  major: string;
  university: string;
  avatar: string;
  email?: string;
  phone?: string;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  coordinates: string;
  description: string;
  image: string;
};

export type Program = {
  id: string;
  title: string;
  ownerIds: string[];
  date: string;
  status: "Selesai" | "Sedang Berlangsung" | "Akan Datang";
  category: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export const members: Member[] = [
  {
    id: "m1",
    name: "Nur Fajri Hermawan",
    role: "Koordinator Desa",
    major: "Manajemen Pendidikan Islam",
    university: "Fakultas Tarbiyah dan Keguruan",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m2",
    name: "Pardian M. Syaputra",
    role: "Wakil Koordinator Desa",
    major: "Hukum Tata Negara (Siyasah)",
    university: "Fakultas Syariah dan Hukum",
    avatar: "/placeholder.svg?height=96&width=96",
    email: "budi.santoso@example.com",
  },
  {
    id: "m3",
    name: "Ghefira Farisa",
    role: "Sekretaris",
    major: "Pendidikan Ekonomi",
    university: "Fakultas Tarbiyah dan Keguruan",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m4",
    name: "Wan Nabila Putri",
    role: "Bendahara",
    major: "Agroteknologi",
    university: "Fakultas Pertanian dan Peternakan",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m5",
    name: "Pita Melani Sinta Siregar",
    role: "Humas",
    major: "Ilmu Komunikasi",
    university: "Fakultas Dakwah dan Komunikasi",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m6",
    name: "Nabel Fahmi",
    role: "Humas",
    major: "Manajemen",
    university: "Fakultas Ekonomi dan Sosial",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m7",
    name: "Zelda Ramadhanti Savitri",
    role: "Acara",
    major: "Psikologi",
    university: "Fakultas Psikologi",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m8",
    name: "Nirmala Sari",
    role: "Konsumsi",
    major: "Ilmu Komunikasi",
    university: "Fakultas Dakwah dan Komunikasi",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m9",
    name: "Nurul Ain Sarida",
    role: "Keagamaan",
    major: "Ilmu Al-Quran dan Tafsir",
    university: "Fakultas Ushuluddin",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m10",
    name: "Luqman Hakim Al-Hudry",
    role: "Perlengkapan",
    major: "Teknik Informatika",
    university: "Fakultas Sains dan Teknologi",
    avatar: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "m11",
    name: "Nuradhifa Ismawinda",
    role: "Publikasi, Dokumentasi, dan Desain",
    major: "Gizi",
    university: "Fakultas Pertanian dan Peternakan",
    avatar: "/placeholder.svg?height=96&width=96",
  },
];

export const locations: Location[] = [
  {
    id: "l1",
    name: "Dusun I",
    address: "Parit Tukang",
    coordinates: "-2.123, 112.456",
    description: "",
    image: "/placeholder.svg?height=360&width=640",
  },
  {
    id: "l2",
    name: "Dusun II",
    address: "Makmur",
    coordinates: "-2.124, 112.461",
    description:
      "Health outreach and sanitation improvement initiatives with community volunteers.",
    image: "/placeholder.svg?height=360&width=640",
  },
  {
    id: "l3",
    name: "Dusun III",
    address: "Simpang Ayam",
    coordinates: "-2.129, 112.465",
    description:
      "Environmental clean-up and waste management awareness activities.",
    image: "/placeholder.svg?height=360&width=640",
  },
];

export const programCategories = [
  "Education",
  "Health",
  "Environment",
  "Economy",
];

export const programs: Program[] = [
  {
    id: "p1",
    title: "Sosialisasi Bijak dalam Menggunakan Media Sosial",
    ownerIds: ["m8", "m2"], // Multiple owners
    date: "July, 2025",
    status: "Selesai",
    category: "Education",
  },
  {
    id: "p2",
    title: "Sosialisasi Menabung Sejak Dini",
    ownerIds: ["m3"], // Multiple owners
    date: "Aug, 2025",
    status: "Selesai",
    category: "Education",
  },
  {
    id: "p3",
    title: "Sosialisasi Gizi",
    ownerIds: ["m11"], // Multiple owners
    date: "Aug, 2025",
    status: "Selesai",
    category: "Health",
  },
  {
    id: "p4",
    title: "Maghrib Mengaji",
    ownerIds: ["m9"], // Multiple owners
    date: "Aug, 2025",
    status: "Sedang Berlangsung",
    category: "Health",
  },
  {
    id: "p5",
    title: "Digitalisasi UMKM dengan QRIS",
    ownerIds: ["m6"], // Multiple owners
    date: "Aug, 2025",
    status: "Akan Datang",
    category: "Economy",
  },
  {
    id: "p6",
    title: "Penanaman Bibit Toga",
    ownerIds: ["m4"], // Multiple owners
    date: "Aug, 2025",
    status: "Akan Datang",
    category: "Environment",
  },
];

export const gallery: GalleryImage[] = [
  {
    id: "g1",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Teaching session with local students",
    caption: "Literacy workshop in Dusun A",
  },
  {
    id: "g2",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Health screening event",
    caption: "Basic health screening at Dusun B",
  },
  {
    id: "g3",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Community clean-up program",
    caption: "Clean-up initiative at Dusun C",
  },
  {
    id: "g4",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Tree planting day",
    caption: "Planting mangrove seedlings",
  },
  {
    id: "g5",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Local product branding session",
    caption: "Supporting MSMEs with branding",
  },
  {
    id: "g6",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Workshop facilitation",
  },
  {
    id: "g7",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Group photo with community",
  },
  {
    id: "g8",
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Village scenery",
  },
];
