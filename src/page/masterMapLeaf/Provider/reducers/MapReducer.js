export const MapsActionTypes = {
  LIST_POPUP_CAMERA_OPEN: "LIST_POPUP_CAMERA_OPEN",
  PLACES: "PLACES",
  DEVICES_LIST: "DEVICES_LIST",
};

export const cameraOnMapReducer = (state, action) => {
  switch (action.type) {
    case MapsActionTypes.LIST_POPUP_CAMERA_OPEN:
      return {
        ...state,
        listPopUpCameraOpen: action.payload,
      };
    case MapsActionTypes.PLACES:
      console.log("action.payload", action.payload);
      return {
        ...state,
        places: action.payload,
      };
    case MapsActionTypes.DEVICES_LIST:
      return {
        ...state,
        deviceListSelected: action.payload,
      };
    default:
      return state;
  }
};
