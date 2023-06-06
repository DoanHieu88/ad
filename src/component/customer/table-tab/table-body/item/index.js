import React, { useCallback, useContext, useState } from "react";

import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from "@material-ui/core";

import { EditIcon } from "../../../../../common/icons/EditIcon";
import { DeleteIcon } from "../../../../../common/icons/DeleteIcon";
import { DropdownIcon } from "../../../../../common/icons/DropdownIcon";
import { ExpandMoreIcon } from "../../../../../common/icons/ExpandMoreIcon";
import { InfoDetailIcon } from "../../../../../common/icons/InfoDetailIcon";

import { GroupContext } from "../../../../../page/mangament/Customer/Customer";

export const CustomerItemContent = ({ groupTreeList, parentId }) => {
  const {
    checkedGroup,
    setCheckedGroup,
    selectedColumns,
    setOpenEditGroupModal,
    setGroupDetail,
  } = useContext(GroupContext);

  const [state, setState] = useState({ [parentId]: true });

  const handleClick = (item) => {
    const newstate = { ...state, [item]: !state[item] };
    setState(newstate);
  };

  const handleCommonCheckParent = (id, arr) => {
    let idParentChecked = groupTreeList[id].data.parentId;

    if (
      idParentChecked !== "1234" &&
      idParentChecked !== "root" &&
      idParentChecked !== ""
    ) {
      let count = 0;

      for (let i = 0; i < groupTreeList[idParentChecked].children.length; i++) {
        if (arr.includes(groupTreeList[idParentChecked].children[i])) {
          count += 1;
        }
      }

      if (count === groupTreeList[idParentChecked].children.length) {
        arr.push(idParentChecked);
        setCheckedGroup(arr);
      }

      handleCommonCheckParent(idParentChecked, arr);
    }
  };

  const handleCommonCheckChild = (arr, id) => {
    let childChecked = groupTreeList[id].children;

    for (let i = 0; i < childChecked.length; i++) {
      arr.push(childChecked[i]);
      setCheckedGroup(arr);

      handleCommonCheckChild(arr, childChecked[i]);
    }
  };

  const handleCommonCheck = (groupTreeList, id) => {
    let arrNew = [...checkedGroup];
    let childChecked = groupTreeList[id].children;

    arrNew.push(id);
    handleCommonCheckParent(id, arrNew);

    if (childChecked.length > 0) {
      handleCommonCheckChild(arrNew, id);
    }
    setCheckedGroup(arrNew);
  };

  const handleCommonUnCheckParent = (id) => {
    if (id !== parentId && id !== "") {
      const idParentChecked = groupTreeList[id].data.parentId;

      setCheckedGroup((prev) =>
        prev.filter((child) => child !== id && child !== idParentChecked)
      );

      handleCommonUnCheckParent(idParentChecked);
    }
  };

  const handleCommonUncheck = (groupTreeList, id) => {
    handleCommonUnCheckParent(id);

    if (groupTreeList[id].children.length > 0) {
      for (let i = 0; i < groupTreeList[id].children.length; i++) {
        handleCommonUncheck(groupTreeList, groupTreeList[id].children[i]);
      }
    }
  };

  const handleCheckAllParent = (id, isChecked) => {
    if (isChecked) {
      handleCommonCheck(groupTreeList, id);
    } else {
      handleCommonUncheck(groupTreeList, id);
    }
  };

  const handleChangeCheckbox = (event) => {
    handleCheckAllParent(event.target.value, event.target.checked);
  };

  const treeTable = useCallback(
    (contentTable, collapseId) => {
      return contentTable[collapseId].children.map((task) => {
        return (
          <React.Fragment key={task}>
            <TableRow hover>
              <TableCell style={{ padding: 0 }}>
                <Collapse
                  key={collapseId}
                  in={state[parentId] && state[collapseId]}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    gridGap="5px"
                  >
                    {contentTable[task].children.length > 0 ? (
                      <Box
                        component="div"
                        key={contentTable[task]}
                        onClick={() => handleClick(task)}
                        style={{ paddingTop: "3px", cursor: "pointer" }}
                      >
                        {state[task] ? <DropdownIcon /> : <ExpandMoreIcon />}
                      </Box>
                    ) : null}
                    <Checkbox
                      value={task}
                      checked={checkedGroup.includes(task)}
                      size="small"
                      onChange={handleChangeCheckbox}
                    />
                  </Box>
                </Collapse>
              </TableCell>
              {selectedColumns.map(({ key, format = (value) => value }) => (
                <TableCell style={{ padding: 0 }} key={key}>
                  <Collapse
                    key={collapseId}
                    in={state[parentId] && state[collapseId]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {contentTable[task].data[key]}
                  </Collapse>
                </TableCell>
              ))}
              <TableCell style={{ padding: 0 }}>
                <Collapse
                  key={collapseId}
                  in={state[parentId] && state[collapseId]}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box display="flex" alignItems="center" gridGap="10px">
                    <InfoDetailIcon />
                    <IconButton
                      onClick={() => {
                        setOpenEditGroupModal(true);
                        setGroupDetail(task[collapseId]);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <DeleteIcon color="#000" />
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
            {treeTable(contentTable, task)}
          </React.Fragment>
        );
      });
    },
    [state, selectedColumns, checkedGroup]
  );

  return <React.Fragment>{treeTable(groupTreeList, parentId)}</React.Fragment>;
};
