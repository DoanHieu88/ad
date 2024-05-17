import "leaflet/dist/leaflet.css";
import { Box } from "@material-ui/core";
import SideBar from "./SideBar/SideBar";
import { CameraOnMapProvider } from "./Provider/CameraOnMapMngt";
import CameraOnMapsContent from "./Components/CameraOnMapsContent";

const MasterMapLeaf = () => {
  return (
    <CameraOnMapProvider>
      <Box style={{ display: "flex" }}>
        <SideBar />
        <CameraOnMapsContent />
      </Box>
    </CameraOnMapProvider>
  );
};

export default MasterMapLeaf;
