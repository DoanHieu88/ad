import HistoryEvent from "../page/historyEvent/HistoryEvent";
import LiveView from "../page/liveView";
import AuthScreen from "../page/loginSmartHome/modules/AuthScreen";
import { Customer } from "../page/mangament/Customer/Customer";
import { Device } from "../page/mangament/Device";
import { Role } from "../page/mangament/Role";
import { User } from "../page/mangament/User";
import MasterMap from "../page/masterMap/MasterMap";
import MasterMapLeaf from "../page/masterMapLeaf/CameraOnMaps";

export const routes = [
  { path: "/customer", element: Customer },
  { path: "/user", element: User },
  { path: "/role", element: Role },
  { path: "/device", element: Device },
  { path: "/", element: LiveView },
  { path: "/map", element: Map },
  { path: "/masterMap", element: MasterMap },
  { path: "/masterMapLeaf", element: MasterMapLeaf },
  { path: "/historyEvent", element: HistoryEvent },
  { path: "/loginSmartHome", element: AuthScreen },
];
