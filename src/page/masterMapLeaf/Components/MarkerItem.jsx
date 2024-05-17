import { Box } from "@material-ui/core";

import { useCameraOnMapContext, useDipatch } from "../Provider/CameraOnMapMngt";
import { MapsActionTypes } from "../Provider/reducers/MapReducer";
import { Marker, Popup } from "react-leaflet";
import { useMemo, useRef } from "react";
import L from "leaflet";
import ContentPopUpCamera from "../../masterMap/Content/ContentPopUpCamera";

const MarkerItem = ({ place, handleOpenEditModal }) => {
  const { listPopUpCameraOpen } = useCameraOnMapContext();
  const markerRef = useRef(null);
  const popupRef = useRef(null);

  const dispatch = useDipatch();

  const customIcon = useMemo(() => {
    const iconUrl =
      place.status === "ONLINE"
        ? "/images/camera-online.png"
        : "/images/camera-offline.png";

    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [35, 35], // Size of the icon
      iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
      popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
    });
  }, [place]);

  const eventHandlers = useMemo(
    () => ({
      click() {
        const marker = markerRef.current;

        console.log({ markerRef });

        const selectedMarker = marker._popup._wrapper;

        if (
          !selectedMarker.parentElement.style.display ||
          selectedMarker.parentElement.style.display === "none"
        ) {
          selectedMarker.parentElement.style.display = "block";
        } else {
          selectedMarker.parentElement.style.display = "none";
        }

        if (marker != null) {
          dispatch({
            type: MapsActionTypes.LIST_POPUP_CAMERA_OPEN,
            payload: {
              ...listPopUpCameraOpen,
              [place.id]: !listPopUpCameraOpen[place.id],
            },
          });
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log({
    listPopUpCameraOpen,
  });

  return (
    <Box style={{ position: "relative" }}>
      <Marker
        ref={markerRef}
        key={place.id}
        position={{
          lat: place.lat,
          lng: place.lng,
        }}
        icon={customIcon}
        eventHandlers={eventHandlers}
      >
        <Popup
          autoClose={false}
          closeButton={false}
          closeOnClick={false}
          keepInView={false}
        >
          <ContentPopUpCamera
            place={place}
            handleOpenEditModal={handleOpenEditModal}
          />
        </Popup>
      </Marker>
    </Box>
  );
};

export default MarkerItem;
