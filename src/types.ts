type CurrentStatus = 'INCOMING_AT' | 'STOPPED_AT' | 'IN_TRANSIT_TO';
type CongestionLevel =
  | 'UNKNOWN_CONGESTION_LEVEL'
  | 'RUNNING_SMOOTHLY'
  | 'STOP_AND_GO'
  | 'CONGESTION'
  | 'SEVERE_CONGESTION';
type IsWheelChairAccesible =
  | 'NO_VALUE'
  | 'UNKNOWN'
  | 'WHEELCHAIR_ACCESSIBLE'
  | 'WHEELCHAIR_INACCESSIBLE';
type JourneyStatus = 'IN_PROGRESS' | 'COMPLETED' | 'INTERRUPTED';
type OccupancyStatus =
  | 'EMPTY'
  | 'MANY_SEATS_AVAILABLE'
  | 'FEW_SEATS_AVAILABLE'
  | 'STANDING_ROOM_ONLY'
  | 'CRUSHED_STANDING_ROOM_ONLY'
  | 'FULL'
  | 'NOT_ACCEPTING_PASSENGERS'
  | 'NO_DATA_AVAILABLE'
  | 'NOT_BOARDABLE';
type ScheduleStatus =
  | 'SCHEDULED'
  | 'ADDED'
  | 'UNSCHEDULED'
  | 'CANCELED'
  | 'DUPLICATED'
  | 'DELETED';
type ServiceDisponibility =
  | 'NO_VALUE'
  | 'UNKNOWN'
  | 'AVAILABLE'
  | 'UNAVAILABLE';

export type Equipment = {
  equipment_id: string;
  serial_number: string;
};

export type EquipmentDetails = {
  provider_id: string;
  agency_id: string;
  vehicle_id: string;
  serial_number: string;
  brand: string;
  model: string;
  software_version: string;
  provider?: {
    vehicle?: boolean;
    operator?: boolean;
    journey?: boolean;
    position?: boolean;
    progression?: boolean;
    occupancy?: boolean;
    conditions?: boolean;
    emissions?: boolean;
    travelers?: boolean;
    authorizations?: boolean;
    fares?: boolean;
    transfers?: boolean;
    alerts?: boolean;
  };
};

export type Route = {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  url?: string | null;
  feed?: number;
  route_long_name?: string;
  route_desc?: string;
  route_type?: number;
  route_url?: string;
  route_color?: string;
  route_text_color?: string;
  route_sort_order?: number | null;
};

export type Journey = {
  journey_id: number;
};

export type JourneyDetails = {
  equipment_id: string;
  operator_id: string;
  route_id: string;
  trip_id: string;
  direction: string;
  shape_id: number;
  start_date: string;
  start_time: string;
  schedule_relationship: ScheduleStatus;
  journey_status: JourneyStatus;
};

export type Occupancy = {
  journey_id: number;
  occupancy_count: number;
  occupancy_percentage: number;
  occupancy_status: OccupancyStatus;
  is_wheelchair_accesible: IsWheelChairAccesible;
};

export type Operator = {
  agencies: number[];
  phone: string;
  photo: string | null;
  url: string;
  user: number;
  vehicle: string | null;
};

export type User = {
  operator_id: string;
  first_name: string;
  last_name: string;
};

export type Position = {
  journey_id: number;
  timestamp: number;
  latitude: number;
  longitude: number;
  altitude?: number;
  speed?: number;
  bearing?: number;
  odometer?: number;
};

export type Progression = {
  journey_id: number;
  current_stop_sequence: number;
  stop_id: number;
  current_status: CurrentStatus;
  congestion_level: CongestionLevel;
};

export type StopRequest = {
  route_id: string;
  shape_id: string;
};

export type StopResponse = {
  stop_id: string;
  stop_sequence: number;
  shape_dist_traveled: number;
};

export type Trip = {
  journey_id: number;
  route_id: string;
  shape_id: string;
};

export type Vehicle = {
  vehicle_id: string;
  label: string;
  license_plate: string;
  agency?: string;
  wheelchair_accessible?: IsWheelChairAccesible;
  wifi?: ServiceDisponibility;
  air_conditioning?: ServiceDisponibility;
  mobile_charging?: ServiceDisponibility;
  bike_rack?: ServiceDisponibility;
  has_screen?: boolean;
  has_headsign_screen?: boolean;
  has_audio?: boolean;
};

export type Provider = {
  url: string;
  agency: string[];
  name: string;
  description: string;
};

export type Agency = {
  name: string;
  id: number;
};

export type Item<T> = {
  label: string;
  value: T;
};
