import { createContext, useContext, useReducer } from "react";
import { cameraOnMapReducer } from "./reducers/MapReducer";

const initialCameraData = {
  listPopUpCameraOpen: {},
  places: [],
  deviceListSelected: [],
};

export const CameraOnMapContext = createContext(initialCameraData);

export const CameraOnMapDispatchContext = createContext(null);

export const CameraOnMapProvider = ({ children }) => {
  const [cameraProvider, dispatch] = useReducer(
    cameraOnMapReducer,
    initialCameraData
  );

  return (
    <CameraOnMapContext.Provider value={cameraProvider}>
      <CameraOnMapDispatchContext.Provider value={dispatch}>
        {children}
      </CameraOnMapDispatchContext.Provider>
    </CameraOnMapContext.Provider>
  );
};

export const useDipatch = () => {
  const dispatch = useContext(CameraOnMapDispatchContext);
  if (!dispatch) {
    throw new Error("useDispatch must be used within a CameraOnMapProvider");
  }
  return dispatch;
};

export const useCameraOnMapContext = () => {
  const context = useContext(CameraOnMapContext);
  if (!context) {
    throw new Error("useCameraOnMap must be used within a CameraOnMapProvider");
  }
  return context;
};
