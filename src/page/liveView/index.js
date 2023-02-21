import React, { memo, useState, useCallback, useEffect } from "react";
import { Box } from "@material-ui/core";
import {
  Content,
  HeaderLiveView,
  NavBar,
  SideBar,
} from "../../component/liveView";

const LiveView = memo(() => {
  const [planLiveDetail, setPlanLiveDetail] = useState({
    id: "string",
    idOrganization: "string123sad",
    name: "Name Task",
    type: "SCHEDULE",
    apply: "true",
    userId: "string user id",
    active: true,
    description: "",
    idTaskRemain: "string",
    planVideoDetails: [
      {
        idTask: "id Task 1",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "SHARE",
      },
      {
        idTask: "id Task 2",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "PERSON",
      },
      {
        idTask: "id Task 3",
        startTime: { h: 10, m: 0, s: 0 },
        endTime: { h: 12, m: 0, s: 0 },
        stayTime: { h: 0, m: 1, s: 0 },
        no: 1,
        type: "PERSON",
      },
    ],
    createDate: new Date(),
    lastModified: new Date(),
  });

  const [taskLive, setTaskLive] = useState({
    id: "id Task 3",
    size: 3,
    name: "Name Task",
    active: true,
    groupId: "a57w4867s5ad75sa76as4d",
    userId: "2654s7awd654214e65wa4d",
    no: 3,
    grid: []
      .concat(
        ...Array.from({ length: 3 }, (_, x) => {
          return Array.from({ length: 3 }, (_, y) => {
            return {
              x: x + 1,
              y: y + 1,
              size: 1,
              merge: [],
              screenDetail: [],
            };
          });
        })
      )
      .map((wall, index) => ({ ...wall, key: index + 1 })),
    lastModified: new Date(),
    createDate: new Date(),
  });

  const [isSideBar, setIsSideBar] = useState(false);
  const [typeDisplaySide, setTypeDisplaySide] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const escFunction = useCallback(
    (event) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    },
    [isFullScreen]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => document.removeEventListener("keydown", escFunction, false);
  }, [escFunction]);

  const handleOpenSideBar = (type) => {
    setIsSideBar((prev) => {
      if (typeDisplaySide === type) {
        setTypeDisplaySide("");
        return !prev;
      } else {
        setTypeDisplaySide(type);
        return true;
      }
    });
  };

  return (
    <React.Fragment>
      <Box>
        <HeaderLiveView setIsFullScreen={() => setIsFullScreen(true)} />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBlock: 24,
            minHeight: "808px",
          }}
        >
          <Content
            taskLive={taskLive}
            isFullScreen={isFullScreen}
            isSideBar={isSideBar}
          />
          <Box style={{ display: "flex", marginLeft: "16px" }}>
            <NavBar
              handleOpenSideBar={handleOpenSideBar}
              typeDisplaySide={typeDisplaySide}
            />
            {isSideBar && <SideBar />}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
});

export default LiveView;
