import { Box, Grid, makeStyles } from "@material-ui/core";
import {
  cameraStorageData,
  active,
  cameraStorage,
} from "../../../utils/traffic";
import { useFormContext } from "react-hook-form";
import BaseSearchForm from "../../traffic/component/BaseSearchForm";
import BaseButton from "../../traffic/component/BaseButton";
import TableContent from "../../traffic/Table/TableContent";
import { useContext, useMemo, useState } from "react";
import { RecordingCameraContext } from "..";
import SelectMulNoCheckBox from "../../../component/SelectMultipleNoCheckbox";

const CameraListModal = () => {
  const methods = useFormContext();
  const {} = methods;

  const {
    checkedItemList,
    cameraList,
    cameraDataShow,
    handleChangePagination,
    pagination,
    handleSearch,
    selectedStatus,
    selectedCamera,
    isOpenStatus,
    isOpenCamera,
    handleSelectStatus,
    handleSelectCamera,
    setIsOpenStatus,
    setIsOpenCamera,
  } = useContext(RecordingCameraContext);

  const newCameraDataShow = useMemo(() => {
    if (cameraDataShow.data.length < 9) {
      const emptyItemLength = 9 - cameraDataShow.data.length;
      const emptyItemArray = Array.from(
        { length: emptyItemLength },
        () => ({})
      );
      return [...cameraDataShow.data, ...emptyItemArray];
    } else {
      return cameraDataShow.data;
    }
  }, [cameraDataShow]);
  const classes = style();
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BaseSearchForm
            listData={cameraList}
            handleSearch={handleSearch}
            haveOwnMaxLength={255}
            placeholder={"Search by device name, device ID"}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectMulNoCheckBox
            placeholderContent={"Search"}
            list={active}
            btnText={"Status"}
            selected={selectedStatus}
            handleSelect={handleSelectStatus}
            isOpen={isOpenStatus}
            setIsOpen={setIsOpenStatus}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectMulNoCheckBox
            placeholderContent={"Search"}
            list={cameraStorage}
            btnText={"Camera Storage"}
            selected={selectedCamera}
            handleSelect={handleSelectCamera}
            isOpen={isOpenCamera}
            setIsOpen={setIsOpenCamera}
          />
        </Grid>
        <Grid item xs={2}>
          <BaseButton content={"Export Data"} />
        </Grid>
      </Grid>
      <Box className={classes.table}>
        <TableContent
          tableHeader={cameraStorageData}
          pagination={{
            page: pagination.page,
            rowPerPage: pagination.rowPerPage,
            length: cameraList && cameraList.length,
          }}
          tableData={newCameraDataShow}
          checkedItems={checkedItemList}
          handleChangePagination={handleChangePagination}
        />
      </Box>
    </Box>
  );
};

const style = makeStyles({
  root: {
    padding: "10px 0 20px 0",
    width: 1141,
    borderRadius: 10,
    backgroundColor: "white",
    "& .MuiInputBase-root": { height: "48px" },
  },
  rowWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  table: {
    padding: "20px 0",
  },
});

export default CameraListModal;
