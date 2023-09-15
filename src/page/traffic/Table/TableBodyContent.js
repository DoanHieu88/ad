import {
  Box,
  Checkbox,
  CircularProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useContext } from "react";
import { TableCommonContext } from "./TableContent";

const TableBodyContent = () => {
  const {
    isLoading,
    tableHeader,
    tableData,
    checkedItems,
    handleCheckData,
    handleClickColumns,
    checkedAble,
  } = useContext(TableCommonContext);
  const classes = useTableBodyStyle();
  const handleCheckItem = (event) => {
    const val = JSON.parse(event.target.value);

    if (event.target.checked) {
      handleCheckData([...checkedItems, val]);
    } else {
      handleCheckData([...checkedItems].filter((item) => item.id !== val.id));
    }
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length !== 0;
  };

  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeader.length + 1}>
            <Box
              style={{ display: "flex", justifyContent: "center", padding: 20 }}
            >
              <CircularProgress color="secondary" />
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!tableData || tableData.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={tableHeader.length + 1}>
            <Typography
              style={{ textAlign: "center", padding: 20, fontSize: 21 }}
            >
              No Data
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {tableData.map((dataBody) => {
        const isChecked = !!checkedItems.find(
          (item) => item.id === dataBody.id
        );
        return (
          <TableRow
            key={dataBody.id}
            style={{ backgroundColor: isChecked ? "#f6f4f5" : "transparent" }}
            className={classes.rowTrafficItem}
          >
            {checkedAble && (
              <TableCell className={classes.tableCellCustom}>
                <Checkbox
                  value={JSON.stringify(dataBody)}
                  checked={isChecked}
                  onChange={handleCheckItem}
                  className={`${classes.checkBoxed} ${
                    isChecked && classes.checked
                  }`}
                />
              </TableCell>
            )}
            {tableHeader.map((head) => {
              const { field, component, customStyles, width } = head;
              return (
                <TableCell
                  key={field}
                  style={{
                    ...customStyles,
                    width,
                    cursor: handleClickColumns ? "pointer" : "auto",
                  }}
                  className={classes.tableCellCustom}
                  onClick={() => {
                    if (handleClickColumns) {
                      handleClickColumns(dataBody);
                    }
                  }}
                >
                  {isEmptyObject(dataBody) && component ? (
                    component(dataBody)
                  ) : (
                    <Typography className={classes.text} style={{height: 24}}>
                      {dataBody[field]}
                    </Typography>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const useTableBodyStyle = makeStyles({
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  rowTrafficItem: { "&:hover": { backgroundColor: "#f6f4f5 !important" } },
  tableCellCustom: { padding: "12px 24px" },
  checkBoxed: {
    padding: 0,
    "& svg": { color: "#b3b3b3" },
  },
  checked: {
    "& svg": { color: "#dd3d4b !important" },
  },
});

export default TableBodyContent;
