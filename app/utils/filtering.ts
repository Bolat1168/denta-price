import { Doctor } from '../data/types';

export function filterDoctorsByService(
  doctors: Doctor[],
  serviceId: string | null
): Doctor[] {
  if (!serviceId) {
    return doctors;
  }
  
  return doctors.filter(doctor => 
    doctor.servicesIds.includes(serviceId)
  );
}
