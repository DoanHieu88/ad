import React, {
  memo,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { Box, Typography } from "@material-ui/core";
import { ScreenTask } from ".";
import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
// import "./styles.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const cols = 10;
const aspectRatio = 16 / 9;
const ContentLiveView = memo((props) => {
  const { taskLive, isFullScreen, isSideBar, setTaskLive } = props;
  const refContentLiveView = useRef(null);
  const [heightScreen, setHeightScreen] = useState(220);
  const [screenRecording, setScreenRecording] = useState("");
  const [lastColUse, setLastColUse] = useState(1);
  const [widthItem, setWidthItem] = useState(1);
  const [newUpdateGrid, setNewUpdateGrid] = useState([]);

  useEffect(() => setScreenRecording(""), [taskLive]);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (isFullScreen) {
        setHeightScreen(
          (refContentLiveView.current.offsetHeight - (taskLive.size - 1) * 8) /
            taskLive.size
        );
      } else {
        const itemWidth = refContentLiveView.current.offsetWidth / lastColUse; // Chiều rộng của mỗi item
        const itemHeight = itemWidth / aspectRatio;
        setHeightScreen(itemHeight);
        setWidthItem(itemWidth);
      }
    };

    window.addEventListener("resize", updateSize);
    taskLive.size !== 0 && updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [taskLive.size, isFullScreen, isSideBar, lastColUse]);

  const onLayoutChange = (currentLayout, prevLayout) => {
    //update auto change w or h when one of two changes
    let newUpdateGrid = prevLayout.map((it1) => {
      const gridIdx = currentLayout.findIndex((it) => it.i === it1.i);
      if (gridIdx === -1) return { ...it1 };
      const tempNewGrid = { ...currentLayout[gridIdx] };

      // update when change size x or y will change both of them
      if (it1.w !== tempNewGrid.w) {
        tempNewGrid.h = tempNewGrid.w;
      } else if (it1.h !== tempNewGrid.h) {
        tempNewGrid.w = tempNewGrid.h;
      }
      // reset when resize over 100
      if (getTotal(currentLayout, gridIdx, tempNewGrid) > 100) {
        if (it1.w !== tempNewGrid.w || it1.h !== tempNewGrid.h) {
          return { ...it1 };
        }
      }
      return { ...it1, ...tempNewGrid };
    });

    // find last location y of item if it over 10 => plus x, update grid
    let lastX = getLastLocation("x", "w", newUpdateGrid);
    const lastY = getLastLocation("y", "h", newUpdateGrid);
    if (lastY >= 11 && lastX < 10) lastX = lastX + 1;
    if (lastX >= 11) lastX = cols;

    const itemsAboveY10 = newUpdateGrid.filter((item) => item.y >= 10);

    const grid = Array.from({ length: cols }, () => Array(cols).fill(0));
    newUpdateGrid.forEach((item) => {
      for (let i = item.x; i < item.x + item.w; i++) {
        for (let j = item.y; j < item.y + item.h; j++) {
          grid[i][j] = 1;
        }
      }
    });

    const emptyPositions = [];
    //find list position don't have item
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 0) {
          emptyPositions.push({ x: i, y: j });
        }
      }
    }

    if (itemsAboveY10.length > 0 && emptyPositions.length > 0) {
      const newUpdateGridCopy = [...newUpdateGrid];
      itemsAboveY10.forEach((item) => {
        if (emptyPositions.length > 0) {
          //get a position
          const emptyPosition = emptyPositions.shift();
          const itemIndex = newUpdateGridCopy.findIndex((i) => i.i === item.i);
          //update new position
          if (itemIndex !== -1) {
            newUpdateGridCopy[itemIndex].x = emptyPosition.x;
            newUpdateGridCopy[itemIndex].y = emptyPosition.y;
          }
        }
      });
      handleUpdateGrid(lastX, [...newUpdateGridCopy]);
    }
    handleUpdateGrid(lastX, [...newUpdateGrid]);
  };

  const handleUpdateGrid = (lastX, arrUpdate) => {
    setLastColUse(lastX);
    setNewUpdateGrid([...arrUpdate]);
    return;
  };

  useEffect(() => {
    setTaskLive((prev) => ({ ...prev, grid: [...newUpdateGrid] }));
  }, [newUpdateGrid]);

  const getLastLocation = (type, size, arr) => {
    if (!type || !size || !arr || !arr.length) return 1;
    // find max of x or y
    const max = Math.max(...arr.map((item) => item[type] + item[size]));
    let lastUsedPosition = 0;
    for (let i = max; i >= 0; i--) {
      if (arr.some((item) => item[type] <= i && item[type] + item[size] > i)) {
        lastUsedPosition = i;
        break;
      }
    }
    return lastUsedPosition + 1;
  };

  const getTotal = (arr, index, newDataIdx) => {
    if (!arr) return 1;
    let totalArea = 0;
    const tempArr = [...arr];
    if (index && newDataIdx) tempArr[index] = newDataIdx;
    for (let i = 0; i < tempArr.length; i++) {
      totalArea += tempArr[i].w * tempArr[i].h;
    }
    return totalArea;
  };

  const handleDelete = (id) => {
    if (!id) return;
    setTaskLive((prev) => {
      return {
        ...prev,
        grid: [...prev.grid].filter((it) => it.i !== id),
      };
    });
  };

  const onDrop = (value, pay) => {
    if (value.length > 100) return;
    const randomKey = Math.random() * 10;
    setTaskLive((prev) => ({
      ...prev,
      grid: [
        ...prev.grid,
        {
          ...pay,
          merge: [],
          screenDetail: [],
          key: randomKey,
          i: String(randomKey),
          y: pay.y - 1 >= 0 ? pay.y - 1 : 0,
        },
      ],
    }));
  };

  return (
    <Box
      component={"main"}
      style={{
        display: "flex",
        height: isFullScreen ? "100vh" : "auto",
        width: "100%",
        overflowX: "scroll",
      }}
      ref={refContentLiveView}
    >
      <GridLayout
        className="layout"
        layout={taskLive.grid}
        rowHeight={heightScreen}
        cols={cols}
        maxRows={cols}
        width={cols * widthItem}
        onLayoutChange={(layout) => {
          onLayoutChange(layout, taskLive.grid || []);
        }}
        isResizable={taskLive.grid.length < 100}
        isDraggable={true}
        isDroppable={
          taskLive.grid.length >= 100 || getTotal(taskLive.grid) >= 100
            ? false
            : true
        }
        // onResizeStop={handleResize}
        resizeHandles={["se"]}
        // onResizeStart={handleResize}
        // droppingItem={{ h: 1, w: 1 }}
        onDrop={onDrop}
      >
        {taskLive.grid.map((gridItem) => {
          // if (gridItem.merge.length) {
          //   return (
          //     <Box
          //       key={gridItem.key}
          //       // style={{
          //       //   gridColumnStart: gridItem.y,
          //       //   gridColumnEnd: gridItem.y + gridItem.size,
          //       //   gridRowStart: gridItem.x,
          //       //   gridRowEnd: gridItem.x + gridItem.size,
          //       // }}
          //     >
          //       <ScreenTask
          //         screenDetail={gridItem}
          //         isSideBar={isSideBar}
          //         screenRecording={screenRecording}
          //         setScreenRecording={setScreenRecording}
          //       />
          //     </Box>
          //   );
          // }

          return (
            <Box
              key={gridItem.i}
              style={{ width: `${widthItem}px !important`, background: "gray" }}
              // dataGrid={{ ...gridItem }}
            >
              {/* <ScreenTask
                screenDetail={gridItem}
                isSideBar={isSideBar}
                screenRecording={screenRecording}
                setScreenRecording={setScreenRecording}
              /> */}
              {gridItem.i}
              <Typography
                style={{
                  width: "100%",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleDelete(gridItem.i);
                }}
              >
                X
              </Typography>
            </Box>
          );
        })}
      </GridLayout>
    </Box>
  );
});

const Content = (props) => {
  const { isFullScreen } = props;

  return (
    <React.Fragment>
      <Box
        style={{
          width: "-webkit-fill-available",
          background: "#f9fafc",
          position: isFullScreen ? "absolute" : "unset",
          inset: 0,
        }}
      >
        <ContentLiveView {...props} />
      </Box>
    </React.Fragment>
  );
};

export default React.memo(Content);
