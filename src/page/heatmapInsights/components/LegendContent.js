import { Box, Typography } from "@material-ui/core";

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
      {payload.map((item, idx) => (
        <Box
          style={{
            display: "flex",
            marginInline: 40,
            cursor: "pointer",
            textDecoration: item.active ? "line-through" : "",
            textTransform: "capitalize",
          }}
          onClick={() => handleHideData(item.name)}
          key={item.name}
        >
          <Box
            style={{
              width: 20,
              height: 21,
              background: item.fillColor,
              marginRight: 12,
            }}
          ></Box>
          <Typography>{item.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LegendContent;
