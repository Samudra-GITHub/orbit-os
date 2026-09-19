import type { WeatherCondition } from "@/lib/skycast/types";

export type TripStatus = "upcoming" | "active" | "completed";

export interface TripWeatherSummary {
  condition: WeatherCondition;
  tempMinC: number;
  tempMaxC: number;
}

export interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  budget: number;
  weatherSummary: TripWeatherSummary;
  coverHues: [string, string, string];
  status: TripStatus;
}

export const TRIPS: Trip[] = [
  {
    id: "goa-weekend",
    destination: "Goa",
    country: "India",
    startDate: "2026-09-19",
    endDate: "2026-09-21",
    budget: 25000,
    weatherSummary: { condition: "Clouds", tempMinC: 26, tempMaxC: 32 },
    coverHues: ["#f59e0b", "#f43f5e", "#2dd4bf"],
    status: "upcoming",
  },
  {
    id: "darjeeling-escape",
    destination: "Darjeeling",
    country: "India",
    startDate: "2026-10-10",
    endDate: "2026-10-14",
    budget: 45000,
    weatherSummary: { condition: "Mist", tempMinC: 12, tempMaxC: 19 },
    coverHues: ["#166534", "#0e7490", "#a3a3a3"],
    status: "upcoming",
  },
  {
    id: "japan-winter",
    destination: "Tokyo",
    country: "Japan",
    startDate: "2026-12-18",
    endDate: "2026-12-28",
    budget: 220000,
    weatherSummary: { condition: "Snow", tempMinC: -2, tempMaxC: 6 },
    coverHues: ["#ec4899", "#6366f1", "#38bdf8"],
    status: "upcoming",
  },
];

export type PlaceCategory = "restaurant" | "attraction" | "hotel" | "cafe" | "shopping";

export interface Place {
  id: string;
  tripId: string;
  name: string;
  category: PlaceCategory;
  rating: number;
  priceLevel: 1 | 2 | 3 | 4;
  note: string;
  favorite: boolean;
}

export const PLACES: Place[] = [
  { id: "p1", tripId: "goa-weekend", name: "Curlies Beach Shack", category: "restaurant", rating: 4.4, priceLevel: 2, note: "Sunset seafood right on Anjuna beach.", favorite: true },
  { id: "p2", tripId: "goa-weekend", name: "Fort Aguada", category: "attraction", rating: 4.5, priceLevel: 1, note: "17th-century Portuguese fort with lighthouse views.", favorite: false },
  { id: "p3", tripId: "goa-weekend", name: "Taj Fort Aguada Resort", category: "hotel", rating: 4.6, priceLevel: 4, note: "Beachfront stay, booked for both nights.", favorite: true },
  { id: "p4", tripId: "goa-weekend", name: "Artjuna Cafe", category: "cafe", rating: 4.3, priceLevel: 2, note: "Good wifi, great smoothie bowls.", favorite: false },
  { id: "p5", tripId: "goa-weekend", name: "Anjuna Flea Market", category: "shopping", rating: 4.1, priceLevel: 2, note: "Wednesdays only — textiles and jewelry.", favorite: false },
  { id: "p6", tripId: "darjeeling-escape", name: "Glenary's Bakery", category: "cafe", rating: 4.5, priceLevel: 2, note: "Legendary bakery with mountain views.", favorite: true },
  { id: "p7", tripId: "darjeeling-escape", name: "Tiger Hill", category: "attraction", rating: 4.6, priceLevel: 1, note: "Sunrise view of Kanchenjunga — arrive by 4:30 AM.", favorite: true },
  { id: "p8", tripId: "darjeeling-escape", name: "Windamere Hotel", category: "hotel", rating: 4.4, priceLevel: 3, note: "Colonial-era heritage property.", favorite: false },
  { id: "p9", tripId: "darjeeling-escape", name: "Kunga Restaurant", category: "restaurant", rating: 4.3, priceLevel: 2, note: "Best momos in town, always a queue.", favorite: false },
  { id: "p10", tripId: "japan-winter", name: "Ichiran Ramen Shibuya", category: "restaurant", rating: 4.5, priceLevel: 2, note: "Solo booth ramen, open late.", favorite: true },
  { id: "p11", tripId: "japan-winter", name: "Senso-ji Temple", category: "attraction", rating: 4.7, priceLevel: 1, note: "Asakusa's iconic temple, go early to avoid crowds.", favorite: true },
  { id: "p12", tripId: "japan-winter", name: "Park Hyatt Tokyo", category: "hotel", rating: 4.8, priceLevel: 4, note: "Lost in Translation hotel — splurge night.", favorite: false },
  { id: "p13", tripId: "japan-winter", name: "% Arabica Kyoto", category: "cafe", rating: 4.6, priceLevel: 2, note: "Riverside coffee, iconic minimalist branch.", favorite: true },
  { id: "p14", tripId: "japan-winter", name: "Don Quijote Shibuya", category: "shopping", rating: 4.2, priceLevel: 2, note: "24-hour discount everything, tax-free counter upstairs.", favorite: false },
  { id: "p15", tripId: "japan-winter", name: "Fushimi Inari Shrine", category: "attraction", rating: 4.7, priceLevel: 1, note: "Thousands of torii gates, best at dawn.", favorite: false },
];

export interface PackingItem {
  id: string;
  label: string;
  packed: boolean;
}

export interface PackingCategory {
  id: string;
  label: string;
  items: PackingItem[];
}

export const PACKING_CATEGORIES: PackingCategory[] = [
  {
    id: "clothing",
    label: "Clothing",
    items: [
      { id: "c1", label: "Thermal base layers", packed: true },
      { id: "c2", label: "Insulated winter jacket", packed: true },
      { id: "c3", label: "Wool sweaters (x3)", packed: false },
      { id: "c4", label: "Waterproof boots", packed: true },
      { id: "c5", label: "Gloves and beanie", packed: false },
      { id: "c6", label: "Thick socks (x5)", packed: false },
      { id: "c7", label: "Scarf", packed: false },
    ],
  },
  {
    id: "electronics",
    label: "Electronics",
    items: [
      { id: "e1", label: "Phone charger", packed: true },
      { id: "e2", label: "Power bank", packed: true },
      { id: "e3", label: "Japan travel adapter", packed: false },
      { id: "e4", label: "Camera + spare battery", packed: false },
      { id: "e5", label: "Noise-cancelling headphones", packed: true },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    items: [
      { id: "d1", label: "Passport", packed: true },
      { id: "d2", label: "Visa printout", packed: true },
      { id: "d3", label: "Travel insurance copy", packed: false },
      { id: "d4", label: "Hotel booking confirmations", packed: true },
      { id: "d5", label: "JR Rail pass voucher", packed: false },
    ],
  },
  {
    id: "toiletries",
    label: "Toiletries",
    items: [
      { id: "t1", label: "Toothbrush + toothpaste", packed: false },
      { id: "t2", label: "Moisturizer (cold weather)", packed: false },
      { id: "t3", label: "Lip balm", packed: false },
      { id: "t4", label: "Travel-size shampoo", packed: false },
      { id: "t5", label: "Sunscreen", packed: false },
    ],
  },
  {
    id: "essentials",
    label: "Essentials",
    items: [
      { id: "m1", label: "Daypack", packed: true },
      { id: "m2", label: "Reusable water bottle", packed: false },
      { id: "m3", label: "Medication kit", packed: true },
      { id: "m4", label: "Umbrella", packed: false },
      { id: "m5", label: "Snacks for the flight", packed: false },
    ],
  },
];

export type ExpenseCategory = "flights" | "hotels" | "food" | "shopping" | "transport" | "activities";

export interface TripExpense {
  id: string;
  tripId: string;
  category: ExpenseCategory;
  label: string;
  amount: number;
  date: string;
}

export const TRIP_EXPENSES: TripExpense[] = [
  { id: "x1", tripId: "goa-weekend", category: "flights", label: "IndiGo round trip", amount: 8400, date: "2026-08-20" },
  { id: "x2", tripId: "goa-weekend", category: "hotels", label: "Taj Fort Aguada (2N)", amount: 9200, date: "2026-08-20" },
  { id: "x3", tripId: "goa-weekend", category: "food", label: "Curlies Beach Shack", amount: 1450, date: "2026-09-05" },
  { id: "x4", tripId: "goa-weekend", category: "transport", label: "Airport cab + scooter rental", amount: 1600, date: "2026-09-05" },
  { id: "x5", tripId: "goa-weekend", category: "activities", label: "Fort Aguada entry + boat cruise", amount: 900, date: "2026-09-06" },
  { id: "x6", tripId: "goa-weekend", category: "shopping", label: "Anjuna Flea Market", amount: 1200, date: "2026-09-06" },
  { id: "x7", tripId: "darjeeling-escape", category: "flights", label: "IndiGo to Bagdogra", amount: 12600, date: "2026-09-01" },
  { id: "x8", tripId: "darjeeling-escape", category: "hotels", label: "Windamere Hotel (4N)", amount: 16800, date: "2026-09-01" },
  { id: "x9", tripId: "darjeeling-escape", category: "transport", label: "Shared jeep to Darjeeling", amount: 1800, date: "2026-09-01" },
  { id: "x10", tripId: "darjeeling-escape", category: "activities", label: "Tiger Hill sunrise tour", amount: 700, date: "2026-09-02" },
  { id: "x11", tripId: "japan-winter", category: "flights", label: "ANA round trip to Tokyo", amount: 78000, date: "2026-08-10" },
  { id: "x12", tripId: "japan-winter", category: "hotels", label: "Park Hyatt Tokyo (2N)", amount: 54000, date: "2026-08-10" },
  { id: "x13", tripId: "japan-winter", category: "hotels", label: "Kyoto ryokan (3N)", amount: 28500, date: "2026-08-10" },
  { id: "x14", tripId: "japan-winter", category: "transport", label: "JR Rail Pass (7-day)", amount: 22000, date: "2026-08-15" },
  { id: "x15", tripId: "japan-winter", category: "food", label: "Ichiran + izakaya budget", amount: 9500, date: "2026-08-20" },
  { id: "x16", tripId: "japan-winter", category: "shopping", label: "Don Quijote + souvenirs", amount: 6000, date: "2026-08-20" },
  { id: "x17", tripId: "japan-winter", category: "activities", label: "TeamLab + temple entries", amount: 4200, date: "2026-08-22" },
];

export type ItinerarySlot = "morning" | "afternoon" | "evening";

export interface ItineraryActivity {
  id: string;
  slot: ItinerarySlot;
  title: string;
  description: string;
  completed: boolean;
}

export interface ItineraryDay {
  id: string;
  tripId: string;
  date: string;
  label: string;
  activities: ItineraryActivity[];
}

export const ITINERARY: ItineraryDay[] = [
  {
    id: "goa-d1",
    tripId: "goa-weekend",
    date: "2026-09-19",
    label: "Day 1",
    activities: [
      { id: "goa-d1-m", slot: "morning", title: "Arrive at Dabolim Airport", description: "Land 10:40 AM, cab to Anjuna.", completed: false },
      { id: "goa-d1-a", slot: "afternoon", title: "Check in at Taj Fort Aguada", description: "Pool time, settle in.", completed: false },
      { id: "goa-d1-e", slot: "evening", title: "Sunset at Curlies Beach Shack", description: "Dinner reservation at 7:30 PM.", completed: false },
    ],
  },
  {
    id: "goa-d2",
    tripId: "goa-weekend",
    date: "2026-09-20",
    label: "Day 2",
    activities: [
      { id: "goa-d2-m", slot: "morning", title: "Fort Aguada + lighthouse", description: "Photos before the midday heat.", completed: false },
      { id: "goa-d2-a", slot: "afternoon", title: "Scooter ride to Anjuna Flea Market", description: "Bring cash, bargain hard.", completed: false },
      { id: "goa-d2-e", slot: "evening", title: "Boat cruise on the Mandovi", description: "Sunset cruise, 6 PM departure.", completed: false },
    ],
  },
  {
    id: "goa-d3",
    tripId: "goa-weekend",
    date: "2026-09-21",
    label: "Day 3",
    activities: [
      { id: "goa-d3-m", slot: "morning", title: "Breakfast at Artjuna Cafe", description: "Last smoothie bowl before check-out.", completed: false },
      { id: "goa-d3-a", slot: "afternoon", title: "Check out + airport transfer", description: "Flight departs 4:15 PM.", completed: false },
    ],
  },
];

export interface TravelInsight {
  text: string;
}

export const TRAVEL_INSIGHTS: TravelInsight[] = [
  { text: "Rain expected tomorrow in Goa — pack a light raincoat." },
  { text: "You're ₹3,250 under budget for the Goa trip." },
  { text: "Pack a jacket for Kyoto — nights drop to -2°C in December." },
  { text: "Flight check-in for your Japan trip opens in 24 hours." },
  { text: "You've packed 48% for your Japan Winter Trip — 14 items left." },
];
