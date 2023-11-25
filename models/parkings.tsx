export interface Parking {
  id:          number;
  blocked:     boolean;
  aggregating: boolean;
  category:    Category;
  location:    Location;
  center:      number[];
  space:       Space;
  prices:      Price[];
}

export interface Category {
  zone_purpose: ZonePurpose;
}

export enum ZonePurpose {
  All = "all",
}

export interface Location {
  type:        Type;
  coordinates: Array<number[]>;
}

export enum Type {
  LineString = "LineString",
  Polygon = "Polygon",
}

export interface Price {
  vehicle_type: VehicleType;
  min_price:    number;
  max_price:    number;
}

export enum VehicleType {
  Car = "car",
}

export interface Space {
  handicapped: number;
  total:       number;
}
