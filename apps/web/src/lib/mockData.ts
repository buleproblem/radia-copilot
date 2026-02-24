export type PinType = "terrestrial" | "internet" | "creator" | "talk";

export interface Station {
  id: string;
  name: string;
  pinType: PinType;
  listeners: number;
  currentSong?: string;
  artist?: string;
  genre: string;
  city: string;
  country: string;
  continent: string;
  frequency?: string;
  streamUrl?: string;
}

export interface Country {
  name: string;
  slug: string;
  stations: Station[];
}

export interface Continent {
  name: string;
  slug: string;
  listeners: number;
  stations: number;
  color: string;
  position: [number, number, number];
  countries: Country[];
}

export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
}

export interface RoomUser {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export const PIN_COLORS: Record<PinType, string> = {
  terrestrial: "#00d4ff",
  internet: "#a855f7",
  creator: "#22c55e",
  talk: "#ff6b35",
};

export const PIN_LABELS: Record<PinType, string> = {
  terrestrial: "Terrestrial (AM/FM)",
  internet: "Internet Radio",
  creator: "Creator/Podcast",
  talk: "Talk/Sports",
};

export const PIN_ICONS: Record<PinType, string> = {
  terrestrial: "📡",
  internet: "🌐",
  creator: "🎙️",
  talk: "🎤",
};

export const continents: Continent[] = [
  {
    name: "North America",
    slug: "north-america",
    listeners: 4_820_000,
    stations: 12_400,
    color: "#00d4ff",
    position: [-0.8, 0.5, 0.5],
    countries: [
      {
        name: "United States",
        slug: "us",
        stations: [
          {
            id: "wnyc",
            name: "WNYC 93.9 FM",
            pinType: "terrestrial",
            listeners: 128_000,
            currentSong: "Morning Edition",
            artist: "NPR",
            genre: "News/Talk",
            city: "New York",
            country: "United States",
            continent: "north-america",
            frequency: "93.9 FM",
          },
          {
            id: "kcrw",
            name: "KCRW 89.9 FM",
            pinType: "terrestrial",
            listeners: 95_000,
            currentSong: "World Cafe",
            artist: "NPR Music",
            genre: "Indie/Alt",
            city: "Santa Monica",
            country: "United States",
            continent: "north-america",
            frequency: "89.9 FM",
          },
          {
            id: "soma-fm",
            name: "SomaFM Groove Salad",
            pinType: "internet",
            listeners: 72_000,
            currentSong: "Ambient Journey",
            artist: "Carbon Based Lifeforms",
            genre: "Ambient/Electronic",
            city: "San Francisco",
            country: "United States",
            continent: "north-america",
          },
        ],
      },
      {
        name: "Canada",
        slug: "ca",
        stations: [
          {
            id: "cbc-r1",
            name: "CBC Radio One",
            pinType: "terrestrial",
            listeners: 64_000,
            currentSong: "As It Happens",
            artist: "CBC",
            genre: "News/Talk",
            city: "Toronto",
            country: "Canada",
            continent: "north-america",
            frequency: "99.1 FM",
          },
          {
            id: "cfny",
            name: "102.1 The Edge",
            pinType: "terrestrial",
            listeners: 41_000,
            currentSong: "Blinding Lights",
            artist: "The Weeknd",
            genre: "Alternative Rock",
            city: "Toronto",
            country: "Canada",
            continent: "north-america",
            frequency: "102.1 FM",
          },
        ],
      },
      {
        name: "Mexico",
        slug: "mx",
        stations: [
          {
            id: "reactor",
            name: "Reactor 105.7",
            pinType: "terrestrial",
            listeners: 38_000,
            currentSong: "Bad Guy",
            artist: "Billie Eilish",
            genre: "Pop/Rock",
            city: "Mexico City",
            country: "Mexico",
            continent: "north-america",
            frequency: "105.7 FM",
          },
        ],
      },
    ],
  },
  {
    name: "Europe",
    slug: "europe",
    listeners: 6_140_000,
    stations: 18_700,
    color: "#a855f7",
    position: [0.1, 0.8, 0.55],
    countries: [
      {
        name: "United Kingdom",
        slug: "gb",
        stations: [
          {
            id: "bbc-r1",
            name: "BBC Radio 1",
            pinType: "terrestrial",
            listeners: 310_000,
            currentSong: "Flowers",
            artist: "Miley Cyrus",
            genre: "Pop",
            city: "London",
            country: "United Kingdom",
            continent: "europe",
            frequency: "98.8 FM",
          },
          {
            id: "nts-radio",
            name: "NTS Radio",
            pinType: "internet",
            listeners: 87_000,
            currentSong: "The Watcher",
            artist: "Dean Martin",
            genre: "Eclectic",
            city: "London",
            country: "United Kingdom",
            continent: "europe",
          },
        ],
      },
      {
        name: "Germany",
        slug: "de",
        stations: [
          {
            id: "fritz",
            name: "Fritz Radio",
            pinType: "terrestrial",
            listeners: 92_000,
            currentSong: "Ohne Dich",
            artist: "Rammstein",
            genre: "Rock",
            city: "Berlin",
            country: "Germany",
            continent: "europe",
            frequency: "102.6 FM",
          },
          {
            id: "flux-fm",
            name: "Flux FM",
            pinType: "terrestrial",
            listeners: 55_000,
            currentSong: "Levitating",
            artist: "Dua Lipa",
            genre: "Pop/Indie",
            city: "Berlin",
            country: "Germany",
            continent: "europe",
            frequency: "100.6 FM",
          },
        ],
      },
      {
        name: "France",
        slug: "fr",
        stations: [
          {
            id: "fip",
            name: "FIP Radio",
            pinType: "terrestrial",
            listeners: 78_000,
            currentSong: "Ne Me Quitte Pas",
            artist: "Jacques Brel",
            genre: "Eclectic/Jazz",
            city: "Paris",
            country: "France",
            continent: "europe",
            frequency: "105.1 FM",
          },
        ],
      },
    ],
  },
  {
    name: "Asia",
    slug: "asia",
    listeners: 8_920_000,
    stations: 24_100,
    color: "#22c55e",
    position: [0.7, 0.5, 0.5],
    countries: [
      {
        name: "Japan",
        slug: "jp",
        stations: [
          {
            id: "nhk-world",
            name: "NHK World Radio Japan",
            pinType: "terrestrial",
            listeners: 145_000,
            currentSong: "News Update",
            artist: "NHK",
            genre: "News",
            city: "Tokyo",
            country: "Japan",
            continent: "asia",
          },
          {
            id: "j-wave",
            name: "J-WAVE 81.3 FM",
            pinType: "terrestrial",
            listeners: 88_000,
            currentSong: "Dynamite",
            artist: "BTS",
            genre: "J-Pop/Pop",
            city: "Tokyo",
            country: "Japan",
            continent: "asia",
            frequency: "81.3 FM",
          },
        ],
      },
      {
        name: "South Korea",
        slug: "kr",
        stations: [
          {
            id: "mbc-fm4u",
            name: "MBC FM4U",
            pinType: "terrestrial",
            listeners: 112_000,
            currentSong: "LOVE DIVE",
            artist: "IVE",
            genre: "K-Pop",
            city: "Seoul",
            country: "South Korea",
            continent: "asia",
            frequency: "91.9 FM",
          },
        ],
      },
      {
        name: "India",
        slug: "in",
        stations: [
          {
            id: "radio-mirchi",
            name: "Radio Mirchi 98.3 FM",
            pinType: "terrestrial",
            listeners: 203_000,
            currentSong: "Kesariya",
            artist: "Arijit Singh",
            genre: "Bollywood",
            city: "Mumbai",
            country: "India",
            continent: "asia",
            frequency: "98.3 FM",
          },
        ],
      },
    ],
  },
  {
    name: "South America",
    slug: "south-america",
    listeners: 2_350_000,
    stations: 8_600,
    color: "#ff6b35",
    position: [-0.4, -0.3, 0.8],
    countries: [
      {
        name: "Brazil",
        slug: "br",
        stations: [
          {
            id: "radio-transamérica",
            name: "Rádio Transamérica",
            pinType: "terrestrial",
            listeners: 95_000,
            currentSong: "Evidências",
            artist: "Chitãozinho & Xororó",
            genre: "Sertanejo",
            city: "São Paulo",
            country: "Brazil",
            continent: "south-america",
            frequency: "100.9 FM",
          },
          {
            id: "radio-globo",
            name: "Rádio Globo",
            pinType: "talk",
            listeners: 148_000,
            currentSong: "Live Football",
            artist: "Flamengo vs Palmeiras",
            genre: "Sports/Talk",
            city: "Rio de Janeiro",
            country: "Brazil",
            continent: "south-america",
            frequency: "98.1 FM",
          },
        ],
      },
      {
        name: "Argentina",
        slug: "ar",
        stations: [
          {
            id: "rock-and-pop",
            name: "Rock & Pop 95.9",
            pinType: "terrestrial",
            listeners: 62_000,
            currentSong: "Soda Stereo Medley",
            artist: "Soda Stereo",
            genre: "Rock en Español",
            city: "Buenos Aires",
            country: "Argentina",
            continent: "south-america",
            frequency: "95.9 FM",
          },
        ],
      },
    ],
  },
  {
    name: "Africa",
    slug: "africa",
    listeners: 1_680_000,
    stations: 5_200,
    color: "#eab308",
    position: [0.2, 0.1, 0.95],
    countries: [
      {
        name: "South Africa",
        slug: "za",
        stations: [
          {
            id: "5fm",
            name: "5FM",
            pinType: "terrestrial",
            listeners: 78_000,
            currentSong: "Jerusalema",
            artist: "Master KG",
            genre: "Afrobeats/Pop",
            city: "Johannesburg",
            country: "South Africa",
            continent: "africa",
            frequency: "90.4 FM",
          },
        ],
      },
      {
        name: "Nigeria",
        slug: "ng",
        stations: [
          {
            id: "cool-fm",
            name: "Cool FM 96.9",
            pinType: "terrestrial",
            listeners: 91_000,
            currentSong: "Essence",
            artist: "Wizkid ft. Tems",
            genre: "Afrobeats",
            city: "Lagos",
            country: "Nigeria",
            continent: "africa",
            frequency: "96.9 FM",
          },
        ],
      },
    ],
  },
  {
    name: "Oceania",
    slug: "oceania",
    listeners: 890_000,
    stations: 2_100,
    color: "#06b6d4",
    position: [0.8, -0.5, 0.35],
    countries: [
      {
        name: "Australia",
        slug: "au",
        stations: [
          {
            id: "triple-j",
            name: "triple j",
            pinType: "terrestrial",
            listeners: 115_000,
            currentSong: "Sweater Weather",
            artist: "The Neighbourhood",
            genre: "Alternative/Indie",
            city: "Sydney",
            country: "Australia",
            continent: "oceania",
            frequency: "105.7 FM",
          },
          {
            id: "abc-radio",
            name: "ABC Radio National",
            pinType: "terrestrial",
            listeners: 67_000,
            currentSong: "Background Briefing",
            artist: "ABC News",
            genre: "News/Documentary",
            city: "Sydney",
            country: "Australia",
            continent: "oceania",
          },
        ],
      },
    ],
  },
];

export const cityStations: Station[] = [
  {
    id: "wnyc",
    name: "WNYC 93.9 FM",
    pinType: "terrestrial",
    listeners: 128_000,
    currentSong: "Morning Edition",
    artist: "NPR",
    genre: "News/Talk",
    city: "New York",
    country: "United States",
    continent: "north-america",
    frequency: "93.9 FM",
  },
  {
    id: "nycr-internet",
    name: "NYC Internet Radio",
    pinType: "internet",
    listeners: 34_000,
    currentSong: "Electric Feel",
    artist: "MGMT",
    genre: "Indie/Electronic",
    city: "New York",
    country: "United States",
    continent: "north-america",
  },
  {
    id: "the-lot",
    name: "The Lot Radio",
    pinType: "creator",
    listeners: 12_500,
    currentSong: "Deep Cuts Mix",
    artist: "DJ Soup",
    genre: "Electronic/House",
    city: "New York",
    country: "United States",
    continent: "north-america",
  },
  {
    id: "wfan",
    name: "WFAN 660 AM",
    pinType: "talk",
    listeners: 89_000,
    currentSong: "Sports Talk Drive",
    artist: "Carton & Roberts",
    genre: "Sports Talk",
    city: "New York",
    country: "United States",
    continent: "north-america",
    frequency: "660 AM",
  },
  {
    id: "q104",
    name: "Q104.3",
    pinType: "terrestrial",
    listeners: 55_000,
    currentSong: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "Classic Rock",
    city: "New York",
    country: "United States",
    continent: "north-america",
    frequency: "104.3 FM",
  },
  {
    id: "nyc-podcast",
    name: "NYC Daily Podcast",
    pinType: "creator",
    listeners: 8_200,
    currentSong: "Episode 247: City Stories",
    artist: "Maria Chen",
    genre: "Podcast/Culture",
    city: "New York",
    country: "United States",
    continent: "north-america",
  },
  {
    id: "smooth-jazz-nyc",
    name: "Smooth Jazz NYC",
    pinType: "internet",
    listeners: 22_000,
    currentSong: "Round Midnight",
    artist: "Miles Davis",
    genre: "Jazz",
    city: "New York",
    country: "United States",
    continent: "north-america",
  },
  {
    id: "espn-radio",
    name: "ESPN Radio 98.7 FM",
    pinType: "talk",
    listeners: 71_000,
    currentSong: "First Take Radio",
    artist: "Stephen A. Smith",
    genre: "Sports",
    city: "New York",
    country: "United States",
    continent: "north-america",
    frequency: "98.7 FM",
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    user: "radiohead_fan",
    avatar: "🎵",
    message: "This song is incredible, been waiting all week for it!",
    timestamp: "2m ago",
  },
  {
    id: "2",
    user: "nightowl_99",
    avatar: "🦉",
    message: "Anyone know the name of that track they played before this?",
    timestamp: "3m ago",
  },
  {
    id: "3",
    user: "luna_waves",
    avatar: "🌙",
    message: "Classic. Never gets old. The bass line is everything.",
    timestamp: "5m ago",
  },
  {
    id: "4",
    user: "beatkeeper",
    avatar: "🥁",
    message: "Tuning in from Berlin! Great station 🔥",
    timestamp: "7m ago",
  },
  {
    id: "5",
    user: "radiohead_fan",
    avatar: "🎵",
    message: "@nightowl_99 it was 'Superstition' by Stevie Wonder",
    timestamp: "8m ago",
  },
];

export const mockRoomUsers: RoomUser[] = [
  { id: "1", name: "radiohead_fan", avatar: "🎵", online: true },
  { id: "2", name: "nightowl_99", avatar: "🦉", online: true },
  { id: "3", name: "luna_waves", avatar: "🌙", online: true },
  { id: "4", name: "beatkeeper", avatar: "🥁", online: false },
  { id: "5", name: "staticwave", avatar: "📻", online: true },
];

export const currentStation: Station = {
  id: "nts-radio",
  name: "NTS Radio",
  pinType: "internet",
  listeners: 87_420,
  currentSong: "The Watcher",
  artist: "Dean Martin",
  genre: "Eclectic",
  city: "London",
  country: "United Kingdom",
  continent: "europe",
};

export function formatListeners(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}
