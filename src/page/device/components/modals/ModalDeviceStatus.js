import React, { useContext, useMemo } from "react";
import {
  Box,
  Dialog,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { DeviceContext } from "../DeviceProvider";
import { Status, headerDeviceStatus, tableData } from "../../utils";
import TableContent from "../../Table/TableContent";
const ModalDeviceStatus = () => {
  const classes = styles();
  const { state, dispatch, handleCloseModalDeviceStatus } =
    useContext(DeviceContext);

  const selectStatus = Status[state.chooseDevice.status];

  const handleChangePagination = (pag) => {
    dispatch({
      type: "PAGINATION_DEVICE_STATUS",
      paginationDeviceStatus: {
        page: pag.page,
        rowPerPage: pag.rowPerPage,
      },
    });
  };
  const dataListShow = useMemo(() => {
    if (!tableData) return [];
    const trafficData = tableData.map((trafficItem, index) => ({
      ...trafficItem,
      stt: index + 1,
    }));
    return {
      length: trafficData.length,
      data: trafficData.slice(
        state.paginationDeviceStatus.page *
          (state.paginationDeviceStatus.rowPerPage + 1),
        state.paginationDeviceStatus.page *
          (state.paginationDeviceStatus.rowPerPage + 1) +
          (state.paginationDeviceStatus.rowPerPage + 1)
      ),
    };
  }, [tableData, state.paginationDeviceStatus]);
  return (
    <Dialog
      open={state.openModal.openModalDeviceStatus}
      onClose={handleCloseModalDeviceStatus}
      aria-labelledby="draggable-dialog-title"
      className={classes.root}
    >
      <Box style={{ width: 900 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 0 10px 0",
          }}
        >
          <Typography
            style={{
              fontWeight: 700,
              fontSize: 18,
              flex: 1,
              textAlign: "center",
            }}
          >
            {state.chooseDevice.deviceName || ""}
          </Typography>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              flexDirection: "row",
            }}
          >
            <Typography style={{ margin: 0, fontWeight: 500 }}>
              380 Lac Long Quan
            </Typography>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontWeight: 500,
                fontSize: 16,
                marginTop: 5,
              }}
            >
              <selectStatus.component />
              <Typography style={{ margin: 0, fontWeight: 500 }}>
                {selectStatus.label}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider style={{ margin: "0 30px" }} />
        <Box style={{ padding: "10px 30px 19px 30px" }}>
          <TableContent
            colorHeader
            tableData={dataListShow.data}
            tableHeader={headerDeviceStatus}
            checkedItems={state.checkedItemList}
            pagination={{
              page: state.paginationDeviceStatus.page,
              rowPerPage: state.paginationDeviceStatus.rowPerPage,
              length: dataListShow.length,
            }}
            handleChangePagination={handleChangePagination}
            iconPagination={false}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

const styles = makeStyles({
  root: {
    userSelect: "none",
    "& .MuiDialog-paperWidthSm": {
      maxWidth: 900,
    },
  },
});

export default ModalDeviceStatus;
