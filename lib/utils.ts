import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('da-DK', {style: 'currency', currency: 'DKK'});
export const digiFormatter = new Intl.NumberFormat("da-DK",{minimumFractionDigits: 2} );