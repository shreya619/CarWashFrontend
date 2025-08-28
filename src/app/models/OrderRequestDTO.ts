export interface OrderRequestDTO {
  packageType: string;
  addOns: string;
  address: string;
  dateTime: string; // ISO string
  washerName: string;
  washerEmail: string;
  washerId: number;
}
