import React, { useCallback, useEffect, useState, useContext } from "react";

import { Box } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import EditCameraMapModal from "../Modal/EditCameraMap";
import { MapContext } from "../../Map";
import {
  exitFullscreen,
  getPopUpHtml,
  handleCameraIconClick,
  handleCloseModal,
  handleCloseZoom,
  handleInfoIconClick,
  handleZoomVideo,
} from "../../../../utils/common";

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

const bootstrapURLKeys = {
  key: "AIzaSyBR-uY9uzbU_4XVTNhIPB0R2c7xZKKO_wg",
  language: "vn",
  region: "vn",
  libraries: ["places"],
};

const getListLocation = (searchPlace, request, createMaker) => {
  searchPlace.findPlaceFromQuery(request, (results, status) => {
    if (status === "OK") {
      const place = results[0];
      createMaker({
        name: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  });
};

const ContentMap = () => {
  const {
    placeSelected,
    markerList,
    map,
    mapApi,
    listMarker,
    mapApiLoaded,
    setMapApiLoaded,
    setMap,
    setMapApi,
    statusClick,
    setListMarker,
    setPlaceSelected,
    setStatusClick,
    setDeviceListSelected,
  } = useContext(MapContext);

  const [isOpenEditCamera, setIsOpenEditModal] = useState(false);
  const [places, setPlaces] = useState([]);

  const apiHasLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMap(map);
    setMapApi(maps);
  };

  const handleGetLocationDevice = useCallback((searchPlace, listDevice) => {
    listDevice.forEach((deviceItem) => {
      let request;
      if (deviceItem.address) {
        request = {
          query: deviceItem.address,
          fields: ["name", "geometry"],
        };
      } else {
        request = {
          query: "380 Đường Lạc Long Quân, Xuân La, Tây Hồ, Hà Nội",
          fields: ["name", "geometry"],
        };
      }

      getListLocation(searchPlace, request, (maker) => {
        setPlaces((prev) => [...prev, { ...deviceItem, ...maker }]);
      });
    });
  }, []);

  const handleZoomChanged = () => {
    console.log("Zoom level changed to", map.getZoom());
    // const bounds = map.getBounds();
    // const minLat = bounds.getSouthWest().lat();
    // const minLng = bounds.getSouthWest().lng();
    // const maxLat = bounds.getNorthEast().lat();
    // const maxLng = bounds.getNorthEast().lng();
  };

  const handleClickOpenPopUp = (place) => {
    const parentElementDevice = document.getElementById(place.id).parentElement
      .parentElement.parentElement.parentElement;

    if (
      parentElementDevice.style.display === "none" ||
      parentElementDevice.style.display === ""
    ) {
      setDeviceListSelected((prev) => ({
        ...prev,
        [place.id]: true,
      }));
      parentElementDevice.style.display = "block";
    } else {
      setDeviceListSelected((prev) => ({
        ...prev,
        [place.id]: false,
      }));
      parentElementDevice.style.display = "none";
    }

    setStatusClick((prev) => !prev);
  };

  useEffect(() => {
    if (!map && !mapApi && !mapApiLoaded) return;

    if (places.length > 0) {
      console.log("render", places);

      places.forEach((place) => {
        const marker = new mapApi.Marker({
          position: { lat: place.lat, lng: place.lng },
          map,
          icon: {
            url: require(place.status === "ONLINE"
              ? "../../../../asset/camera-online.png"
              : "../../../../asset/camera-offline.png"),
          },
        });

        marker.setMap(map);

        const infoWindowDetail = new mapApi.InfoWindow({
          content: getPopUpHtml(place),
        });

        infoWindowDetail.open(map, marker);

        setListMarker((prev) => ({ ...prev, [place.id]: marker }));

        mapApi.event.addListener(marker, "click", () =>
          handleClickOpenPopUp(place)
        );

        return () => {
          mapApi.event.clearInstanceListeners(() =>
            handleClickOpenPopUp(place)
          );
          setListMarker([]);
          setPlaces([]);
        };
      });
    }
  }, [map, mapApi, mapApiLoaded, places]);

  // Events in Modal
  useEffect(() => {
    if (places.length > 0) {
      const handleOpenEditModal = (e) => {
        const dataId = e.target.getAttribute("data-id");

        setPlaceSelected(places.find((place) => place.id === dataId));
        setIsOpenEditModal(true);
      };

      places.forEach((place) => {
        const editBtn = document.getElementById(`edit-button-${place.id}`);
        const infoIcon = document.getElementById(`${place.id}_info_icon`);
        const cameraIcon = document.getElementById(`${place.id}_camera_icon`);
        const closeIcon = document.getElementById(`${place.id}_close_icon`);
        const zoomIcon = document.getElementById(`${place.id}_zoom_icon`);
        const closeZoomIcon = document.getElementById("close_zoom");

        if (editBtn) {
          editBtn.setAttribute("data-id", place.id);
          editBtn.addEventListener("click", handleOpenEditModal);
        }

        if (infoIcon) {
          infoIcon.setAttribute("data-id", place.id);
          infoIcon.addEventListener("click", handleInfoIconClick);
        }

        if (cameraIcon) {
          cameraIcon.setAttribute("data-id", place.id);
          cameraIcon.addEventListener("click", handleCameraIconClick);
        }

        if (closeIcon) {
          closeIcon.setAttribute("data-id", place.id);
          closeIcon.addEventListener("click", handleCloseModal);
        }

        if (zoomIcon) {
          zoomIcon.addEventListener("click", handleZoomVideo);
          zoomIcon.setAttribute("data-id", place.id);
        }

        if (closeZoomIcon) {
          closeZoomIcon.addEventListener("click", handleCloseZoom);
        }
      });

      return () => {
        places.forEach((place) => {
          const editBtn = document.getElementById(`edit-button-${place.id}`);
          const infoIcon = document.getElementById(`${place.id}_info_icon`);
          const cameraIcon = document.getElementById(`${place.id}_camera_icon`);
          const closeIcon = document.getElementById(`${place.id}_close_icon`);
          const zoomIcon = document.getElementById(`${place.id}_zoom_icon`);
          const closeZoomIcon = document.getElementById("close_zoom");

          if (editBtn) {
            editBtn.removeEventListener("click", handleOpenEditModal);
          }

          if (infoIcon) {
            infoIcon.removeEventListener("click", handleInfoIconClick);
          }

          if (cameraIcon) {
            cameraIcon.removeEventListener("click", handleCameraIconClick);
          }

          if (closeIcon) {
            closeIcon.removeEventListener("click", handleCloseModal);
          }

          if (zoomIcon) {
            zoomIcon.addEventListener("click", handleZoomVideo);
          }

          if (closeZoomIcon) {
            closeZoomIcon.addEventListener("click", handleCloseZoom);
          }
        });
      };
    }
  }, [statusClick]);

  // Get Data List Group devices
  useEffect(() => {
    if (
      !map ||
      !mapApi ||
      !mapApiLoaded ||
      !markerList.data ||
      markerList.isLoading
    )
      return;

    let searchPlace = new mapApi.places.PlacesService(map);

    markerList.data.forEach((mrk) => {
      handleGetLocationDevice(searchPlace, mrk.deviceList);
    });

    return () => {
      mapApi.event.clearInstanceListeners(searchPlace);
      setPlaces([]);
    };
  }, [map, mapApi, mapApiLoaded, markerList.data]);

  const handleCloseEditModal = useCallback(() => {
    setIsOpenEditModal(false);
  }, [isOpenEditCamera]);

  return (
    <Box
      style={{ width: "100%", position: "relative" }}
      className="map-content"
    >
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        debounced
        onZoomAnimationEnd={handleZoomChanged}
        options={{
          restriction: {
            latLngBounds: VIET_NAM_BOUNDS,
            strictBounds: false,
          },
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      />
      {isOpenEditCamera && markerList.data && (
        <EditCameraMapModal
          listMarker={listMarker}
          mapParent={map}
          markerList={markerList.data}
          mapApiContent={mapApi}
          places={places}
          place={placeSelected}
          setStatusClick={setStatusClick}
          handleClose={handleCloseEditModal}
        />
      )}
    </Box>
  );
};

export default ContentMap;
