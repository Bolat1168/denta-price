// app/utils/geo.ts

/**
 * Расчет расстояния между двумя точками по координатам (в км)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Радиус Земли в км
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Расстояние в км
};

/**
 * Определение радиуса по расстоянию
 */
export const getRadiusByDistance = (distance: number): '3km' | '6km' | 'city' => {
  if (distance <= 3) return '3km';
  if (distance <= 6) return '6km';
  return 'city';
};

/**
 * Получение текущей геолокации пользователя
 */
export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * Определение радиуса для врача относительно пользователя
 */
export const getDoctorRadiusForUser = (
  doctorLat: number,
  doctorLon: number,
  userLat: number,
  userLon: number
): '3km' | '6km' | 'city' => {
  const distance = calculateDistance(userLat, userLon, doctorLat, doctorLon);
  return getRadiusByDistance(distance);
};