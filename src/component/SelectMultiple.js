import React, { useCallback, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { OpenDropIcon } from "../common/icons/OpenDropIcon";
import { DropdownIcon } from "../common/icons/DropdownIcon";
import { SearchIcon } from "../common/icons/SearchIcon";
import CloseIcon from "@material-ui/icons/Close";
import { lowerCaseStringCustom } from "../utils/traffic";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  btnDropdown: {
    position: "absolute",
    padding: "0 16px 0 24px",
    borderRadius: "4px",
    width: "100%",
    height: "48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "none",
    cursor: "pointer",
    color: "#000000",
    fontWeight: 500,
    border: "1px solid #d3d3d3",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "16px",
      fontWeight: "normal",
      textOverflow: "ellipsis",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
    },
  },
  dropdown: {
    position: "absolute",
    top: "58px",
    right: 0,
    zIndex: 50,
    width: "360px",
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  listItem: {
    padding: "8px 12px 8px 16px",
    color: "#000000",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "16px",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#f6f4f5",
    },
  },
  isChecked: { backgroundColor: "#f6f4f5", "& p": { fontWeight: 600 } },
  checkBoxed: {
    padding: 0,
    "& svg": { color: "#b3b3b3" },
  },
  checked: {
    "& svg": { color: "#dd3d4b !important" },
  },
  menu: {
    /* width */
    "&::-webkit-scrollbar": {
      width: "5px",
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "10px",
    },

    /* Handle on hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
}));

export default function SelectMultiple({
  width,
  btnText,
  titleDropdownText,
  list,
  handleCheckData,
  positionDropDown = "left",
  placeholderContent,
}) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [listFilter, setListFilter] = useState(list);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const handleCheck = useCallback(
    (arr) => {
      if (handleCheckData) {
        handleCheckData(arr);
      }
    },
    [handleCheckData]
  );

  const handleCheckAll = (event) => {
    if (event.target.checked) {
      let itemsArr = [...selected];
      list.forEach((item) => {
        if (!selected.includes(String(item.value))) {
          itemsArr.push(String(item.value));
        }
      });

      setSelected(itemsArr);
      handleCheck(itemsArr);
    } else {
      setSelected([]);
      handleCheck([]);
    }
  };

  const handleCheckItem = (event) => {
    let itemsArr = [...selected];
    if (event.target.checked) {
      itemsArr.push(event.target.value);
    } else {
      itemsArr = [...itemsArr].filter((item) => item !== event.target.value);
    }
    setSelected(itemsArr);
    handleCheck(itemsArr);
  };

  const handleChangeKeyword = (event) => {
    if (event.target.value.length < 255) {
      setTextSearch(event.target.value);

      setListFilter(
        [...list].filter((item) => item.label.includes(event.target.value))
      );
    }
  };

  const handleResetTextSearch = () => {
    setListFilter(list);
    setTextSearch("");
  };

  const valueBtn = useMemo(() => {
    if (
      selected.length === listFilter.length ||
      (isOpen && selected.length === 0)
    ) {
      return lowerCaseStringCustom(0, btnText);
    }

    if (selected.length === 1) {
      return listFilter[0].label;
    }

    if (selected.length) return lowerCaseStringCustom(selected.length, btnText);

    return btnText;
  }, [btnText, selected, listFilter, isOpen]);

  return (
    <Box style={{ width: width || "auto" }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <Button
            type="button"
            onClick={handleClick}
            variant="outlined"
            className={classes.btnDropdown}
            endIcon={
              isOpen ? (
                <OpenDropIcon color="#939393" />
              ) : (
                <DropdownIcon color="#939393" />
              )
            }
          >
            <Typography>{valueBtn}</Typography>
          </Button>
          {isOpen ? (
            <Box className={classes.dropdown} style={{ [positionDropDown]: 0 }}>
              <TextField
                id="input-with-icon-textfield"
                placeholder={placeholderContent}
                variant="outlined"
                name="keyword"
                className={classes.input}
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
                          style={{ cursor: "pointer" }}
                          onClick={handleResetTextSearch}
                        >
                          <CloseIcon color="#939393" />
                        </Box>
                      </InputAdornment>
                    ) : null,
                }}
              />
              <Box
                style={{
                  marginTop: "12px",
                  height: list.length > 5 && "200px",
                  overflowY: list.length > 5 && "scroll",
                }}
                className={classes.menu}
              >
                {titleDropdownText && listFilter.length > 0 && (
                  <label className={classes.listItem}>
                    <Typography>{titleDropdownText}</Typography>
                    <Checkbox
                      onChange={handleCheckAll}
                      className={`${classes.checkBoxed} ${
                        listFilter &&
                        selected.length === listFilter.length &&
                        classes.checked
                      }`}
                      checked={
                        listFilter && selected.length === listFilter.length
                      }
                      style={{ padding: 0 }}
                    />
                  </label>
                )}
                {listFilter.map((item) => {
                  const isChecked = selected.includes(String(item.value));
                  return (
                    <label
                      key={item.value}
                      className={`${classes.listItem} ${
                        isChecked && classes.isChecked
                      }`}
                    >
                      <Typography
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                          overflow: "hidden",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Checkbox
                        id={String(item.value)}
                        value={String(item.value)}
                        onChange={handleCheckItem}
                        checked={isChecked}
                        className={`${classes.checkBoxed} ${
                          isChecked && classes.checked
                        }`}
                      />
                    </label>
                  );
                })}
              </Box>
            </Box>
          ) : null}
        </div>
      </ClickAwayListener>
    </Box>
  );
}
