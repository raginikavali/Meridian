// 12 months of analytics data — shows a strong Q1/Q2, summer dip in Aug, recovery in Sept
export const monthlyRevenue = [
  { month: 'Oct', revenue: 284000, orders: 612, customers: 89, conversion: 3.2 },
  { month: 'Nov', revenue: 341000, orders: 734, customers: 108, conversion: 3.4 },
  { month: 'Dec', revenue: 512000, orders: 1102, customers: 167, conversion: 3.9 },
  { month: 'Jan', revenue: 298000, orders: 641, customers: 92, conversion: 3.1 },
  { month: 'Feb', revenue: 327000, orders: 702, customers: 105, conversion: 3.3 },
  { month: 'Mar', revenue: 389000, orders: 837, customers: 128, conversion: 3.6 },
  { month: 'Apr', revenue: 412000, orders: 889, customers: 145, conversion: 3.7 },
  { month: 'May', revenue: 467000, orders: 1008, customers: 162, conversion: 3.9 },
  { month: 'Jun', revenue: 498000, orders: 1074, customers: 178, conversion: 4.1 },
  { month: 'Jul', revenue: 445000, orders: 959, customers: 154, conversion: 3.8 },
  { month: 'Aug', revenue: 389000, orders: 838, customers: 121, conversion: 3.3 }, // summer dip, flagged red
  { month: 'Sep', revenue: 521000, orders: 1122, customers: 196, conversion: 4.4 }, // recovery
]

export const topProducts = [
  { name: 'Meridian Atom X', revenue: 901290, units: 3621 },
  { name: 'Meridian Atom SE', revenue: 611198, units: 4102 },
  { name: 'Meridian Arc Pro', revenue: 556560, units: 1240 },
  { name: 'Meridian Arc Lite', revenue: 508539, units: 2841 },
  { name: 'Meridian Halo Mini', revenue: 465879, units: 2341 },
]

export const categoryRevenue = [
  { name: 'Earbuds', value: 38 },
  { name: 'Headphones', value: 28 },
  { name: 'Speakers', value: 18 },
  { name: 'Soundbars', value: 10 },
  { name: 'Accessories', value: 6 },
]

export const weeklyOrders = [
  { day: 'Mon', orders: 142 },
  { day: 'Tue', orders: 168 },
  { day: 'Wed', orders: 179 },
  { day: 'Thu', orders: 156 },
  { day: 'Fri', orders: 201 },
  { day: 'Sat', orders: 234 },
  { day: 'Sun', orders: 189 },
]

export const recentActivity = [
  { id: 1, type: 'order', message: 'New order ORD-8817 placed for $1,298', time: '2024-09-17T06:45:00Z', icon: 'shopping-bag' },
  { id: 2, type: 'user', message: 'Aria Chen completed profile verification', time: '2024-09-17T09:23:00Z', icon: 'user-check' },
  { id: 3, type: 'order', message: 'ORD-8819 moved to processing', time: '2024-09-16T08:00:00Z', icon: 'package' },
  { id: 4, type: 'product', message: 'Meridian Arc Junior stock low (234 remaining)', time: '2024-09-16T10:00:00Z', icon: 'alert-triangle' },
  { id: 5, type: 'order', message: 'ORD-8820 shipped to Austin, TX', time: '2024-09-15T11:30:00Z', icon: 'truck' },
  { id: 6, type: 'user', message: 'Priya Sharma joined as Manager', time: '2024-09-15T14:00:00Z', icon: 'user-plus' },
  { id: 7, type: 'product', message: 'Meridian GamePro X is out of stock', time: '2024-09-14T09:00:00Z', icon: 'alert-circle' },
  { id: 8, type: 'order', message: 'ORD-8802 was cancelled and refunded', time: '2024-09-09T16:00:00Z', icon: 'x-circle' },
]

// KPI snapshot
export const kpiSnapshot = {
  revenue: { value: 521000, change: 34.0, trend: 'up' },     // Sep vs Aug
  activeUsers: { value: 2481, change: 12.4, trend: 'up' },
  orders: { value: 1122, change: 33.9, trend: 'up' },
  growth: { value: 34.0, change: 0.6, trend: 'up' },
}
