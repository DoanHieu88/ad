import React, { useState } from "react";
import { Box, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { SearchIcon } from "../../../../common/icons/SearchIcon";

const SEARCH_LENGTH = 255;

const SearchTab = () => {
  const classes = useStyles();
  const [textSearch, setTextSearch] = useState("");

  const handleChangeKeyword = (event) => {
    if (event.target.value.length < SEARCH_LENGTH) {
      setTextSearch(event.target.value);
    }
  };

  const handleResetTextSearch = () => {
    setTextSearch("");
  };

  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder="Search by Group name, Camera name  "
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
            <SearchIcon width={20} height={20} color="#EC1B2E" />
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
  );
};

const useStyles = makeStyles({
  input: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#939393",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#939393",
      borderWidth: "1px",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#939393",
    },
  },
});

export default SearchTab;
