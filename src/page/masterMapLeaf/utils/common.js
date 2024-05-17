export async function fetchCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Failed to fetch coordinates", error);
    throw error;
  }
}

export async function fetchAddress({ lat, lng }) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Failed to fetch address", error);
    throw error;
  }
}
