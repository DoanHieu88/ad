import { Box, Paper } from "@material-ui/core";
import PieChartCustom from "./components/PieChart/PieChartCustom";
import { heatmapInsights } from "./data";
import TreeMapChart from "./components/treeMapChart/TreeMapChart";
import { colorsRecordState } from "../recordingCamera/@type";
import { useMemo, useState } from "react";
import _ from "lodash";
import LineCharCustom from "./components/LineChart/LineCharCustom";

const HeatmapInsights = () => {
  const [dataHeatmapInsight, setDataHeatmapInsights] = useState({
    ...heatmapInsights,
    dataZone: [...heatmapInsights.dataZone].map((item) => ({
      ...item,
      active: false,
      dataKey: item.zoneName,
      value: item.totalVisitor,
      name: item.zoneName,
    })),
  });

  const handleHideDataPie = (key) => {
    const tempDataZone = [...dataHeatmapInsight.dataZone];
    const dataIndex = tempDataZone.findIndex((it) => it.zoneName === key);
    if (dataIndex === -1) return;
    tempDataZone[dataIndex] = {
      ...tempDataZone[dataIndex],
      active: !tempDataZone[dataIndex].active,
    };
    const newData = _.cloneDeep({
      ...dataHeatmapInsight,
      dataZone: tempDataZone,
    });
    setDataHeatmapInsights(newData);
  };

  const dataActive = useMemo(() => {
    const listIndx = [];
    dataHeatmapInsight.dataZone.forEach((item, idx) => {
      if (item.active) listIndx.push(idx);
    });
    return listIndx;
  }, [dataHeatmapInsight.dataZone]);

  // convert data line
  const dataLineChart = useMemo(() => {
    const data = dataHeatmapInsight.labelTime.map((item, idx) => {
      const objName = { name: item };
      dataHeatmapInsight.dataZone.forEach((it) => {
        objName[it.zoneName] = Math.floor(
          (it.data[idx] / dataHeatmapInsight.totalSize) * 100 // convert to percent
        );
        objName[`${it.zoneName} real`] = it.data[idx]; // take real data
      });

      return objName;
    });
    return data;
  }, [dataHeatmapInsight]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box style={{ padding: 20, width: "100%" }}>
        <Paper
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box style={{ display: "flex", width: "100%", height: "500px" }}>
            <Box style={{ width: "50%", height: "100%" }}>
              <PieChartCustom
                data={dataHeatmapInsight.dataZone}
                COLORS={colorsRecordState}
                type={"Service"}
                total={dataHeatmapInsight.totalSize}
                borderWidth={110}
                paddingAngle={1}
                isTooltip={true}
                title={"ZONE"}
                handleHideData={handleHideDataPie}
                isLegend={true}
                dataActive={dataActive}
              />
            </Box>
            <Box style={{ width: "100%", height: "100%" }}>
              <LineCharCustom
                data={dataLineChart}
                color={colorsRecordState}
                dataKeys={dataHeatmapInsight.dataZone}
              />
            </Box>
          </Box>
          <Box style={{ width: "100%" }}>
            <TreeMapChart />
          </Box>
        </Paper>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default HeatmapInsights;
