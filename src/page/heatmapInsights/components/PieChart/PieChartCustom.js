import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Box, Typography } from "@material-ui/core";
import TooltipPieChart from "./TooltipPieChart";
import React, { useMemo } from "react";
import RenderActiveShape from "./RenderActiveShape";

const LegendContent = ({ handleHideData, payload }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingBlock: 40,
      }}
    >
      {payload.map((item) => (
        <Box
          style={{
            display: "flex",
            marginInline: 40,
            cursor: "pointer",
            textDecoration: item.payload.active ? "line-through" : "",
            textTransform: "capitalize",
          }}
          onClick={() => handleHideData(item.value)}
          key={item.value}
        >
          <Box
            style={{
              width: 20,
              height: 21,
              background: item.payload.fill,
              marginRight: 12,
            }}
          ></Box>
          <Typography>{item.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const LabelData = ({ type, total }) => {
  return (
    <Box style={{ position: "absolute", top: "34%", left: "44%" }}>
      <Typography
        style={{
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {type}
      </Typography>
      <Typography
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {total}
      </Typography>
    </Box>
  );
};

const PieChartCustom = ({
  data,
  isTooltip,
  total,
  type,
  COLORS,
  borderWidth,
  title,
  handleHideData,
  isLegend,
  dataActive,
  ...props
}) => {
  return (
    <Box style={{ width: "100%", height: "100%", position: "relative" }}>
      <ResponsiveContainer
        width="99%"
        height="99%"
        children={<LabelData type={type} />}
      >
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={dataActive || []}
            activeShape={<RenderActiveShape />} // hide active pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={borderWidth || 90}
            fill="#8884d8"
            {...props}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {isTooltip && (
            <Tooltip
              wrapperStyle={{ zIndex: 1 }}
              content={
                <TooltipPieChart data={data} COLORS={COLORS} title={title} />
              }
            />
          )}
          {isLegend && (
            <Legend
              margin={{ right: "40px" }}
              content={
                <LegendContent data={data} handleHideData={handleHideData} />
              }
            />
          )}
        </PieChart>
      </ResponsiveContainer>
      <LabelData type={type} total={total} />
    </Box>
  );
};

export default PieChartCustom;
