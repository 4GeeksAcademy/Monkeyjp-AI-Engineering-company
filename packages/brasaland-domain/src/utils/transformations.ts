import {
  CountryMetrics,
  Location,
  MenuItem,
  PaymentMethod,
  SaleTransaction,
  WasteReason,
  WasteRecord
} from "../types/models";

export const calculateDailyRevenue = (
  sales: SaleTransaction[],
  date: Date,
  currency: "USD" | "COP"
): number => {
  const revenue = sales
    .filter((sale) => {
      const saleDate = new Date(sale.timestamp);
      return (
        saleDate.getFullYear() === date.getFullYear() &&
        saleDate.getMonth() === date.getMonth() &&
        saleDate.getDate() === date.getDate()
      );
    })
    .reduce((total, sale) => {
      const saleAmount = currency === "USD" ? sale.totalPrice.USD : sale.totalPrice.COP;
      return total + saleAmount;
    }, 0);

  return Number(revenue.toFixed(2));
};

export const calculateLocationMargin = (
  sales: SaleTransaction[],
  menuItems: MenuItem[],
  locationId: string,
  currency: "USD" | "COP"
): number => {
  const locationSales = sales.filter((sale) => sale.locationId === locationId);

  const totalRevenue = locationSales.reduce((total, sale) => {
    const saleAmount = currency === "USD" ? sale.totalPrice.USD : sale.totalPrice.COP;
    return total + saleAmount;
  }, 0);

  if (totalRevenue === 0) {
    return 0;
  }

  const ingredientCost = locationSales.reduce((total, sale) => {
    const menuItem = menuItems.find((item) => item.id === sale.itemId);
    if (!menuItem) {
      return total;
    }

    const costPerUnit = currency === "USD" ? menuItem.ingredientCost.USD : menuItem.ingredientCost.COP;
    return total + costPerUnit * sale.quantity;
  }, 0);

  const margin = ((totalRevenue - ingredientCost) / totalRevenue) * 100;
  return Number(margin.toFixed(2));
};

export const calculateWasteCost = (
  wasteRecords: WasteRecord[],
  locationId: string,
  currency: "USD" | "COP"
): number => {
  const totalCost = wasteRecords
    .filter((record) => record.locationId === locationId)
    .reduce((total, record) => {
      const costAmount = currency === "USD" ? record.cost.USD : record.cost.COP;
      return total + costAmount;
    }, 0);

  return Number(totalCost.toFixed(2));
};

export const convertCurrency = (
  amount: number,
  fromCurrency: "USD" | "COP",
  toCurrency: "USD" | "COP"
): number => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const convertedAmount =
    fromCurrency === "USD"
      ? amount * 4000
      : amount / 4000;

  return Number(convertedAmount.toFixed(2));
};

export const scoreLocationPerformance = (
  location: Location,
  sales: SaleTransaction[],
  wasteRecords: WasteRecord[],
  menuItems: MenuItem[]
): number => {
  const locationSales = sales.filter((sale) => sale.locationId === location.id);

  const totalRevenue = locationSales.reduce((total, sale) => {
    const saleAmount = sale.totalPrice.USD;
    return total + saleAmount;
  }, 0);

  const openingDate = new Date(Date.UTC(location.openingYear, 0, 1));
  const currentDate = new Date();
  const operatingDays = Math.max(
    Math.floor((currentDate.getTime() - openingDate.getTime()) / (1000 * 60 * 60 * 24)),
    1
  );

  const dailyAverageRevenue = totalRevenue / operatingDays;
  const revenueScore = Math.min((dailyAverageRevenue / 1000) * 40, 40);

  const totalSalesCount = locationSales.length;
  const efficiencyScore = Math.min((totalSalesCount / location.seatingCapacity) * 30, 30);

  const totalWasteCost = wasteRecords
    .filter((record) => record.locationId === location.id)
    .reduce((total, record) => total + record.cost.USD, 0);

  const wastePercentage = totalRevenue === 0 ? 0 : (totalWasteCost / totalRevenue) * 100;
  const wasteScore = Math.max(20 - wastePercentage * 2, 0);

  const marginScore = Math.min(calculateLocationMargin(sales, menuItems, location.id, "USD") / 10, 10);

  const totalScore = revenueScore + efficiencyScore + wasteScore + marginScore;
  return Number(Math.min(totalScore, 100).toFixed(2));
};

export const rankLocationsByPerformance = (
  locations: Location[],
  sales: SaleTransaction[],
  wasteRecords: WasteRecord[],
  menuItems: MenuItem[]
): Array<{ location: Location; score: number }> => {
  return locations
    .map((location) => ({
      location,
      score: scoreLocationPerformance(location, sales, wasteRecords, menuItems)
    }))
    .sort((a, b) => b.score - a.score);
};

export const countSalesByPaymentMethod = (
  sales: SaleTransaction[]
): Record<PaymentMethod, number> => {
  const counts: Record<PaymentMethod, number> = {
    Cash: 0,
    "Credit card": 0,
    "Debit card": 0,
    "Digital wallet": 0
  };

  sales.forEach((sale) => {
    counts[sale.paymentMethod] += 1;
  });

  return counts;
};

export const calculateAverageTicket = (
  sales: SaleTransaction[],
  currency: "USD" | "COP"
): number => {
  if (sales.length === 0) {
    return 0;
  }

  const totalRevenue = sales.reduce((total, sale) => {
    const saleAmount = currency === "USD" ? sale.totalPrice.USD : sale.totalPrice.COP;
    return total + saleAmount;
  }, 0);

  return Number((totalRevenue / sales.length).toFixed(2));
};

export const findTopSellingItems = (
  sales: SaleTransaction[],
  menuItems: MenuItem[],
  topN: number
): Array<{ item: MenuItem; totalSold: number }> => {
  const totalByItem = sales.reduce<Record<string, number>>((acc, sale) => {
    acc[sale.itemId] = (acc[sale.itemId] ?? 0) + sale.quantity;
    return acc;
  }, {});

  return menuItems
    .map((item) => ({
      item,
      totalSold: totalByItem[item.id] ?? 0
    }))
    .filter(({ totalSold }) => totalSold > 0)
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, topN);
};

export const groupWasteByReason = (
  wasteRecords: WasteRecord[]
): Record<WasteReason, WasteRecord[]> => {
  const groups: Record<WasteReason, WasteRecord[]> = {
    Expired: [],
    "Cooking error": [],
    "Customer return": [],
    Damage: [],
    Other: []
  };

  wasteRecords.forEach((record) => {
    groups[record.reason].push(record);
  });

  return groups;
};

export const calculateCountryComparison = (
  sales: SaleTransaction[],
  locations: Location[],
  menuItems: MenuItem[]
): { Colombia: CountryMetrics; USA: CountryMetrics } => {
  const countryMetrics: { Colombia: CountryMetrics; USA: CountryMetrics } = {
    Colombia: {
      totalLocations: 0,
      totalRevenue: { USD: 0, COP: 0 },
      averageRevenuePerLocation: { USD: 0, COP: 0 },
      totalSales: 0
    },
    USA: {
      totalLocations: 0,
      totalRevenue: { USD: 0, COP: 0 },
      averageRevenuePerLocation: { USD: 0, COP: 0 },
      totalSales: 0
    }
  };

  const countryLocations: Record<"Colombia" | "USA", Location[]> = {
    Colombia: locations.filter((location) => location.country === "Colombia"),
    USA: locations.filter((location) => location.country === "USA")
  };

  for (const country of ["Colombia", "USA"] as const) {
    const countryLocationList = countryLocations[country];
    const countrySales = sales.filter((sale) => {
      const location = countryLocationList.find((item) => item.id === sale.locationId);
      return Boolean(location);
    });

    const totalRevenue = countrySales.reduce(
      (acc, sale) => {
        acc.USD += sale.totalPrice.USD;
        acc.COP += sale.totalPrice.COP;
        return acc;
      },
      { USD: 0, COP: 0 }
    );

    const totalLocations = countryLocationList.length;
    const averageRevenuePerLocation = totalLocations === 0
      ? { USD: 0, COP: 0 }
      : {
          USD: Number((totalRevenue.USD / totalLocations).toFixed(2)),
          COP: Number((totalRevenue.COP / totalLocations).toFixed(2))
        };

    countryMetrics[country] = {
      totalLocations,
      totalRevenue,
      averageRevenuePerLocation,
      totalSales: countrySales.length
    };
  }

  return countryMetrics;
};
