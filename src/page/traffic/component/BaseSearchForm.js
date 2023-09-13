import { Box, InputAdornment, TextField } from "@material-ui/core";
import { SearchIcon } from "../../../common/icons/SearchIcon";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { RecordingCameraContext } from "../../recordingCamera";

const BaseSearchForm = ({ placeholder, haveOwnMaxLength }) => {
  const [textSearch, setTextSearch] = useState("");
  const { handleSearch } = useContext(RecordingCameraContext);
  const methods = useFormContext();
  const {} = methods;

  const handleChangeKeyword = (e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      setTextSearch("");
      return;
    }
    const maxLength = haveOwnMaxLength ? haveOwnMaxLength : 20;

    if (value.length <= maxLength) setTextSearch(value.replace(/ {2,}/g, " "));
  };
  const handleResetTextSearch = () => {
    setTextSearch("");
  };
  return (
    <form onSubmit={methods.handleSubmit(handleSearch)}>
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
              <SearchIcon
                width={20}
                height={20}
                color="#939393"
                type="onSubmit"
              />
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
    </form>
  );
};

export default BaseSearchForm;
