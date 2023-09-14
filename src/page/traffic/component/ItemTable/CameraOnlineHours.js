import { Box, Typography } from "@material-ui/core";
import UpdateIcon from "@material-ui/icons/Update";

const CameraOnlineHours = ({ data }) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <UpdateIcon style={{ width: 20, height: 20, marginRight: 10 }} />
      <Typography style={{ flex: 1 }}>{data.hour}</Typography>
    </Box>
  );
};
export default CameraOnlineHours;
