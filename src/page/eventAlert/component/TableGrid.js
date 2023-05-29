import React from "react";
import { styled } from "@mui/material/styles";
import { Checkbox, Box, Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UsePagination from "./UsePagination";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c9c9c9",
    color: "#444444",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableGrid = React.memo(() => {
  function createData(
    DateTime,
    Event,
    Camera,
    Site,
    EventType,
    EventObject,
    EventInfor,
    Operation
  ) {
    return {
      DateTime,
      Event,
      Camera,
      Site,
      EventType,
      EventObject,
      EventInfor,
      Operation,
    };
  }

  const rows = [
    createData(
      "2023/04/07-14:54",
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure%E1%BB%9FDubai.webp",
      6.0,
      24,
      4.0
    ),
    createData("2023/04/07-14:54", 237, 9.0, 37, 4.3),
    createData("2023/04/07-14:54", 262, 16.0, 24, 6.0),
    createData("2023/04/07-14:54", 305, 3.7, 67, 4.3),
    createData("2023/04/07-14:54", 356, 16.0, 49, 3.9),
  ];

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Checkbox />
            </StyledTableCell>
            <StyledTableCell align="center">Date-Time</StyledTableCell>
            <StyledTableCell align="center">Event Capture</StyledTableCell>
            <StyledTableCell align="center">Camera</StyledTableCell>
            <StyledTableCell align="center">Site</StyledTableCell>
            <StyledTableCell align="center">Event Type</StyledTableCell>
            <StyledTableCell align="center">Event Object</StyledTableCell>
            <StyledTableCell align="center">Event Information</StyledTableCell>
            <StyledTableCell align="center">Operation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <Checkbox />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {row.DateTime}
              </StyledTableCell>
              <StyledTableCell align="center">
                <img src={row.Event} width={120} />
              </StyledTableCell>
              <StyledTableCell align="center">{row.Camera}</StyledTableCell>
              <StyledTableCell align="center">{row.Site}</StyledTableCell>
              <StyledTableCell align="center">{row.EventType}</StyledTableCell>
              <StyledTableCell align="center">
                {row.EventObject}
              </StyledTableCell>
              <StyledTableCell align="center">{row.EventInfor}</StyledTableCell>
              <StyledTableCell align="center">{row.Operation}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        style={{
          paddingRight: 40,
          paddingBlock: 20,
        }}
        className="flex-between"
      >
        <Box style={{ paddingLeft: 40 }}>
          <Typography>Show:</Typography>
        </Box>
        <UsePagination
          count={10}
          page={page}
          setPage={setPage}
          rowsPerPage={3}
        />
      </Box>
    </TableContainer>
  );
});
export default TableGrid;
