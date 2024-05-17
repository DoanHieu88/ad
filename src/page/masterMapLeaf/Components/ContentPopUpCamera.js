import React, { useState, memo, useRef, useEffect } from "react";
import { Box, Collapse, Typography } from "@material-ui/core";
import IconNotiVideoOffline from "../Icons/IconNotiVideoOffline";
import InfoCameraIcon from "../Icons/InfoCameraIcon";
import CloseModalIcon from "../Icons/CloseModalIcon";
import ZoomVideoIcon from "../Icons/ZoomVideoIcon";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import { enterFullScreen, exitFullscreen } from "../../../utils/common";
import { useCameraOnMapContext, useDipatch } from "../Provider/CameraOnMapMngt";
import { MapsActionTypes } from "../Provider/reducers/MapReducer";

const RenderVideo = memo(({ place }) => {
  const { listPopUpCameraOpen } = useCameraOnMapContext();
  const dispatch = useDipatch();

  const videoRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleChangeFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleChangeFullScreen);

    return () => {
      document.removeEventListener("fullscreenchange", handleChangeFullScreen);
    };
  }, []);

  const handleZoom = () => {
    enterFullScreen(videoRef.current);
  };

  return (
    <Box
      ref={videoRef}
      style={{
        width: "100%",
        position: "relative",
        height: "100%",
        backgroundImage: "linear-gradient(180deg, #292929 25%, #d1d1d1 100%)",
        backgroundColor: "#292929",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignTtems: "center",
            marginBottom: "4px",
          }}
        >
          <IconNotiVideoOffline /> Offline
        </Box>
        <Typography style={{ fontSize: 12 }}>05:20:30 16/06/203</Typography>
      </Box>
      <video
        style={{ width: "100%", height: "100%", objectFit: "fill" }}
        autoPlay
      >
        <source type="video/mp4" />
      </video>
      {isFullScreen ? (
        <>
          <Typography
            style={{
              position: "absolute",
              left: "15px",
              top: "10px",
              color: "#fff",
            }}
          >
            {place.camName}
          </Typography>
          <Box
            style={{
              position: "absolute",
              right: "15px",
              top: "10px",
              cursor: "pointer",
            }}
            onClick={() => exitFullscreen()}
          >
            <CloseModalIcon color={"#fff"} width={25} height={25} />
          </Box>
        </>
      ) : (
        <>
          <Box
            style={{
              position: "absolute",
              left: "10px",
              top: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch({
                type: MapsActionTypes.LIST_POPUP_CAMERA_OPEN,
                payload: {
                  [place.id]: !listPopUpCameraOpen[place.id],
                },
              });
            }}
          >
            <CloseModalIcon color="#fff" width={10} height={10} />
          </Box>
          <Box
            style={{
              position: "absolute",
              right: "10px",
              top: "5px",
              cursor: "pointer",
            }}
            onClick={handleZoom}
          >
            <ZoomVideoIcon />
          </Box>
        </>
      )}
    </Box>
  );
});

const ContentPopUpCamera = ({ place, handleOpenEditModal }) => {
  const [isShowInfo, setIsShowInfo] = useState(false);

  return (
    <Box
      style={{
        width: 228,
        height: 158,
        position: "relative",
        borderRadius: "10px",
        padding: "12px",
      }}
    >
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignContent: "center",
            paddingTop: 7,
            paddingBottom: 7,
            backgroundColor: "#fff",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              marginRight: "auto",
              fontsize: "16px",
              lineHeight: "20px",
              width: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {place.camName}
          </span>
          <Box
            style={{
              cursor: "pointer",
              width: "20px",
              height: "20px",
              margin: "auto 0",
            }}
            onClick={() => setIsShowInfo((isShow) => !isShow)}
          >
            {!isShowInfo ? (
              <InfoCameraIcon />
            ) : (
              <PlayCircleOutlineIcon fontSize="small" color="inherit" />
            )}
          </Box>
        </Box>
        <Box
          style={{
            position: "relative",
            flex: 1,
          }}
        >
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              flex: 1,
              height: "auto",
              overflow: "hidden",
            }}
          >
            <RenderVideo place={place} />
          </Box>
          <Collapse
            in={isShowInfo}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              background: "white",
              paddingTop: 0,
            }}
          >
            <Box
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  height: "8px",
                  width: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    place.status === "ONLINE" ? "#08B44D" : "#DD3D4B",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  color: place.status === "ONLINE" ? "#08B44D" : "#DD3D4B",
                }}
              >
                {place.status === "ONLINE" ? "Online" : "Offline"}
              </span>
            </Box>
            <Box style={{ marginBottom: "10px" }}>
              Location: {place.lat.toFixed(2)}ºN, {place.lng.toFixed(2)}ºE
            </Box>
            <Box style={{ marginBottom: "10px" }}>Camera Type:</Box>
            <Box
              style={{
                border: "2px solid #000",
                fontWeight: 700,
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "10px",
              }}
              onClick={() => handleOpenEditModal(place)}
            >
              Edit Location
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default ContentPopUpCamera;
