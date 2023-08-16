import React, { Fragment, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Box, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { SettingIcon } from "../Icons";
import SettingModal from "../Modals/SettingModal";
import { TrafficContext } from "../TrafficContent";
import {
  UnViolationPendingApproval,
  ViolationPendingApproval,
} from "./TabPaneFilter";
import NotificationShowing from "./TabPaneFilter/NotificationShowing";

import { QUERY_KEYS } from "../../../utils/keys";
import CustomModal from "../component/CustomModal";
import { SearchIcon } from "../../../common/icons/SearchIcon";
import { ReloadIcon } from "../../../common/icons/ReloadIcon";
import BaseButton from "../component/BaseButton";

const TableFilter = () => {
  const queryClient = useQueryClient();
  const classes = useTableFilterStyle();
  const { paramTrafficSearch } = useContext(TrafficContext);

  const [textSearch, setTextSearch] = useState("");
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const handleReloadDataTable = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TRAFFIC_LIST]);
  };

  const handleChangeKeyword = () => {};

  const handleResetTextSearch = () => {};

  return (
    <Box className={classes.root}>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Biển số xe"
        variant="outlined"
        name="keyword"
        value={textSearch}
        onChange={handleChangeKeyword}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon width={20} height={20} color="#939393" />
            </InputAdornment>
          ),
          endAdornment:
            textSearch.length > 0 ? (
              <InputAdornment position="end">
                <Box
                  component="div"
                  display="flex"
                  alignContent="center"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleResetTextSearch}
                >
                  <CloseIcon />
                </Box>
              </InputAdornment>
            ) : null,
        }}
      />
      {paramTrafficSearch.tabPane === "01" && (
        <Box style={{ display: "flex" }}>
          <UnViolationPendingApproval />
          <ViolationPendingApproval />
        </Box>
      )}
      {paramTrafficSearch.tabPane === "03" && <NotificationShowing />}
      <BaseButton
        content="Xuất danh sách"
        customStyle={{ minWidth: "150px" }}
      />
      <Box className={classes.icon} onClick={handleReloadDataTable}>
        <ReloadIcon width={24} height={24} color="#858585" />
      </Box>
      <Box className={classes.icon} onClick={() => setIsOpenSettingModal(true)}>
        <SettingIcon width={24} height={24} color="#858585" />
      </Box>
      {isOpenSettingModal && (
        <CustomModal
          isOpen={isOpenSettingModal}
          handleClose={() => setIsOpenSettingModal(false)}
          title="Thông tin tuỳ chỉnh"
        >
          <SettingModal />
        </CustomModal>
      )}
    </Box>
  );
};

const useTableFilterStyle = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    gap: "16px",
    "& .MuiInputBase-root": { height: "48px" },
  },
  content: {
    padding: "10px",
    display: "flex",
    gap: "20px",
    alignContent: "center",
  },
  searchContent: { flex: 1 },
  actionsContent: {
    display: "flex",
    gap: "16px",
    alignContent: "center",
  },
  icon: {
    minWidth: "48px",
    height: "48px",
    display: "flex",
    border: "1px solid #939393",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  btnDropdown: {
    background: "#fff",
    border: "1px solid #939393",
    height: "40px",
    borderRadius: "4px",
    textTransform: "unset",
    cursor: "pointer",
    boxShadow: "none",
    "& p": {
      fontSize: "16px",
      fontWeight: 500,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: "#939393",
    },
    "&:hover": { boxShadow: "none" },
  },
});

export default TableFilter;
