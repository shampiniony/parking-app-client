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
  coordinates: Array<Array<number[] | number>>;
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

export class Convert {
  public static toParkingData(json: string): ParkingData {
    return cast(JSON.parse(json), r("ParkingData"));
  }

  public static ParkingDataToJson(value: ParkingData): string {
    return JSON.stringify(uncast(value, r("ParkingData")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) { }
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "ParkingData": o([
    { json: "parkings", js: "parkings", typ: a(r("Parking")) },
    { json: "total", js: "total", typ: 0 },
  ], false),
  "Parking": o([
    { json: "category", js: "category", typ: r("Category") },
    { json: "_id", js: "_id", typ: 0 },
    { json: "center", js: "center", typ: r("Center") },
    { json: "location", js: "location", typ: r("Location") },
    { json: "spaces", js: "spaces", typ: r("Spaces") },
    { json: "zone", js: "zone", typ: u(undefined, r("Zone")) },
    { json: "blocked", js: "blocked", typ: true },
    { json: "aggregating", js: "aggregating", typ: true },
  ], false),
  "Category": o([
    { json: "_id", js: "_id", typ: 0 },
    { json: "zonePurpose", js: "zonePurpose", typ: r("ZonePurpose") },
  ], false),
  "Center": o([
    { json: "type", js: "type", typ: r("CenterType") },
    { json: "coordinates", js: "coordinates", typ: a(3.14) },
  ], false),
  "Location": o([
    { json: "type", js: "type", typ: r("LocationType") },
    { json: "coordinates", js: "coordinates", typ: a(a(u(a(3.14), 3.14))) },
  ], false),
  "Spaces": o([
    { json: "handicapped", js: "handicapped", typ: u(undefined, 0) },
    { json: "total", js: "total", typ: u(undefined, 0) },
  ], false),
  "Zone": o([
    { json: "type", js: "type", typ: r("ZoneType") },
    { json: "prices", js: "prices", typ: a(r("PriceElement")) },
  ], false),
  "PriceElement": o([
    { json: "vehicleType", js: "vehicleType", typ: r("VehicleType") },
    { json: "price", js: "price", typ: r("PricePrice") },
  ], false),
  "PricePrice": o([
    { json: "min", js: "min", typ: 0 },
    { json: "max", js: "max", typ: 0 },
  ], false),
  "ZonePurpose": [
    "all",
  ],
  "CenterType": [
    "Point",
  ],
  "LocationType": [
    "LineString",
    "Polygon",
  ],
  "VehicleType": [
    "car",
  ],
  "ZoneType": [
    "simple",
  ],
};
