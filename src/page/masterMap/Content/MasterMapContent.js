import { useContext, useEffect, useMemo, useState } from "react";
import { GoogleMap, Polygon, Polyline } from "@react-google-maps/api";

import { MasterMapContext } from "../MasterMap";
import MarkerItem from "./MarkerItem";
import { Box } from "@material-ui/core";
import EditCameraEdit from "../Modals/EditCameraEdit";

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

const MasterMapContent = () => {
  const { markerList, places, setPlaces } = useContext(MasterMapContext);

  const [placeSelected, setPlaceSelected] = useState();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const getAddressMarker = async (position) => {
    const geocoder = new window.google.maps.Geocoder();

    const response = await geocoder
      .geocode({
        location: {
          lng: position.lng,
          lat: position.lat,
        },
      })
      .then(({ results }) => {
        return results[0].formatted_address;
      });

    return response;
  };

  useEffect(() => {
    if (!markerList.data) return;

    markerList.data.forEach((marker) => {
      marker.deviceList.forEach(async (device) => {
        if (device.lng && device.lat) {
          const addressMarker = await getAddressMarker({
            lng: device.lng,
            lat: device.lat,
          });

          setPlaces((prev) => [
            ...prev,
            {
              ...device,
              name: addressMarker,
            },
          ]);
        } else {
          setPlaces((prev) => [
            ...prev,
            {
              ...device,
              name: "380 Đường Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội",
              lat: latDefault,
              lng: lngDefault,
            },
          ]);
        }
      });
    });
  }, [markerList.data]);

  const placesTracking = useMemo(() => {
    return places.map((place) => {
      return {
        lat: place.lat,
        lng: place.lng,
      };
    });
  }, [places]);

  const handleOpenEditModal = (place) => {
    setPlaceSelected(place);
    setIsOpenEditModal(true);
  };

  return (
    <Box flex={1} position={"relative"} className="map-content">
      <GoogleMap
        zoom={defaultProps.zoom}
        center={defaultProps.center}
        mapContainerClassName="map-container"
        clickableIcons={false}
        options={{
          streetViewControl: false,
          rotateControl: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
        }}
      >
        {places.map((place) => {
          return (
            <MarkerItem
              key={place.id}
              place={place}
              handleOpenEditModal={handleOpenEditModal}
            />
          );
        })}
        <Polyline
          path={placesTracking}
          strokeColor="#FF0000"
          strokeOpacity={1.0}
          strokeWeight={2}
          geodesic
        />
      </GoogleMap>
      {isOpenEditModal && (
        <EditCameraEdit
          isOpenEditModal={isOpenEditModal}
          place={placeSelected}
          handleClose={() => setIsOpenEditModal(false)}
        />
      )}
    </Box>
  );
};

export default MasterMapContent;
