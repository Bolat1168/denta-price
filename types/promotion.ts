export interface Promotion {
  id?: string;
  dentistId: string;
  serviceId: string;
  segment: string;
  radius: number; // 1, 3, 6, 0 для city
  price: number;
  paidAt: Date;   // или Timestamp, но на клиенте удобнее Date
  activeUntil: Date;
  isActive: boolean;
  createdAt: Date;
}
