import { Sector } from "recharts";

const RenderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    total,
    type,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g style={{ zIndex: 1 }}>
      {/* <text
        x={cx}
        y={cy - 20}
        dy={8}
        textAnchor="middle"
        style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {type || ""}
      </text>
      <text
        x={cx}
        y={cy + 15}
        dy={8}
        textAnchor="middle"
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        {total || ""}
      </text> */}
      {!payload.active ? (
        <>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            z={1}
            textAnchor={textAnchor}
            fill="#333"
          >{`(${(percent * 100).toFixed(2)}%)`}</text>
        </>
      ) : null}
    </g>
  );
};
export default RenderActiveShape;
