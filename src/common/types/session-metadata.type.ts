export interface LocationInfo {
  country: string;
  city: string;
  latidute: number;
  longitude: number;
}

export interface DeviceInfo {
  browser?: string;
  os?: string;
  type?: string;
}

export interface UserAgentMetadata {
  location: LocationInfo;
  device: DeviceInfo;
  ip: string;
}
