import {
    Location,
    MenuCategory,
    MenuItem,
    SaleTransaction
} from "../types/operations";

export const filterSalesByLocation = (
    sales: SaleTransaction[],
    locationId: string
): SaleTransaction[] => {
    return sales.filter((sale) => sale.locationId === locationId);
};

export const filterSalesByDateRange = (
    sales: SaleTransaction[],
    startDate: Date,
    endDate: Date
): SaleTransaction[] => {
    return sales.filter(
        (sale) => sale.timestamp >= startDate && sale.timestamp <= endDate
    );
};

export const filterMenuItemsByCategory = (
    items: MenuItem[],
    category: MenuCategory
): MenuItem[] => {
    return items.filter((item) => item.category === category);
};

export const filterActiveLocations = (
    locations: Location[]
): Location[] => {
    return locations.filter((location) => location.status === "Active");
};

export const sortLocationsByCapacity = (
    locations: Location[],
    order: "asc" | "desc"
): Location[] => {
    return [...locations].sort((a, b) => {
        const comparison = a.seatingCapacity - b.seatingCapacity;

        return order === "asc" ? comparison : -comparison;
    });
};

export const sortMenuItemsByPrice = (
    items: MenuItem[],
    currency: "USD" | "COP",
    order: "asc" | "desc"
): MenuItem[] => {
    return [...items].sort((a, b) => {
        const aPrice = currency === "USD" ? a.basePrice.USD : a.basePrice.COP;
        const bPrice = currency === "USD" ? b.basePrice.USD : b.basePrice.COP;
        const comparison = aPrice - bPrice;

        return order === "asc" ? comparison : -comparison;
    });
};
