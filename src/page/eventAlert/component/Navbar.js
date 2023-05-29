import React from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Navbar = React.memo(() => {
  return (
    <Box
      className="flex-between"
      style={{ borderBottom: "2px solid #f4f4f4", paddingBlock: "20px 10px" }}
    >
      <Box style={{ width: 360, paddingLeft: 10 }}>
        <TextField
          fullWidth
          variant="outlined"
          style={{ background: "#fff" }}
          size="small"
          placeholder="Search by name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize={"small"} style={{ color: "#d55067" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="flex-between" style={{ width: "55%" }}>
        <Grid
          container
          spacing={1}
          className="flex-center"
          style={{ flexWrap: "nowrap" }}
        >
          <Grid item>
            <Typography>Date Range: </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              style={{ background: "#fff" }}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} className="flex-center">
          <Grid item>
            <Typography>Date Range: </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              style={{ background: "#fff" }}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} className="flex-center">
          <Grid item>
            <Typography>Date Range: </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              style={{ background: "#fff" }}
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default Navbar;
