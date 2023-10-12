import { Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TooltipCustom } from "./";

const useStyles = makeStyles({
  root: {
    "& .recharts-tooltip-cursor": {
      display: "none",
    },
  },
});

// "recharts-rectangle "

const LegendContent = ({ data, handleHideData }) => {
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
      {data.map((item) => (
        <Box
          style={{
            display: "flex",
            marginRight: 80,
            cursor: "pointer",
            textDecoration: item.active ? "" : "line-through",
            textTransform: "capitalize",
          }}
          onClick={() => handleHideData(item.key)}
          key={item.key}
        >
          <Box
            style={{
              width: 20,
              height: 21,
              background: item.color,
              marginRight: 12,
            }}
          ></Box>
          <Typography>{item.key}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const StackedBarChartCustom = ({ data, listBar, handleHideData }) => {
  const classes = useStyles();

  return (
    <Box>
      <ResponsiveContainer width={"99%"} height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className={classes.root}
        >
          <XAxis
            dataKey="name"
            tickMargin={15}
            tickLine={false}
            allowDataOverflow={false}
            textAnchor="end"
            sclaeToFit="true"
            verticalAnchor="start"
            interval={0}
            angle="-40"
            stroke="#8884d8"
            overflow={"hidden"}
            width={20}
          />
          <YAxis
            label={{ value: "Camera", position: "top", fill: "#000000" }}
            padding={{ top: 30 }}
            tickMargin={5}
            tickLine={false}
          />
          <Tooltip content={<TooltipCustom des="Camera limited: 50/300" />} />
          <Legend
            margin={{ right: "40px", top: 60 }}
            content={
              <LegendContent data={listBar} handleHideData={handleHideData} />
            }
          />
          {listBar.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              stackId="a"
              fill={bar.color}
              hide={!bar.active}
              barSize={64}
              // style={{ marginRight: 80 }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StackedBarChartCustom;
