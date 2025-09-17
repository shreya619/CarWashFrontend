// src/app/models/order.model.ts
export interface Order {
  orderId?: number;
  customerName?: string;
  customerEmail?: string;
  phoneNo?: string;
  packageType: string;
  addOns?: string;
  address: string;
  dateTime: string; // send as "YYYY-MM-DDTHH:mm:ss" (no timezone) or ISO depending on backend
  status?: string;
  washerName?: string;
  washerEmail?: string;
  washerId?: number;
}
