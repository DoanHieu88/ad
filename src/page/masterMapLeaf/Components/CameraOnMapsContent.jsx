import { useEffect, useRef, useState } from "react";
import useListMarkersData from "../../../hooks/api/useListMarkers";
import { useCameraOnMapContext, useDipatch } from "../Provider/CameraOnMapMngt";
import { MapsActionTypes } from "../Provider/reducers/MapReducer";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerItem from "./MarkerItem";
import { fetchAddress } from "../utils/common";

const latDefault = 21.0677385;
const lngDefault = 105.8114404;

const VIET_NAM_BOUNDS = {
  north: 26.625282609530778,
  south: 7.403234941112085,
  west: 91.39500174206523,
  east: 119.49802908581523,
};

const defaultProps = {
  center: { lat: 21.0278, lng: 105.8342 },
  restriction: {
    latLngBounds: VIET_NAM_BOUNDS,
    strictBounds: false,
  },
  zoom: 13,
};

const maptiler = {
  url: "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=LBJ7RGSDNGPh1rHfoe73",
  atrribution:
    "&copy; <a href='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=LBJ7RGSDNGPh1rHfoe73'>OpenStreetMap</a> contributors",
};

const CameraOnMapsContent = () => {
  const { data: markerList } = useListMarkersData();
  const dispatch = useDipatch();

  const rootRef = useRef(null);

  const { places } = useCameraOnMapContext();

  const [placeSelected, setPlaceSelected] = useState();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const getAddressMarker = async (position) => {
    const response = await fetchAddress({
      lng: position.lng,
      lat: position.lat,
    });

    return response;
  };

  useEffect(() => {
    if (!markerList) return;

    const devices = [...places];

    markerList.forEach((marker) => {
      marker.deviceList.forEach(async (device) => {
        if (device.lng && device.lat) {
          const addressMarker = await getAddressMarker({
            lng: device.lng,
            lat: device.lat,
          });

          devices.push({
            ...device,
            name: addressMarker,
          });
          dispatch({
            type: MapsActionTypes.PLACES,
            payload: [...devices],
          });
        } else {
          devices.push({
            ...device,
            name: "380 Đường Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội",
            lat: latDefault,
            lng: lngDefault,
          });

          dispatch({
            type: MapsActionTypes.PLACES,
            payload: [...devices],
          });
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerList]);

  const handleOpenEditModal = (place) => {
    setPlaceSelected(place);
    setIsOpenEditModal(true);
  };

  console.log({
    places,
  });

  return (
    <MapContainer center={defaultProps.center} zoom={16} scrollWheelZoom={true}>
      <TileLayer attribution={maptiler.atrribution} url={maptiler.url} />
      {places.map((place) => (
        <MarkerItem
          key={place.id}
          place={place}
          handleOpenEditModal={handleOpenEditModal}
        />
      ))}
    </MapContainer>
  );
};

export default CameraOnMapsContent;
