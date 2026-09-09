export interface Wallet {
  balance: number;
  incomeThisMonth: number;
  expensesThisMonth: number;
  savings: number;
}

export const WALLET: Wallet = {
  balance: 124850,
  incomeThisMonth: 58000,
  expensesThisMonth: 31780,
  savings: 26220,
};

export type CategoryId = "food" | "shopping" | "transport" | "bills" | "entertainment" | "education" | "health";

export interface CategoryBudget {
  id: CategoryId;
  label: string;
  budget: number;
  spent: number;
}

export const CATEGORY_BUDGETS: CategoryBudget[] = [
  { id: "food", label: "Food", budget: 9000, spent: 7420 },
  { id: "shopping", label: "Shopping", budget: 6000, spent: 6850 },
  { id: "transport", label: "Transport", budget: 3500, spent: 2980 },
  { id: "bills", label: "Bills", budget: 7500, spent: 7200 },
  { id: "entertainment", label: "Entertainment", budget: 2500, spent: 2340 },
  { id: "education", label: "Education", budget: 3000, spent: 1890 },
  { id: "health", label: "Health", budget: 2500, spent: 2100 },
];

export type PaymentMethod = "UPI" | "Credit Card" | "Debit Card" | "Net Banking" | "Wallet";
export type TransactionStatus = "completed" | "pending" | "failed";
export type TransactionKind = "debit" | "credit";

export interface Transaction {
  id: string;
  merchant: string;
  category: CategoryId | "income" | "transfer";
  amount: number;
  kind: TransactionKind;
  date: string;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
}

export const TRANSACTIONS: Transaction[] = [
  { id: "t1", merchant: "Acme Corp Payroll", category: "income", amount: 58000, kind: "credit", date: "2026-09-01T09:00:00", paymentMethod: "Net Banking", status: "completed" },
  { id: "t2", merchant: "Swiggy", category: "food", amount: 486, kind: "debit", date: "2026-09-09T13:20:00", paymentMethod: "UPI", status: "completed" },
  { id: "t3", merchant: "Uber", category: "transport", amount: 210, kind: "debit", date: "2026-09-09T08:45:00", paymentMethod: "UPI", status: "completed" },
  { id: "t4", merchant: "Blinkit", category: "food", amount: 892, kind: "debit", date: "2026-09-08T19:10:00", paymentMethod: "UPI", status: "completed" },
  { id: "t5", merchant: "Zomato", category: "food", amount: 356, kind: "debit", date: "2026-09-08T21:05:00", paymentMethod: "Credit Card", status: "completed" },
  { id: "t6", merchant: "Amazon", category: "shopping", amount: 2340, kind: "debit", date: "2026-09-08T11:30:00", paymentMethod: "Credit Card", status: "completed" },
  { id: "t7", merchant: "Starbucks", category: "food", amount: 640, kind: "debit", date: "2026-09-07T17:15:00", paymentMethod: "Debit Card", status: "completed" },
  { id: "t8", merchant: "Ola", category: "transport", amount: 175, kind: "debit", date: "2026-09-07T09:00:00", paymentMethod: "UPI", status: "completed" },
  { id: "t9", merchant: "BookMyShow", category: "entertainment", amount: 900, kind: "debit", date: "2026-09-07T20:00:00", paymentMethod: "UPI", status: "completed" },
  { id: "t10", merchant: "Myntra", category: "shopping", amount: 1799, kind: "debit", date: "2026-09-06T15:40:00", paymentMethod: "Credit Card", status: "completed" },
  { id: "t11", merchant: "Airtel", category: "bills", amount: 799, kind: "debit", date: "2026-09-06T10:00:00", paymentMethod: "UPI", status: "completed" },
  { id: "t12", merchant: "Apollo Pharmacy", category: "health", amount: 540, kind: "debit", date: "2026-09-06T18:20:00", paymentMethod: "UPI", status: "completed" },
  { id: "t13", merchant: "IRCTC", category: "transport", amount: 1240, kind: "debit", date: "2026-09-05T07:30:00", paymentMethod: "Net Banking", status: "completed" },
  { id: "t14", merchant: "Netflix", category: "entertainment", amount: 649, kind: "debit", date: "2026-09-05T00:05:00", paymentMethod: "Credit Card", status: "completed" },
  { id: "t15", merchant: "Flipkart", category: "shopping", amount: 3499, kind: "debit", date: "2026-09-05T14:10:00", paymentMethod: "Credit Card", status: "pending" },
  { id: "t16", merchant: "Tata Power", category: "bills", amount: 2180, kind: "debit", date: "2026-09-04T09:00:00", paymentMethod: "Net Banking", status: "completed" },
  { id: "t17", merchant: "Spotify", category: "entertainment", amount: 149, kind: "debit", date: "2026-09-04T00:05:00", paymentMethod: "UPI", status: "completed" },
  { id: "t18", merchant: "Udemy", category: "education", amount: 449, kind: "debit", date: "2026-09-04T19:45:00", paymentMethod: "Credit Card", status: "completed" },
  { id: "t19", merchant: "Cult.fit", category: "health", amount: 1499, kind: "debit", date: "2026-09-03T06:30:00", paymentMethod: "UPI", status: "completed" },
  { id: "t20", merchant: "Swiggy", category: "food", amount: 312, kind: "debit", date: "2026-09-03T13:00:00", paymentMethod: "UPI", status: "completed" },
  { id: "t21", merchant: "ACT Fibernet", category: "bills", amount: 999, kind: "debit", date: "2026-09-03T10:00:00", paymentMethod: "Net Banking", status: "completed" },
  { id: "t22", merchant: "Rapido", category: "transport", amount: 95, kind: "debit", date: "2026-09-02T08:15:00", paymentMethod: "UPI", status: "completed" },
  { id: "t23", merchant: "Coursera", category: "education", amount: 1250, kind: "debit", date: "2026-09-02T16:00:00", paymentMethod: "Credit Card", status: "completed" },
  { id: "t24", merchant: "PharmEasy", category: "health", amount: 380, kind: "debit", date: "2026-09-02T12:20:00", paymentMethod: "UPI", status: "completed" },
  { id: "t25", merchant: "Amazon", category: "shopping", amount: 1212, kind: "debit", date: "2026-09-01T20:30:00", paymentMethod: "Credit Card", status: "completed" },
  { id: "t26", merchant: "Jio", category: "bills", amount: 719, kind: "debit", date: "2026-09-01T11:00:00", paymentMethod: "UPI", status: "completed" },
  { id: "t27", merchant: "Zomato", category: "food", amount: 428, kind: "debit", date: "2026-09-01T21:15:00", paymentMethod: "Wallet", status: "completed" },
  { id: "t28", merchant: "Freelance Invoice", category: "income", amount: 8400, kind: "credit", date: "2026-08-29T10:00:00", paymentMethod: "Net Banking", status: "completed" },
  { id: "t29", merchant: "Ola", category: "transport", amount: 260, kind: "debit", date: "2026-08-31T18:40:00", paymentMethod: "UPI", status: "failed" },
  { id: "t30", merchant: "Savings Transfer", category: "transfer", amount: 5000, kind: "debit", date: "2026-08-30T09:00:00", paymentMethod: "Net Banking", status: "completed" },
];

export type SubscriptionCategory = "entertainment" | "productivity" | "wellness" | "cloud" | "news";
export type SubscriptionCycle = "monthly" | "yearly";
export type SubscriptionStatus = "active" | "expired";

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  monthlyCost: number;
  yearlyCost: number;
  cycle: SubscriptionCycle;
  renewsOn: string;
  status: SubscriptionStatus;
}

export const SUBSCRIPTIONS: Subscription[] = [
  { id: "s1", name: "Netflix", category: "entertainment", monthlyCost: 649, yearlyCost: 7188, cycle: "monthly", renewsOn: "2026-09-18", status: "active" },
  { id: "s2", name: "Spotify", category: "entertainment", monthlyCost: 149, yearlyCost: 1428, cycle: "yearly", renewsOn: "2026-09-13", status: "active" },
  { id: "s3", name: "iCloud+", category: "cloud", monthlyCost: 219, yearlyCost: 2388, cycle: "monthly", renewsOn: "2026-09-24", status: "active" },
  { id: "s4", name: "Notion Plus", category: "productivity", monthlyCost: 800, yearlyCost: 8000, cycle: "yearly", renewsOn: "2027-01-10", status: "active" },
  { id: "s5", name: "Cult.fit Elite", category: "wellness", monthlyCost: 1499, yearlyCost: 14999, cycle: "monthly", renewsOn: "2026-10-01", status: "active" },
  { id: "s6", name: "The Ken", category: "news", monthlyCost: 350, yearlyCost: 3999, cycle: "monthly", renewsOn: "2026-08-20", status: "expired" },
  { id: "s7", name: "Amazon Prime", category: "entertainment", monthlyCost: 0, yearlyCost: 1499, cycle: "yearly", renewsOn: "2027-03-05", status: "active" },
];

export interface SavingsGoal {
  id: string;
  label: string;
  emoji: string;
  target: number;
  saved: number;
  deadline: string;
}

export const SAVINGS_GOALS: SavingsGoal[] = [
  { id: "g1", label: "MacBook Pro Fund", emoji: "\u{1F4BB}", target: 180000, saved: 129600, deadline: "2026-12-01" },
  { id: "g2", label: "Japan Trip", emoji: "\u{1F5FE}", target: 220000, saved: 96000, deadline: "2027-03-15" },
  { id: "g3", label: "Camera Lens", emoji: "\u{1F4F7}", target: 65000, saved: 52000, deadline: "2026-10-20" },
  { id: "g4", label: "Emergency Fund", emoji: "\u{1F6DF}", target: 300000, saved: 187500, deadline: "2027-06-01" },
];

export const AI_FINANCE_INSIGHTS: string[] = [
  "Food spending increased 18% compared to last week.",
  "Spotify yearly subscription renews in 4 days.",
  "You are 72% toward your MacBook savings goal.",
  "Shopping crossed its monthly budget by ₹850.",
  "Your savings rate this month is 45% — above your 3-month average.",
];

// Last 6 months, income vs expenses (₹) — feeds MonthlyComparisonChart on Analytics.
export const MONTHLY_COMPARISON = [
  { month: "Apr", income: 54000, expenses: 29200 },
  { month: "May", income: 54000, expenses: 33650 },
  { month: "Jun", income: 56000, expenses: 28900 },
  { month: "Jul", income: 56000, expenses: 35120 },
  { month: "Aug", income: 58000, expenses: 30460 },
  { month: "Sep", income: 58000, expenses: 31780 },
];

// Weekly totals per category over the last 8 weeks — feeds the Analytics
// Category Trend multi-line chart.
export const CATEGORY_TREND = [
  { week: "Wk 1", food: 1650, transport: 620, shopping: 980 },
  { week: "Wk 2", food: 1820, transport: 540, shopping: 2100 },
  { week: "Wk 3", food: 1540, transport: 710, shopping: 1450 },
  { week: "Wk 4", food: 1980, transport: 480, shopping: 3200 },
  { week: "Wk 5", food: 1720, transport: 650, shopping: 1100 },
  { week: "Wk 6", food: 2050, transport: 590, shopping: 1890 },
  { week: "Wk 7", food: 1890, transport: 720, shopping: 2450 },
  { week: "Wk 8", food: 2120, transport: 560, shopping: 3499 },
];
