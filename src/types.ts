export type Operator = {
  operator_id: string;
  name: string;
  email: string;
  phone?: string;
};

export type Location = {};

export type JourneyId = {
  journey_id: number;
};

export type Trip = {
  journey_id: number;
  route_id: string;
  shape_id: string;
};

export type Stop = {
  stop_id: string;
  stop_sequence: number;
  shape_distance_traveled: number;
};
