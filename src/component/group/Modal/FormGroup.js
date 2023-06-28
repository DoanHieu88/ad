import React, { useState } from "react";
import {
  Box,
  ClickAwayListener,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { GroupTypes } from "../../../until/type";
import DropdownCustom from "../DropdownCustom";
import { useStylesModalCreate } from "./ModalCreateGroup";
import PopperAddress from "../PopperAddress";
import { jsonAddress } from "../../../jsonAddress";
import _ from "lodash";
import { onSearchAddress, onSearchTypes } from "../../../until/common";

const FormGroup = React.memo(
  ({
    onChangeDataSubmit,
    onBlurGroupName,
    onBlurPhone,
    onBlurAddress,
    setTextSearch,
    provinceSelected,
    districtSelected,
    wardSelected,
    onBlurGroupType,
    dataSubmit,
    textSearch,
    onBlurEmail,
    messErr,
    onBlurAddressDetail,
    setWardSelected,
    setDistrictSelected,
    setProvinceSelected,
  }) => {
    const classes = useStylesModalCreate();
    const [openPopper, setOpenPopper] = useState(false);
    const [openGroupType, setOpenGroupType] = useState(false);
    const [isParentGroup, setIsParentGroup] = useState(false);
    const [typeGroup, setTypeGroup] = useState();

    const handleClick = () => {
      setOpenPopper((prev) => !prev);
    };

    const handleSelectTypeGroup = (value) => {
      setTypeGroup(value);
      setOpenGroupType(false);
      onChangeDataSubmit(Number(value.id), "type");
      onBlurGroupType(value.id);
    };

    const changeIdProvince = (province) => {
      setProvinceSelected(province);
      onChangeDataSubmit(province.Id, "provinceId");
      onChangeDataSubmit("", "districtId");
      setDistrictSelected(undefined);
    };

    const changeIdDistrict = (district) => {
      setDistrictSelected(district);
      onChangeDataSubmit(district.Id, "districtId");
      onChangeDataSubmit("", "wardId");
      setWardSelected(undefined);
    };

    const changeIdWard = (ward) => {
      setWardSelected(ward);
      onChangeDataSubmit(ward.Id, "wardId");
      onBlurAddress({ ...dataSubmit, wardId: ward.Id });
    };
    return (
      <React.Fragment>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              Group Name <span style={{ color: "red" }}>(*)</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) => {
                onBlurGroupName(e.target.value);
                onChangeDataSubmit(e.target.value, "name");
              }}
              onBlur={(e) => onBlurGroupName(e.target.value)}
              error={messErr.groupErr !== ""}
            />
            {messErr.groupErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.groupErr}
              </span>
            )}
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>Phone</Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) => {
                onBlurPhone(e.target.value);
                onChangeDataSubmit(e.target.value, "phone");
              }}
              onBlur={(e) => onBlurPhone(e.target.value)}
              error={messErr.phoneErr !== ""}
            />
            {messErr.phoneErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.phoneErr}
              </span>
            )}
          </Box>
        </Box>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              Address <span style={{ color: "red" }}>*</span>
            </Typography>
            <ClickAwayListener
              onClickAway={() => {
                if (openPopper) onBlurAddress(dataSubmit);
                setOpenPopper(false);
                setTextSearch("");
              }}
            >
              <Box style={{ position: "relative" }}>
                <button onClick={handleClick} className={classes.btnDropdown}>
                  <Typography>
                    {!(provinceSelected && districtSelected && wardSelected) ? (
                      "Province/City, District, Ward"
                    ) : (
                      <span>
                        {provinceSelected.Name} - {districtSelected.Name} -{" "}
                        {wardSelected.Name}
                      </span>
                    )}
                  </Typography>
                  <ArrowDropDownIcon
                    style={{ color: "#939393", fontSize: "30px" }}
                  />
                </button>
                {openPopper && (
                  <PopperAddress
                    listDistrict={
                      (provinceSelected
                        ? onSearchAddress(
                            provinceSelected.Districts,
                            textSearch
                          )
                        : []) || []
                    }
                    listWards={
                      (districtSelected
                        ? onSearchAddress(districtSelected.Wards, textSearch)
                        : []) || []
                    }
                    listCity={onSearchAddress(jsonAddress, textSearch)}
                    setProvinceSelected={changeIdProvince}
                    setDistrictSelected={changeIdDistrict}
                    provinceSelected={provinceSelected}
                    districtSelected={districtSelected}
                    wardSelected={wardSelected}
                    setWardSelected={changeIdWard}
                    setTextSearch={setTextSearch}
                    textSearch={textSearch}
                    handleClose={() => setOpenPopper(false)}
                    onChangeDataSubmit={onChangeDataSubmit}
                  />
                )}
              </Box>
            </ClickAwayListener>
            {messErr.addressErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.addressErr}
              </span>
            )}
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>Email</Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) => {
                onBlurEmail(e.target.value);
                onChangeDataSubmit(e.target.value, "email");
              }}
              onBlur={(e) => onBlurEmail(e.target.value)}
              error={messErr.emailErr !== ""}
            />
            {messErr.emailErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.emailErr}
              </span>
            )}
          </Box>
        </Box>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              Address Detail <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              style={{ width: 450 }}
              variant="outlined"
              size="small"
              onChange={(e) => {
                onBlurAddressDetail(e.target.value);
                onChangeDataSubmit(e.target.value, "addressDetail");
              }}
              onBlur={(e) => {
                onBlurAddressDetail(e.target.value);
              }}
              error={messErr.addressDetailErr !== ""}
            />
            {messErr.addressDetailErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.addressDetailErr}
              </span>
            )}
          </Box>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>
              Group Type <span style={{ color: "red" }}>*</span>
            </Typography>
            <ClickAwayListener
              onClickAway={() => {
                if (openGroupType) onBlurGroupType(dataSubmit.type);
                setOpenGroupType(false);
                setTextSearch("");
              }}
            >
              <Box style={{ position: "relative" }}>
                <button
                  onClick={() =>
                    setOpenGroupType((prev) => {
                      if (prev) onBlurGroupType(dataSubmit.type);
                      return !prev;
                    })
                  }
                  className={classes.btnDropdown}
                >
                  <Typography>
                    {typeGroup ? (
                      <span>{GroupTypes[typeGroup.id].label}</span>
                    ) : (
                      "Type Group"
                    )}
                  </Typography>
                  <ArrowDropDownIcon
                    style={{ color: "#939393", fontSize: "30px" }}
                  />
                </button>
                {openGroupType && (
                  <DropdownCustom
                    listData={onSearchTypes(
                      Object.values(GroupTypes),
                      textSearch
                    )}
                    setTypeSelected={handleSelectTypeGroup}
                    setTextSearch={setTextSearch}
                    typeSelected={typeGroup}
                    textSearch={textSearch}
                  />
                )}
              </Box>
            </ClickAwayListener>
            {messErr.typeGroupErr && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {messErr.typeGroupErr}
              </span>
            )}
          </Box>
        </Box>
        <Box className={classes.Row}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.labelInput}>Parent Group</Typography>
            <ClickAwayListener onClickAway={() => setIsParentGroup(false)}>
              <Box style={{ position: "relative" }}>
                <button
                  onClick={() => setIsParentGroup((prev) => !prev)}
                  className={classes.btnDropdown}
                >
                  <Typography>
                    {typeGroup ? (
                      <span>{GroupTypes[typeGroup.id].label}</span>
                    ) : (
                      "Type Group"
                    )}
                  </Typography>
                  <ArrowDropDownIcon
                    style={{ color: "#939393", fontSize: "30px" }}
                  />
                </button>
                {isParentGroup && (
                  <DropdownCustom
                    listData={onSearchTypes(
                      Object.values(GroupTypes),
                      textSearch
                    )}
                    setTypeSelected={setTypeGroup}
                    setTextSearch={setTextSearch}
                    typeSelected={typeGroup}
                    textSearch={textSearch}
                    textPlaceholder="Select Parent Group"
                  />
                )}
              </Box>
            </ClickAwayListener>
            <Typography className={classes.Description}>
              Skip if you create a level 1 group
            </Typography>
          </Box>
          {typeGroup && typeGroup.id === "20" && (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: 450,
              }}
            >
              <Typography className={classes.labelInput}>
                Camera Limited <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                className={classes.TextFieldCenter}
                variant="outlined"
                size="small"
                value={dataSubmit.cameraLimited}
                error={
                  typeGroup &&
                  typeGroup.id === "20" &&
                  !dataSubmit.cameraLimited
                }
                onChange={(e) => {
                  if (_.isInteger(Number(e.target.value))) {
                    onChangeDataSubmit(Number(e.target.value), "cameraLimited");
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </React.Fragment>
    );
  }
);

export default FormGroup;
