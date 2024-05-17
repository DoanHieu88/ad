import React, { memo, useMemo } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import Search from "./search";
import CameraItem from "./item";
import { TreeItem, TreeView } from "@material-ui/lab";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import TreeHeaderIcon from "../../map/icons/TreeHeaderIcon";
import { useCameraOnMapContext, useDipatch } from "../Provider/CameraOnMapMngt";
import { MapsActionTypes } from "../Provider/reducers/MapReducer";
import useListMarkersData from "../../../hooks/api/useListMarkers";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label":
      {
        backgroundColor: "transparent",
      },
    "& .MuiTreeItem-iconContainer": {
      width: 0,
    },
    "& .MuiTreeItem-content": {
      gap: 5,
    },
  },
});

const TreeHeader = ({ node }) => {
  return (
    <Box
      style={{
        padding: "5px 0px",
        display: "flex",
        gap: "10px",
        alignContent: "center",
      }}
    >
      <TreeHeaderIcon />
      <Typography>{node.label}</Typography>
    </Box>
  );
};

const NumberStatusCamera = ({ title, linearColor }) => {
  return (
    <Box
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "100px",
          background: linearColor,
        }}
      />
      <Typography>{title}</Typography>
    </Box>
  );
};

const statusCamera = [
  {
    key: "total",
    color: "linear-gradient(rgba(10, 226, 32, 1), rgba(169, 6, 6, 1))",
  },
  {
    key: "online",
    color: "linear-gradient(rgba(10, 226, 32, 1), rgba(6, 169, 32, 0.97))",
  },
  {
    key: "offline",
    color: "linear-gradient(rgba(226, 10, 30, 1), rgba(185, 9, 25, 0.97))",
  },
];

const SideBar = memo(() => {
  const classes = useStyles();

  const { data: markerList } = useListMarkersData();

  const { listPopUpCameraOpen } = useCameraOnMapContext();
  const dispatch = useDipatch();

  const numberStatus = useMemo(() => {
    if (!markerList)
      return {
        total: 0,
        online: 0,
        offline: 0,
      };

    let numberOnline = 0;
    let numberOffline = 0;

    markerList.forEach((marker) => {
      marker.deviceList.forEach((device) => {
        if (device.status === "ONLINE") {
          numberOnline += 1;
        } else {
          numberOffline += 1;
        }
      });
    });

    return {
      total: numberOnline + numberOffline,
      online: numberOnline,
      offline: numberOffline,
    };
  }, [markerList]);

  return (
    <Box style={{ width: "290px", height: "900px", padding: "10px" }}>
      <Search />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          padding: "10px 15px",
        }}
      >
        {statusCamera.map((status) => (
          <NumberStatusCamera
            key={status.key}
            title={numberStatus[status.key]}
            linearColor={status.color}
          />
        ))}
      </Box>
      <Box>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
        >
          {markerList &&
            markerList.map((data, index) => (
              <TreeItem
                nodeId={data.id}
                label={<TreeHeader node={data} />}
                key={`${data.id}_${index}`}
              >
                {data.deviceList.map((device, index) => (
                  <TreeItem
                    key={`${device.id}_${index}`}
                    nodeId={device.id}
                    label={
                      <CameraItem
                        camera_detail={device}
                        selected={listPopUpCameraOpen[device.id]}
                      />
                    }
                    onClick={() => {
                      dispatch({
                        type: MapsActionTypes.LIST_POPUP_CAMERA_OPEN,
                        payload: {
                          ...listPopUpCameraOpen,
                          [device.id]: !listPopUpCameraOpen[device.id],
                        },
                      });
                    }}
                  />
                ))}
              </TreeItem>
            ))}
        </TreeView>
      </Box>
    </Box>
  );
});

export default SideBar;
