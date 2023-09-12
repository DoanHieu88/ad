import FilePdf from "../page/PDF/FilePdf";
import LiveView from "../page/liveView";
import { Customer } from "../page/mangament/Customer/Customer";
import { Device } from "../page/mangament/Device";
import { Role } from "../page/mangament/Role";
import { User } from "../page/mangament/User";
import MasterMap from "../page/masterMap/MasterMap";
import RecordingCamera from "../page/recordingCamera";
import TrafficContent from "../page/traffic/TrafficContent";

export const routes = [
  { path: "/customer", element: Customer },
  { path: "/user", element: User },
  { path: "/role", element: Role },
  { path: "/device", element: Device },
  { path: "/", element: LiveView },
  // { path: "/map", element: Map },
  { path: "/masterMap", element: MasterMap },
  { path: "/recording-camera", element: RecordingCamera },
  { path: "/traffic", element: TrafficContent },
  { path: "/pdf", element: FilePdf },
];
