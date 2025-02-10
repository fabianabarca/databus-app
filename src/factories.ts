import {
  EquipmentDetails,
  Journey,
  JourneyDetails,
  Trip,
  Vehicle,
} from '@/types';

const DEFAULT_PROVIDER = {
  vehicle: false,
  operator: false,
  journey: false,
  position: false,
  progression: false,
  occupancy: false,
  conditions: false,
  emissions: false,
  travelers: false,
  authorizations: false,
  fares: false,
  transfers: false,
  alerts: false,
};
export function createEquipmentDetails(
  partialEquipmentDetails: Partial<
    Omit<
      EquipmentDetails,
      | 'agency'
      | 'data_provider'
      | 'user'
      | 'vehicle'
      | 'brand'
      | 'model'
      | 'software_version'
    >
  > &
    Pick<
      EquipmentDetails,
      | 'agency'
      | 'data_provider'
      | 'user'
      | 'vehicle'
      | 'brand'
      | 'model'
      | 'software_version'
    >,
): EquipmentDetails {
  return {
    agency: partialEquipmentDetails.agency,
    data_provider: partialEquipmentDetails.data_provider,
    user: partialEquipmentDetails.user,
    vehicle: partialEquipmentDetails.vehicle,
    brand: partialEquipmentDetails.brand,
    model: partialEquipmentDetails.model,
    software_version: partialEquipmentDetails.software_version,

    provider: {
      ...DEFAULT_PROVIDER,
      ...partialEquipmentDetails.provider,
    },
  };
}

export function createJourneyDetails(
  partialJourneyDetails: Partial<
    Omit<
      JourneyDetails,
      | 'equipment_id'
      | 'operator_id'
      | 'route_id'
      | 'trip_id'
      | 'direction'
      | 'shape_id'
      | 'start_date'
      | 'start_time'
    >
  > &
    Pick<
      JourneyDetails,
      | 'equipment_id'
      | 'operator_id'
      | 'route_id'
      | 'trip_id'
      | 'direction'
      | 'shape_id'
      | 'start_date'
      | 'start_time'
    >,
): JourneyDetails {
  return {
    equipment_id: partialJourneyDetails.equipment_id,
    operator_id: partialJourneyDetails.operator_id,
    route_id: partialJourneyDetails.route_id,
    trip_id: partialJourneyDetails.trip_id,
    direction: partialJourneyDetails.direction,
    shape_id: partialJourneyDetails.shape_id,
    start_date: partialJourneyDetails.start_date,
    start_time: partialJourneyDetails.start_time ?? Date.now(),
    schedule_relationship:
      partialJourneyDetails.schedule_relationship ?? 'SCHEDULED',
    journey_status: partialJourneyDetails.journey_status ?? 'IN_PROGRESS',
  };
}
