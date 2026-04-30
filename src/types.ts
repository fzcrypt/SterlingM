/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SeasonStatus = 'In Stock' | 'Season Opening' | 'Pre-Order' | 'Sold Out';

export interface MangoVariety {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  pricePerKg: number;
  seasonStatus: SeasonStatus;
  harvestDate: string;
  purityScore: number;
  certification: string[];
  images: string[];
  availableWeights: number[]; // in kg
}

export interface GiftOptions {
  isGift: boolean;
  message: string;
  recipientName: string;
}

export interface CartItem {
  variety: MangoVariety;
  quantity: number;
  selectedWeight: number;
  giftOptions?: GiftOptions;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
  createdAt: string;
}

export type FarmLogCategory = 'Pruning' | 'Soil' | 'Harvest' | 'Inspection' | 'Organic' | 'Irrigation';

export interface FarmLog {
  id: string;
  date: string;
  activity: string;
  description: string;
  image: string;
  category: FarmLogCategory;
}
