import {
  EquipmentDetails,
  Journey,
  JourneyDetails,
  Trip,
  Vehicle,
} from '@/types';

export function createEquipmentDetails(
  partialEquipmentDetails: Partial<
    Omit<
      EquipmentDetails,
      | 'provider_id'
      | 'agency_id'
      | 'vehicle_id'
      | 'serial_number'
      | 'brand'
      | 'model'
      | 'software_version'
    >
  > &
    Pick<
      EquipmentDetails,
      | 'provider_id'
      | 'agency_id'
      | 'vehicle_id'
      | 'serial_number'
      | 'brand'
      | 'model'
      | 'software_version'
    >,
): EquipmentDetails {
  return {
    provider_id: partialEquipmentDetails.provider_id,
    agency_id: partialEquipmentDetails.agency_id,
    vehicle_id: partialEquipmentDetails.vehicle_id,
    serial_number: partialEquipmentDetails.serial_number,
    brand: partialEquipmentDetails.brand,
    model: partialEquipmentDetails.model,
    software_version: partialEquipmentDetails.software_version,
    provider: partialEquipmentDetails.provider
      ? {
          vehicle: partialEquipmentDetails.provider.vehicle ?? false,
          operator: partialEquipmentDetails.provider.operator ?? false,
          journey: partialEquipmentDetails.provider.journey ?? false,
          position: partialEquipmentDetails.provider.position ?? false,
          progression: partialEquipmentDetails.provider.progression ?? false,
          occupancy: partialEquipmentDetails.provider.occupancy ?? false,
          conditions: partialEquipmentDetails.provider.conditions ?? false,
          emissions: partialEquipmentDetails.provider.emissions ?? false,
          travelers: partialEquipmentDetails.provider.travelers ?? false,
          authorizations:
            partialEquipmentDetails.provider.authorizations ?? false,
          fares: partialEquipmentDetails.provider.fares ?? false,
          transfers: partialEquipmentDetails.provider.transfers ?? false,
          alerts: partialEquipmentDetails.provider.travelers ?? false,
        }
      : undefined,
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
    schedule_relationship: partialJourneyDetails.schedule_relationship ?? 'SCHEDULED',
    journey_status: partialJourneyDetails.journey_status ?? 'IN_PROGRESS',
  };
}
