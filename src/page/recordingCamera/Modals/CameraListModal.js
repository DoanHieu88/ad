import { Box, Grid, makeStyles } from "@material-ui/core";
import { cameraStorageData, serverArr } from "../../../utils/traffic";
import { useFormContext } from "react-hook-form";
import BaseSearchForm from "../../traffic/component/BaseSearchForm";
import BaseButton from "../../traffic/component/BaseButton";
import SelectMultiple from "../../../component/SelectMultiple";
import TableContent from "../../traffic/Table/TableContent";
import { useContext, useMemo } from "react";
import { RecordingCameraContext } from "..";

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
  } = useContext(RecordingCameraContext);

  const newCamera = useMemo(() => {
    if (cameraList.length < 9) {
      const emptyItemLength = 9 - cameraList.length;
      const emptyItemArray = Array.from(
        { length: emptyItemLength },
        () => ({})
      );
      return [{ ...cameraList, ...emptyItemArray }];
    } else {
      return cameraList;
    }
  }, [cameraList]);
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
        {serverArr.map((item) => {
          return (
            <Grid key={item.key} item xs={2}>
              <SelectMultiple
                placeholderContent={item.placeholderContent}
                list={item.list}
                btnText={item.btnText}
              />
            </Grid>
          );
        })}
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

export default CameraListModal;
