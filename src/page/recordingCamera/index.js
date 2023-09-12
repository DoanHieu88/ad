import {
  Box,
  InputAdornment,
  Paper,
  Switch,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  StreamServer,
  BoxCircleChar,
  StackedBarChartCustom,
  TabTable,
} from "./components";
import {
  colorsCameraStorage,
  colorsRecordState,
  dataBarCam,
  dataCameraStorage,
  dataRecordState,
} from "./@type";
import SearchIcon from "@material-ui/icons/Search";
import _ from "lodash";
import { createContext } from "react";
import CustomModal from "../traffic/component/CustomModal";
import CameraListModal from "./Modals/CameraListModal";
import EditServerRecordModal from "./Modals/EditServerRecordModal";

const dataCam = Array.from(Array(14)).map((_, index) => ({
  id: index + 1,
  name: `service ${index}`,
  state: index % 2 !== 0 ? "Normal" : "Error",
  camera: "100/200",
  on: Math.floor(Math.random() * 10) + 200,
  off: Math.floor(Math.random() * 5) + 30,
  error: Math.floor(Math.random() * 300),
  errorMes: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed …",
}));
export const RecordingCameraContext = createContext({});
const RecordingCamera = () => {
  const [isViewTable, setIsViewTable] = useState(false);
  const [camDataBar, setCamDataBar] = useState({ ...dataBarCam });
  const [isOpenCameraModal, setIsOpentCameraModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [defaultEditModalData, setDefaultEditModalData] = useState({
    id: "1",
    serverName: "Server 001",
    macAddress: "4sjs:dSjdjdjdj:ddd",
    idAddress: "255.255.255.255",
    publicAddress: "example.vhtcloudcam.vn.vn",
    serverLocation: "380 Lac Long Quan",
    cpu: "8",
    ram: "16",
    hdd: "256",
    camera: "200",
    cameraLimited: "500",
  });

  const handleHideData = (key) => {
    const dataChange = { ...camDataBar[key], active: !camDataBar[key].active };
    const newData = _.cloneDeep({
      ...camDataBar,
      [key]: dataChange,
    });
    setCamDataBar(newData);
  };

  const data = {
    isOpenCameraModal,
    isOpenEditModal,
    setIsOpentCameraModal,
    setIsOpenEditModal,
    defaultEditModalData,
  };
  return (
    <RecordingCameraContext.Provider value={data}>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              paddingBottom: 50,
            }}
          >
            <StreamServer />
            <BoxCircleChar
              label={"Service Recording State"}
              data={dataRecordState}
              COLORS={colorsRecordState}
              type={" Service"}
              total={dataCam.length}
            />
            <BoxCircleChar
              label={"Camera Storage"}
              data={dataCameraStorage}
              COLORS={colorsCameraStorage}
              type={"Cameras"}
              total={dataCam.length}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper style={{ width: "91%", padding: "24px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: isViewTable ? "space-evenly" : "flex-end",
                  alignItems: "center",
                  paddingBottom: 24,
                }}
              >
                {isViewTable && (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      style={{ flex: 1 }}
                      placeholder="Search by device name, device ID"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      variant="outlined"
                      style={{ width: 250, marginInline: 20 }}
                    />
                  </Box>
                )}
                <Box
                  style={
                    !isViewTable
                      ? { marginRight: 20, marginTop: 10 }
                      : { width: 200 }
                  }
                >
                  <Switch
                    size="medium"
                    checked={isViewTable}
                    onChange={(e) => setIsViewTable(e.target.checked)}
                  />
                  <span>Table view</span>
                </Box>
              </Box>
              {!isViewTable ? (
                <>
                  <StackedBarChartCustom
                    data={dataCam}
                    listBar={Object.values(camDataBar).reverse()}
                    handleHideData={handleHideData}
                  />
                </>
              ) : (
                <TabTable data={dataCam} />
              )}
            </Paper>
          </Box>
        </Box>
        {isOpenCameraModal && (
          <CustomModal
            isOpen={isOpenCameraModal}
            handleClose={() => setIsOpentCameraModal(false)}
            title="Server 001"
          >
            <CameraListModal handleClose={() => setIsOpentCameraModal(false)} />
          </CustomModal>
        )}
        {isOpenEditModal && (
          <CustomModal
            isOpen={isOpenEditModal}
            handleClose={() => setIsOpenEditModal(false)}
            title="Edit Recording Server"
          >
            <EditServerRecordModal
              handleClose={() => setIsOpenEditModal(false)}
            />
          </CustomModal>
        )}
      </React.Fragment>
    </RecordingCameraContext.Provider>
  );
};

export default RecordingCamera;
