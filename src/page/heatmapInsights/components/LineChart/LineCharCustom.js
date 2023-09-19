import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import TooltipLineChar from "./TooltipLineChar";

const LineCharCustom = ({ data, dataKeys, dataActive }) => {
  const formatTick = (value) => `${value}%`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        {/* <Legend cursor={"pointer"} style={{ cursor: "pointer" }} /> */}
        {dataKeys.map((it, idx) => {
          return (
            <Line
              key={idx}
              type="monotone"
              dataKey={it.zoneName}
              stroke={it.fillColor}
              activeDot={{ r: 8 }}
              hide={dataActive
                .map((item) => item.zoneName)
                .includes(it.zoneName)}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineCharCustom;
