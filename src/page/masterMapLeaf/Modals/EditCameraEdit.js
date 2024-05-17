import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useMutation } from "@tanstack/react-query";

import {
  Box,
  Button,
  Card,
  Dialog,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { SearchIcon } from "../../../common/icons/SearchIcon";
import useDebounce from "../../../hooks/useDebounce";
import { editMarker } from "../../../utils/api/map";
import { MasterMapLeafContext } from "../CameraOnMaps";

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
  zoom: 10,
};

const EditCameraMapModal = ({ place, handleClose, isOpenEditModal }) => {
  const { setPlaces, markerList } = useContext(MasterMapLeafContext);

  const classes = useStylesTableBodyGroup();

  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [placeCustom, setPlaceCustom] = useState({
    name: place.name,
    lng: place.lng,
    lat: place.lat,
  });

  const keyword = useDebounce(searchValue, 1000);

  const handleSearch = (e) => {
    if (e.target.value.length < 255) {
      setSearchValue(e.target.value);
    }
  };

  useEffect(() => {
    setPlaceCustom({
      name: place.name,
      lng: place.lng,
      lat: place.lat,
    });
  }, [place]);

  const handleStartDragMarker = () => {
    setIsPopupOpen(false);
  };

  const handleDragMarker = (event) => {
    setIsPopupOpen(true);
    const geocoder = new window.google.maps.Geocoder();

    geocoder
      .geocode({
        location: {
          lng: event.latLng.lng(),
          lat: event.latLng.lat(),
        },
      })
      .then(({ results }) => {
        setPlaceCustom({
          name: results[0].formatted_address,
          lng: event.latLng.lng(),
          lat: event.latLng.lat(),
        });
      });
  };

  const editMarkerApi = useMutation({
    mutationFn: async (param) => editMarker(param),
    onSuccess: () => {
      setPlaces((prev) =>
        prev.map((mark) => {
          if (mark.id === place.id) {
            return {
              ...mark,
              name: placeCustom.name,
              lng: placeCustom.lng,
              lat: placeCustom.lat,
            };
          } else {
            return { ...mark };
          }
        })
      );
      handleClose();
    },
    onError: () => {
      console.log("Error");
    },
  });

  useEffect(() => {
    if (keyword !== "") {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: keyword }, (results, status) => {
        if (status === "OK") {
          setPlaceCustom({
            name: results[0].formatted_address,
            lng: results[0].geometry.location.lng(),
            lat: results[0].geometry.location.lat(),
          });
        }
      });
    }
  }, [keyword]);

  const handleEditMarker = () => {
    let placeArr = [];

    markerList.data.map((m) => {
      if (m.id === "37012e00e59711ed879f024263d4df88") {
        m.deviceList.map((de) => {
          if (de.id === place.id) {
            placeArr = [
              ...placeArr,
              {
                ...de,
                lat: placeCustom.lat,
                lng: placeCustom.lng,
              },
            ];
          } else {
            placeArr = [
              ...placeArr,
              {
                ...de,
              },
            ];
          }
        });
      }
    });

    const params = {
      id: "37012e00e59711ed879f024263d4df88",
      parentId: "f0cd4870e59011ed879f024263d4df88",
      label: "MeLinh-IN",
      groupType: 13,
      deviceList: placeArr,
    };

    editMarkerApi.mutate(params);
  };

  return (
    <Dialog open={isOpenEditModal} onClose={handleClose}>
      <Card
        style={{
          width: "425px",
          background: "#FFFFFF",
          padding: "13px",
          borderRadius: "12px",
        }}
        className="edit-modal"
      >
        <Typography
          style={{ textAlign: "center", fontWeight: 600, fontSize: "21px" }}
        >
          Edit Location
        </Typography>
        <Typography style={{ fontWeight: 600 }}>{place.camName}</Typography>
        <Box style={{ width: "100%", height: 200 }}>
          <GoogleMap
            zoom={defaultProps.zoom}
            center={{
              lat: placeCustom.lat,
              lng: placeCustom.lng,
            }}
            mapContainerClassName="map-container-edit"
            clickableIcons={false}
            options={{
              streetViewControl: false,
              rotateControl: false,
              mapTypeControl: false,
              zoomControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker
              position={{
                lat: placeCustom.lat,
                lng: placeCustom.lng,
              }}
              draggable
              onDragStart={handleStartDragMarker}
              onDragEnd={handleDragMarker}
              icon={{
                url: require("../../../asset/carbon_location-company.png"),
              }}
            >
              <InfoWindow
                position={{
                  lat: placeCustom.lat,
                  lng: placeCustom.lng,
                }}
                options={{
                  pixelOffset: { width: 0, height: -40 },
                }}
              >
                <Box padding={1}>
                  <Typography style={{ color: "#fff" }}>
                    {placeCustom.name}
                  </Typography>
                </Box>
              </InfoWindow>
            </Marker>
          </GoogleMap>
        </Box>
        <Box mt="20px">
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search"
            variant="outlined"
            name="keyword"
            size="small"
            fullWidth
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width={20} height={20} color="#EC1B2E" />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Box>
        <Box className={classes.actionButton}>
          <Button
            onClick={handleClose}
            style={{
              background: "#fff",
              color: "#000",
              border: "1.5px solid #000",
            }}
          >
            <Typography>Cancel</Typography>
          </Button>
          <Button
            style={{ background: "#dd3d4b", color: "#fff" }}
            onClick={handleEditMarker}
            disabled={placeCustom.name === place.name}
          >
            <Typography>Confirm</Typography>
          </Button>
        </Box>
      </Card>
    </Dialog>
  );
};

const useStylesTableBodyGroup = makeStyles({
  actionButton: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    padding: "20px 0 0 0",
    "& button": {
      width: "125px",
      height: "40px",
    },
    "& p": {
      textTransform: "capitalize",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
});

export default EditCameraMapModal;
