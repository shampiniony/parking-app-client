export interface YandexData {
  response: Response;
}

export interface Response {
  GeoObjectCollection: GeoObjectCollection;
}

export interface GeoObjectCollection {
  metaDataProperty: GeoObjectCollectionMetaDataProperty;
  featureMember:    FeatureMember[];
}

export interface FeatureMember {
  GeoObject: GeoObject;
}

export interface GeoObject {
  metaDataProperty: GeoObjectMetaDataProperty;
  name:             string;
  description:      string;
  boundedBy:        BoundedBy;
  uri:              string;
  Point:            Point;
}

export interface Point {
  pos: string;
}

export interface BoundedBy {
  Envelope: Envelope;
}

export interface Envelope {
  lowerCorner: string;
  upperCorner: string;
}

export interface GeoObjectMetaDataProperty {
  GeocoderMetaData: GeocoderMetaData;
}

export interface GeocoderMetaData {
  precision:      Precision;
  text:           string;
  kind:           Kind;
  Address:        Address;
  AddressDetails: AddressDetails;
}

export interface Address {
  country_code: CountryCode;
  formatted:    string;
  Components:   Component[];
}

export interface Component {
  kind: Kind;
  name: string;
}

export enum Kind {
  Area = "area",
  Country = "country",
  District = "district",
  Locality = "locality",
  Province = "province",
  Street = "street",
  Vegetation = "vegetation",
}

export enum CountryCode {
  Ru = "RU",
}

export interface AddressDetails {
  Country: Country;
}

export interface Country {
  AddressLine:        string;
  CountryNameCode:    CountryCode;
  CountryName:        CountryName;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  SubAdministrativeArea?: SubAdministrativeArea;
  Locality?:              AdministrativeAreaLocality;
}

export interface AdministrativeAreaLocality {
  LocalityName:  string;
  Premise?:      Premise;
  Thoroughfare?: Thoroughfare;
}

export interface Premise {
  PremiseName: string;
}

export interface Thoroughfare {
  ThoroughfareName: string;
}

export interface SubAdministrativeArea {
  SubAdministrativeAreaName: string;
  Locality:                  SubAdministrativeAreaLocality;
}

export interface SubAdministrativeAreaLocality {
  LocalityName:       string;
  DependentLocality?: LocalityDependentLocality;
  Thoroughfare?:      Thoroughfare;
}

export interface LocalityDependentLocality {
  DependentLocalityName: string;
  DependentLocality:     DependentLocalityDependentLocality;
}

export interface DependentLocalityDependentLocality {
  DependentLocalityName: string;
}

export enum CountryName {
  Россия = "Россия",
}

export enum Precision {
  Other = "other",
  Street = "street",
}

export interface GeoObjectCollectionMetaDataProperty {
  GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export interface GeocoderResponseMetaData {
  request: string;
  results: string;
  found:   string;
}
