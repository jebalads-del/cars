export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: string;
  fuelType: string;
  engineSize: string;
  horsepower: number;
  features: string[];
  image: string;
  images: string[];
  description: string;
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
