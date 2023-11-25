export interface ParkingData {
  parkings: Parking[];
  total: number;
}

export interface Parking {
  category: Category;
  _id: number;
  center: Center;
  location: Location;
  spaces: Spaces;
  zone?: Zone;
  blocked: boolean;
  aggregating: boolean;
}

export interface Category {
  _id: number;
  zonePurpose: ZonePurpose;
}

export enum ZonePurpose {
  All = "all",
}

export interface Center {
  type: CenterType;
  coordinates: number[];
}

export enum CenterType {
  Point = "Point",
}

export interface Location {
  type: LocationType;
  coordinates: Array<number[]>;
}

export enum LocationType {
  LineString = "LineString",
  Polygon = "Polygon",
}

export interface Spaces {
  handicapped?: number;
  total?: number;
}

export interface Zone {
  type: ZoneType;
  prices: PriceElement[];
}

export interface PriceElement {
  vehicleType: VehicleType;
  price: PricePrice;
}

export interface PricePrice {
  min: number;
  max: number;
}

export enum VehicleType {
  Car = "car",
}

export enum ZoneType {
  Simple = "simple",
}