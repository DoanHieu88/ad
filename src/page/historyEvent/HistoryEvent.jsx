import { Box, Grid, Typography, styled } from "@material-ui/core";
import useHistoryListData from "../../hooks/api/useHistoryListData";
import React, { useMemo } from "react";
import FullNameIcon from "../../asset/icons/FullNameIcon";
import GenderIcon from "../../asset/icons/GenderIcon";
import AgeIcon from "../../asset/icons/AgeIcon";

const BoxItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const HistoryEvent = () => {
  const { data: historyList } = useHistoryListData();

  const historyDataByDate = useMemo(() => {
    return historyList?.events.reduce((acc, cur) => {
      const date = cur.lastModified;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(cur);

      return acc;
    }, {});
  }, [historyList]);

  return (
    <Box>
      {historyDataByDate &&
        Object.keys(historyDataByDate).map((history, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                gap: "15px",
              }}
              key={history}
            >
              <Box
                style={{
                  width: "500px",
                }}
              >
                {index % 2 === 0 &&
                  historyDataByDate[history].map((event) => {
                    const descriptionObj = JSON.parse(
                      event.stringDescription ?? "{}"
                    );

                    console.log({ descriptionObj });

                    return (
                      <Box
                        style={{
                          width: "100%",
                          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            padding: "16px 10px",
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            flex: 1,
                          }}
                        >
                          <img src="/human.png" alt="Human_Image" />
                          <Grid
                            container
                            style={{
                              flex: 1,
                            }}
                          >
                            <Grid item xs={6}>
                              <BoxItem>
                                <FullNameIcon />
                                <Typography>
                                  {event.fullName ?? "Unknown"}
                                </Typography>
                              </BoxItem>
                              <BoxItem>
                                <GenderIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].gender || "Unknown"}
                                </Typography>
                              </BoxItem>
                              <BoxItem>
                                <GenderIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].emotion ||
                                    "Unknown"}
                                </Typography>
                              </BoxItem>
                            </Grid>
                            <Grid item xs={6}>
                              <BoxItem>
                                <GenderIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].faceProb
                                    ? `${(
                                        descriptionObj.bboxes[0].faceProb * 100
                                      ).toFixed(2)} %`
                                    : "Unknown"}
                                </Typography>
                              </BoxItem>
                              <BoxItem>
                                <AgeIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].age || "Unknown"}
                                </Typography>
                              </BoxItem>
                            </Grid>
                          </Grid>
                        </Box>
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "15px solid transparent",
                            borderBottom: "15px solid transparent",
                            borderLeft: "15px solid #fff",
                            position: "absolute",
                            right: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </Box>
                    );
                  })}
              </Box>
              <Box
                style={{
                  width: "2px",
                  backgroundColor: "#939393",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 200,
                    backgroundColor: "#DD3D4B",
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translate(-50%)",
                  }}
                />
              </Box>
              <Box
                style={{
                  width: "500px",
                }}
              >
                {index % 2 !== 0 &&
                  historyDataByDate[history].map((event) => {
                    const descriptionObj = JSON.parse(
                      event.stringDescription ?? "{}"
                    );

                    return (
                      <Box
                        style={{
                          width: "100%",
                          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderTop: "15px solid transparent",
                            borderBottom: "15px solid transparent",
                            borderRight: "15px solid #fff",
                            position: "absolute",
                            left: "-15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        />
                        <Box
                          sx={{
                            padding: "16px 10px",
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            flex: 1,
                          }}
                        >
                          <img src="/human.png" alt="Human_Image" />
                          <Grid
                            container
                            style={{
                              flex: 1,
                            }}
                          >
                            <Grid item xs={6}>
                              <BoxItem>
                                <FullNameIcon />
                                <Typography>
                                  {event.fullName ?? "Unknown"}
                                </Typography>
                              </BoxItem>
                              <BoxItem>
                                <GenderIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].gender || "Unknown"}
                                </Typography>
                              </BoxItem>
                              <BoxItem>
                                <GenderIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].emotion ||
                                    "Unknown"}
                                </Typography>
                              </BoxItem>
                            </Grid>
                            <Grid item xs={6}>
                              <BoxItem>
                                <GenderIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].faceProb
                                    ? `${(
                                        descriptionObj.bboxes[0].faceProb * 100
                                      ).toFixed(2)} %`
                                    : "Unknown"}
                                </Typography>
                              </BoxItem>
                              <BoxItem>
                                <AgeIcon />
                                <Typography>
                                  {descriptionObj.bboxes[0].age || "Unknown"}
                                </Typography>
                              </BoxItem>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default HistoryEvent;
