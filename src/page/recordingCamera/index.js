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
import yup from "../traffic/javacript/yupGlobal";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCameraData from "../../hooks/api/useCameraData";
import { useMemo } from "react";

const schema = yup.object().shape({
  serverName: yup.string().required("Server name is required").matches(/^[a-zA-Z0-9_]+$/, "Server name is invalid"),
  macAddress: yup.string().required("Mac address is required"),
  idAddress: yup.string().required("ID address is required"),
  publicAddress: yup.string().required("Public address is required"),
  serverLocation: yup.string().required("Server Location is required"),
});

const dataCam = Array.from(Array(14)).map((_, index) => ({
  id: index + 1,
  name: `service ${index}`,
  state: index % 2 !== 0 ? "Normal" : "Error",
  camera: "100/200",
  on: Math.floor(Math.random() * 300),
  off: Math.floor(Math.random() * 300),
  error: Math.floor(Math.random() * 300),
  errorMes: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed …",
}));

export const RecordingCameraContext = createContext({});
const RecordingCamera = () => {
  const [isViewTable, setIsViewTable] = useState(false);
  const [camDataBar, setCamDataBar] = useState({ ...dataBarCam });
  const [isOpenCameraModal, setIsOpentCameraModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [checkedItemList, setCheckedItemList] = useState([]);
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
  const { data: cameraList } = useCameraData();
  const [pagination, setPagination] = useState({
    page: 0,
    rowPerPage: 9,
    length: 0,
  });
  const handleChangePagination = (pag) => {
    setPagination({
      page: pag.page,
      rowPerPage: pag.rowPerPage,
    });
  };

  const cameraDataShow = useMemo(()=>{
    if(!cameraList) return [];
    return {
      data: cameraList.slice(
        pagination.page * (pagination.rowPerPage + 1),
        pagination.page * (pagination.rowPerPage + 1) + pagination.rowPerPage
      ),
    }
  }, [cameraList,  pagination])

  const methods = useForm({
    defaultValues: defaultEditModalData,
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const {} = methods;

  const handleHideData = (key) => {
    const dataChange = { ...camDataBar[key], active: !camDataBar[key].active };
    const newData = _.cloneDeep({
      ...camDataBar,
      [key]: dataChange,
    });
    setCamDataBar(newData);
  };
  const handleEditingModal = (data) => {
    console.log("data", data);
  };

  const data = {
    isOpenCameraModal,
    isOpenEditModal,
    setIsOpentCameraModal,
    setIsOpenEditModal,
    defaultEditModalData,
    handleEditingModal,
    checkedItemList,
    cameraList,
    cameraDataShow,
    handleChangePagination,
    setPagination,
    pagination
  };
  return (
    <FormProvider {...methods}>
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
              <CameraListModal
                handleClose={() => setIsOpentCameraModal(false)}
              />
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
    </FormProvider>
  );
};

export default RecordingCamera;
