import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { dataHead, typeState } from "../@type";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import Accessibility from "@material-ui/icons/Accessibility";
import { useContext } from "react";
import RecordingCamera, { RecordingCameraContext } from "..";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tHead: {
    height: 60,
    borderRadius: 4,
    backgroundColor: "#ebebeb",

    "& .MuiTableCell-head": {
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  boxState: {
    width: "auto",
    padding: "4px 9px 3px 8px",
    borderRadius: "4px",
    marginRight: "4px",
  },
  Cell: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Icon: {
    marginRight: 15,
    color: "#939393",
    cursor: "pointer",
  },
});

export default function TabTable({ data }) {
  const { setIsOpenCameraModal, setIsOpenEditModal, setIsOpenStatusCameraModal } = useContext(
    RecordingCameraContext
  );
  const classes = useStyles();
  const [optionPage, setOptionPage] = useState({
    page: 1,
    size: 10,
    total: data.length,
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tHead}>
          <TableRow>
            {dataHead.map((item, index) => (
              <TableCell align="left" key={index}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(
              (optionPage.page - 1) * optionPage.size,
              optionPage.page * optionPage.size
            )
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" size="small" align="left">
                  {row.id}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align="left"
                  size="medium"
                  // padding="none"
                >
                  {row.name}
                </TableCell>
                <TableCell align="left" size="small">
                  <Box className={classes.Cell}>
                    <Box
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: typeState[row.state].color,
                        marginRight: 8,
                      }}
                    ></Box>
                    <Typography
                      style={{
                        width: 55,
                      }}
                    >
                      {row.state}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">{row.camera}</TableCell>
                <TableCell align="left">
                  <Box className={classes.Cell}>
                    <Box
                      className={classes.boxState}
                      style={{
                        background: typeState["On"].color,
                        color: "#fff",
                      }}
                    >
                      {row.on}
                    </Box>
                    <Box
                      className={classes.boxState}
                      style={{
                        background: typeState["Error"].color,
                        color: "#fff",
                      }}
                    >
                      {row.error}
                    </Box>
                    <Box
                      className={classes.boxState}
                      style={{ background: typeState["Off"].color }}
                    >
                      {row.off}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="left">{row.errorMes}</TableCell>
                <TableCell align="left" style={{ width: 100 }}>
                  <Box className={classes.Cell}>
                    <FileCopyIcon
                      onClick={() => handleCopy(row.errorMes || "")}
                      className={classes.Icon}
                    />
                    <InfoIcon
                      className={classes.Icon}
                      onClick={() => setIsOpenCameraModal(true)}
                    />
                    <EditIcon
                      className={classes.Icon}
                      onClick={() => setIsOpenEditModal(true)}
                    />
                    {/* <Accessibility
                      className={classes.Icon}
                      onClick={() => setIsOpenStatusCameraModal(true)}
                    /> */}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
