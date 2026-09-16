import { Location, MenuItem } from "../types/models";

export const findLocationById = (
  locations: Location[],
  id: string
): Location | null => {
  return locations.find((location) => location.id === id) ?? null;
};

export const findMenuItemByName = (
  items: MenuItem[],
  name: string
): MenuItem | null => {
  const normalizedName = name.trim().toLowerCase();

  return items.find((item) => item.name.toLowerCase() === normalizedName) ?? null;
};

export const binarySearchLocationByCapacity = (
  sortedLocations: Location[],
  targetCapacity: number
): number => {
  let left = 0;
  let right = sortedLocations.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const currentCapacity = sortedLocations[middle]?.seatingCapacity;

    if (currentCapacity === targetCapacity) {
      return middle;
    }

    if (currentCapacity !== undefined && currentCapacity < targetCapacity) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
};