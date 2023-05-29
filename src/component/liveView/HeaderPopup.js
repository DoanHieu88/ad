import { Box, InputAdornment, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { renderData } from "./SideBar";

const useStyles = makeStyles({
  container: {
    boxShadow: "0 0 10px 0 rgba(0,0,0,0,1)",
    fontSize: 14,
    borderRadius: "4px",
    padding: 16,
    background: "#fff",
    color: "#333",
    position: "absolute",
    zIndex: 1,
  },
  itemGroupSearch: {
    borderRadius: "4px ",
    paddingRight: "10px",
    "&.MuiListItem-button:hover": {
      "&:hover": {
        background: "#f6f4f5",
      },
    },
  },
  isSub: {
    "& .MuiTreeItem-content": {
      height: 50,
      flexDirection: "row",
      borderBottom: "none",
      "& .MuiTreeItem-label": {
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#fff",
      },
    },
  },
  root: {
    "& .MuiTreeItem-label": {
      backgroundColor: "#fff !important",
    },
    "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label ": {
      backgroundColor: "#fff !important",
    },
  },
});

const HeaderPopup = React.memo(({ listData, textSearch }) => {
  const classes = useStyles();
  const [valueSearch, setValueSearch] = useState("");

  return (
    <Box className={classes.container}>
      <Box style={{ marginBottom: "10px" }}>
        <Typography style={{ paddingBottom: 10 }}>
          Owner Organization
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          style={{ background: "#fff" }}
          size="small"
          placeholder={textSearch}
          value={valueSearch}
          inputProps={{ maxLength: 50 }}
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize={"small"} style={{ color: "#939393" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {listData && listData.length && (
        <Box
          style={{
            maxHeight: "300px",
            overflow: "auto",
            paddingRight: "16px",
            marginRight: "-10px",
          }}
          className={classes.root}
        >
          {renderData(listData, classes, null, true)}
        </Box>
      )}
    </Box>
  );
});

export default React.memo(HeaderPopup);
