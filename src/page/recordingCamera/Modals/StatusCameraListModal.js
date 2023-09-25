import { Box, Grid, makeStyles } from "@material-ui/core";
import {
  cameraStatusData,
  active
} from "../../../utils/traffic";
import { useFormContext } from "react-hook-form";
import BaseSearchForm from "../../traffic/component/BaseSearchForm";
import BaseButton from "../../traffic/component/BaseButton";
import SelectMultiple from "../../../component/SelectMultiple";
import TableContent from "../../traffic/Table/TableContent";
import { useContext } from "react";
import { RecordingCameraContext } from "..";

const StatusCameraListModal = () => {
  const methods = useFormContext();
  const {} = methods;

  const {
    checkedItemList,
    cameraList,
    cameraDataShow,
    handleChangePagination,
    pagination,
    handleSearch,
  } = useContext(RecordingCameraContext);

  const classes = style();
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <BaseSearchForm
            listData={cameraList}
            handleSearch={handleSearch}
            haveOwnMaxLength={255}
            placeholder={"Search by device name, device ID"}
          />
        </Grid>

        <Grid item md={2}>
          <SelectMultiple
            placeholderContent={"Search"}
            list={active}
            btnText={"Status"}
          />
        </Grid>

        <Grid item md={2}>
          <BaseButton content={"Export Data"} />
        </Grid>
      </Grid>
      <Box className={classes.table}>
        <TableContent
          tableHeader={cameraStatusData}
          pagination={{
            page: pagination.page,
            rowPerPage: pagination.rowPerPage,
            length: cameraList ? cameraList.length : 0,
          }}
          tableData={cameraDataShow.data}
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

export default StatusCameraListModal;
