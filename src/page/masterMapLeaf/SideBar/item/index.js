import { Box, Typography } from "@material-ui/core";
import { CameraIcon } from "../../../../common/icons/CameraIcon";

const CameraItem = ({ camera_detail, selected }) => {
  const handleCheck = () => {};

  return (
    <Box
      onClick={handleCheck}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: selected ? "rgba(255, 160, 169, 0.15)" : "transparent",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        <CameraIcon
          width={20}
          height={20}
          color={camera_detail.status === "ONLINE" ? "#0BCB23" : "#FF0000"}
        />
        <Typography>{camera_detail.camName}</Typography>
      </Box>
      <Box
        style={{
          width: "10px",
          height: "10px",
          background: camera_detail.status === "ONLINE" ? "#0BCB23" : "#FF0000",
          borderRadius: "100px",
        }}
      ></Box>
    </Box>
  );
};

export default CameraItem;
