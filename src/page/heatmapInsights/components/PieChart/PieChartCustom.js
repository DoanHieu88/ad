import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Box, Typography } from "@material-ui/core";
import TooltipPieChart from "./TooltipPieChart";
import React from "react";
import RenderActiveShape from "./RenderActiveShape";

const LabelData = ({ type, total }) => {
  return (
    <Box style={{ position: "absolute", top: "43%", left: "43%" }}>
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
  outerRadius,
  title,
  handleHideData,
  isLegend,
  dataActive,
  ...props
}) => {
  return (
    <Box style={{ width: "100%", height: "100%", position: "relative" }}>
      <ResponsiveContainer width="99%" height="99%">
        <PieChart>
          <Pie
            activeIndex={dataActive || []}
            activeShape={<RenderActiveShape />} // hide active pie
            // hide={}
            data={data}
            cx="50%"
            cy="50%"
            {...props}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fillColor} />
            ))}
          </Pie>
          {isTooltip && (
            <Tooltip
              wrapperStyle={{ zIndex: 1 }}
              content={<TooltipPieChart data={data} title={title} />}
            />
          )}
          {/* {isLegend && (
            <Legend
              margin={{ right: "40px" }}
              content={
                <LegendContent data={data} handleHideData={handleHideData} />
              }
            />
          )} */}
        </PieChart>
      </ResponsiveContainer>
      <LabelData type={type} total={total} />
    </Box>
  );
};

export default PieChartCustom;
