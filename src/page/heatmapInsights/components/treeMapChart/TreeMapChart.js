import { Box } from "@material-ui/core";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";
import { data } from "../../data";
import CustomizedContent from "./CustomizedContent";
import CustomizedTooltip from "./CustomizedTooltip";

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
];

const TreeMapChart = () => {
  return (
    <ResponsiveContainer width="99%" height={380}>
      <Treemap
        width={400}
        height={380}
        data={data}
        dataKey="size"
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} />}
      >
        <Tooltip content={<CustomizedTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};
export default TreeMapChart;
