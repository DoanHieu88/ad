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
  const formatTick = (value) => `${value}% `;

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
        <XAxis tickMargin={15} dataKey="name" padding={{ right: 20 }} />
        <YAxis
          padding={{ top: 10 }}
          ticks={[0, 20, 40, 60, 80, 100]}
          tickFormatter={formatTick}
          tickMargin={10}
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
