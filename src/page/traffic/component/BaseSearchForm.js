import { Box, InputAdornment, TextField } from "@material-ui/core";
import { SearchIcon } from "../../../common/icons/SearchIcon";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";

const BaseSearchForm = ({ placeholder }) => {
  const [textSearch, setTextSearch] = useState("");
  const handleChangeKeyword = (e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      setTextSearch("");
      return;
    }
    const maxLength = 20;

    if (value.length <= maxLength) setTextSearch(value.replace(/ {2,}/g, " "));
  };
  const handleResetTextSearch = () => {
    setTextSearch("");
  };
  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder={placeholder}
      variant="outlined"
      name="keyword"
      fullWidth
      value={textSearch}
      onChange={handleChangeKeyword}
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
  );
};

export default BaseSearchForm;
