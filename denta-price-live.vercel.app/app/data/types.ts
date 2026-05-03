export interface Service {
  id: string;
  nameKZ: string;
  nameRU: string;
  category: string;
}

export interface Doctor {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string;
  experienceYears: number;
  phone: string;
  servicesIds: string[];
  price: number;
  segment: string;
  radius: string;
  isPaid?: boolean;
  paymentDate?: string;
}

export interface Segment {
  id: string;
  nameKz: string;
  nameRu: string;
  color: string;
}

export type Radius = string;
