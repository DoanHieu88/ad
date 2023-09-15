import { Box, Typography } from "@material-ui/core";
import { useState } from "react";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";
import TooltipLineChar from "./TooltipLineChar";

const LineCharCustom = ({ data, color, dataKeys }) => {
  const [listHide, setListHide] = useState([]);

  const handleClickLegend = (value) => {
    const { dataKey } = value;
    const tempDataHide = [...listHide];
    tempDataHide.includes(dataKey)
      ? tempDataHide.splice(tempDataHide[dataKey], 1)
      : tempDataHide.push(dataKey);
    setListHide(tempDataHide);
  };

  const formatTick = (value) => `${value}%`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={380}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          padding={{ top: 30 }}
          ticks={[0, 20, 40, 60, 80, 100]}
          tickFormatter={formatTick}
        />
        <Tooltip content={<TooltipLineChar />} />
        <Legend
          onClick={handleClickLegend}
          cursor={"pointer"}
          style={{ cursor: "pointer" }}
        />
        {dataKeys.map((it, idx) => {
          return (
            <Line
              type="monotone"
              dataKey={it.zoneName}
              stroke={color[idx]}
              activeDot={{ r: 8 }}
              hide={listHide.includes(it.zoneName)}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharCustom;
