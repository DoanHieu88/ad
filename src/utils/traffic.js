import ViolationInfo from "../page/traffic/component/ItemTable/ViolationInfo";
import ViolationImageInfo from "../page/traffic/component/ItemTable/ViolationImageInfo";
import CameraStatus from "../page/traffic/component/ItemTable/CameraStatus";
import CameraStorage from "../page/traffic/component/ItemTable/CameraStorage";
import CameraAction from "../page/traffic/component/ItemTable/CameraAction";
export const SPECIAL_CHARACTER_TEXT = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#0-9]/;
export const SPECIAL_CHARACTER_NUMBER =
  /[-!$%^&*()_+|~=`{}\[\]:\/;,<>?@#a-zA-ZÀ-ỹ\s]/;
export const SPECIAL_CHARACTER = /[!$%^&*#()_+|~=`{}\[\]:\/;<>?,@]/;

export const settingArr = [
  {
    label: "Địa chỉ chi tiết",
    key: "address",
    type: "text",
    maxLength: 50,
    pattern: /[a-zA-ZÀ-ỹ\s]/,
    specialCharater: SPECIAL_CHARACTER_TEXT,
  },
  {
    label: "Thủ trưởng đơn vị",
    key: "unitHeads",
    type: "text",
    maxLength: 50,
    pattern: /[a-zA-ZÀ-ỹ\s]/,
    specialCharater: SPECIAL_CHARACTER_TEXT,
  },
  {
    label: "Người ký",
    key: "headConfirmation",
    type: "radio",
  },
  {
    label: "Trưởng phòng",
    key: "manager",
    type: "text",
    maxLength: 50,
    pattern: /[a-zA-ZÀ-ỹ\s]/,
    specialCharater: SPECIAL_CHARACTER_TEXT,
  },
  {
    label: "Phó phòng",
    key: "deputy",
    type: "text",
    maxLength: 50,
    pattern: /[a-zA-ZÀ-ỹ\s]/,
    specialCharater: SPECIAL_CHARACTER_TEXT,
  },
  {
    label: "Số điện thoại",
    key: "phone",
    type: "text",
    pattern: /\d+/,
    checkSpecialCharater: SPECIAL_CHARACTER_NUMBER,
  },
  {
    label: "Email",
    key: "email",
    type: "text",
  },
];

export const editServerArr = [
  {
    label: "Server Name",
    key: "serverName",
    type: "text",
    maxLength: 50,
    pattern: /[-!$%^&*()+|~=`{}\[\]:\/;,<>?@#]/,
  },
  {
    label: "Mac Address",
    key: "macAddress",
    type: "text",
  },
  {
    label: "ID Address",
    key: "idAddress",
    type: "text",
  },
  {
    label: "Public Adress",
    key: "publicAddress",
    type: "text",
  },
  {
    label: "Server Location",
    key: "serverLocation",
    type: "text",
    maxLength: 200,
  },
  {
    label: "CPU cores",
    key: "cpu",
    type: "text",
  },
  {
    label: "RAM",
    key: "ram",
    type: "text",
  },
  {
    label: "HDD",
    key: "hdd",
    type: "text",
  },
  {
    label: "Camera",
    key: "camera",
    type: "text",
  },
  {
    label: "Camera Limited",
    key: "cameraLimited",
    type: "text",
  },
];

export const notificationShowingArr = [
  {
    label: "In thông báo VP",
    key: "noti",
    type: "print",
  },
  {
    label: "In phiếu gửi",
    key: "dispatch",
    type: "print",
  },
  {
    label: "Tải xuống",
    key: "download",
    type: "download",
  },
];
export const violationError = [
  { label: "Không chấp hành hiệu lệnh của tin hiệu giao thông", value: 1 },
  {
    label: "Không chấp hành hiệu lệnh, chỉ dẫn của biển báo, vạch kẻ đường",
    value: 2,
  },
  { label: "Vượt trong các trường hợp cấm vượt", value: 3 },
  { label: "Dừng, đỗ phương tiện trái quy định", value: 4 },
  { label: "Điều khiển phương tiện chạy quá tốc độ", value: 5 },
  { label: "Đi ngược chiều", value: 6 },
];

export const violationStatus = [
  { label: "Vi phạm", value: "VP" },
  { label: "Chờ duyệt lỗi", value: "CDVP" },
  { label: "Chờ duyệt không lỗi", value: "CDKVP" },
  { label: "Chưa định dạng", value: "CDD" },
  { label: "Chờ duyệt định danh", value: "CDDD" },
  { label: "Đã định dạng", value: "DDD" },
  { label: "Có lỗi", value: "CVP" },
  { label: "Không lỗi", value: "KVP" },
];

export const vehicles = [
  { label: "Ô tô", value: "car" },
  { label: "Xe máy", value: "motor" },
  { label: "Xe tải", value: "bus" },
  { label: "Xe bus", value: "truck" },
  { label: "Xe đạp", value: "bicycle" },
  { label: "Xe ba gác", value: "tricycles" },
  { label: "NgườI đi bộ", value: "human" },
];

export const active = [
  { label: "All Status", value: "all" },
  { label: "Online", value: "onl" },
  { label: "Offline", value: "off" },
];
export const cameraStorage = [
  { label: "All Camera Storage", value: "all" },
  { label: "On", value: "on" },
  { label: "Off", value: "off" },
  { label: "Error", value: "error" },
];

export const vehicleColor = [
  { label: "Đen", value: "black" },
  { label: "Trắng", value: "white" },
  { label: "Đỏ", value: "red" },
  { label: "Nâu", value: "brown" },
  { label: "Xanh", value: "blue" },
  { label: "Vàng", value: "yellow" },
];

export const plateCarsColor = [
  { label: "Đỏ", value: "red" },
  { label: "Xanh", value: "blue" },
  { label: "Vàng", value: "yellow" },
  { label: "Trắng", value: "white" },
];

export const serverArr = [
  {
    width: "100%",
    btnText: "Status",
    titleDropdownText: "Tất cả status",
    key: "status",
    list: active,
    type: "select_multiple",
    placeholderContent: "Status",
  },
  {
    width: "100%",
    btnText: "Camera Storage",
    titleDropdownText: "All Camera Storage",
    key: "camera",
    list: cameraStorage,
    type: "select_multiple",
    placeholderContent: "Camera Storage",
  },
];
export const headerFilterArr = [
  {
    width: "100%",
    btnText: "Trạng thái",
    titleDropdownText: "Tất cả trạng thái",
    key: "status",
    list: violationStatus,
    type: "select_multiple",
    placeholderContent: "Trạng thái",
  },
  {
    width: "100%",
    btnText: "Lỗi vi phạm",
    titleDropdownText: "Tất cả lỗi vi phạm",
    key: "errors",
    list: violationError,
    type: "select_multiple",
    placeholderContent: "Lỗi vi phạm",
  },
  {
    width: "100%",
    btnText: "Vị trí",
    titleDropdownText: "Tất cả thiết bị",
    key: "devices",
    list: violationError,
    type: "select_multiple",
    placeholderContent: "Tìm kiếm thiết bị",
  },
  {
    width: "100%",
    btnText: "Phương tiện",
    titleDropdownText: "Tất cả phương tiện",
    key: "vehicles",
    list: vehicles,
    type: "select_multiple",
    placeholderContent: "Phương tiện",
  },
  {
    width: "100%",
    btnText: "Màu xe",
    titleDropdownText: "Tất cả màu xe",
    key: "vehicleColor",
    list: vehicleColor,
    type: "select_multiple",
    placeholderContent: "Màu xe",
  },
  {
    width: "100%",
    btnText: "Màu biển xe",
    titleDropdownText: "Tất cả màu biển xe",
    key: "plateColor",
    list: plateCarsColor,
    type: "select_multiple",
    placeholderContent: "Màu biển xe",
  },
  { key: "date", type: "date_range" },
];

export const columnsTrafficData = [
  {
    field: "stt",
    name: "#",
    customStyles: { minWidth: "57px", padding: 0, textAlign: "center" },
  },
  {
    field: "statusEvent",
    name: "Thông tin Vi Phạm",
    width: "100%",
    component: (data) => {
      return <ViolationInfo data={data} />;
    },
  },
  {
    field: "imageDetail",
    name: "Hình Ảnh Vi Phạm",
    customStyles: {
      flex: 1,
      minWidth: "650px",
      textAlign: "center",
      padding: "12px 0",
    },
    component: (data) => {
      return <ViolationImageInfo data={data} />;
    },
  },
];

export const cameraStorageData = [
  {
    field: "stt",
    name: "No.",
  },
  {
    field: "cameraName",
    name: "Camera name",
  },
  {
    field: "status",
    name: "Status",
    component: (data) => {
      return <CameraStatus data={data} />;
    },
  },
  {
    field: "cameraStorage",
    name: "Camera Storage",
    component: (data) => {
      return <CameraStorage data={data} />;
    },
  },
  {
    field: "message",
    name: "Camera Error Message",
  },
  {
    field: "action",
    name: "Action",
    component: () => {
      return <CameraAction />;
    },
  },
];

export const typeErrEvent = {
  1: "Không chấp hành hiệu lệnh của tin hiệu giao thông",
  2: "Không chấp hành hiệu lệnh, chỉ dẫn của biển báo, vạch kẻ đường",
  3: "Vượt trong các trường hợp cấm vượt",
  4: "Dừng, đỗ phương tiện trái quy định",
  5: "Điều khiển phương tiện chạy quá tốc độ",
  6: "Đi ngược chiều",
};

export const statusErrEvent = {
  VP: "Vi phạm chờ duyệt",
  CDVP: "Chờ duyệt lỗi",
  CDKVP: "Chờ duyệt không lỗi",
  CDD: "Chưa định danh",
  CDDD: "Chờ duyệt định danh",
  DDD: "Đã định danh",
  KVP: "Không lỗi",
};

export const colorStatusErrEvent = {
  VP: { backgroundColor: "#ffd8dc", color: "#dd3d4b" },
  CDVP: { backgroundColor: "#ffebd6", color: "#ff890a" },
  CDKVP: { backgroundColor: "#d5ecdb", color: "#56b26e" },
  CDD: { backgroundColor: "#ffd8dc", color: "#dd3d4b" },
  CDDD: { backgroundColor: "#ffebd6", color: "#ff890a" },
  DDD: { backgroundColor: "#d5ecdb", color: "#56b26e" },
  KVP: {
    backgroundColor: "rgba(225, 252, 239, 1)",
    color: "rgba(24, 106, 59, 1)",
  },
  DXL: {
    backgroundColor: "rgba(171, 178, 185, 1)",
    color: "rgba(23, 32, 42, 1)",
  },
};

export const status = [
  { label: "Tất cả", value: "all" },
  { label: "Vi phạm chờ duyệt", value: "01" },
  { label: "Lỗi đang xử lý", value: "02" },
  { label: "Ra thông báo VP", value: "03" },
];

export const listSceneTab = [
  { label: "Thông tin hiện trường", value: "scence_info" },
  { label: "Thông tin xử phạt", value: "ban_info" },
];

export const noErrorReasonList = [
  {
    label: "Chọn lý do không lỗi",
    value: "00",
  },
  {
    label: "Xe ưu tiên",
    value: "01",
  },
  {
    label: "Tốc độ đúng quy định",
    value: "02",
  },
  {
    label: "Xe rẽ phải ở đoạn đường được rẽ phải",
    value: "03",
  },
  {
    label: "Xe di chuyển theo hiệu lệnh người điều khiển giao thông",
    value: "04",
  },
  {
    label: "Lỗi đèn tín hiệu",
    value: "05",
  },
  {
    label: "Không đủ cơ sở chứng minh vi phạm",
    value: "06",
  },
];

export function getValueObjectByPath(path, obj, separator = ".") {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export const convertToAbbreviation = (string) => {
  const cleanedName = string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Chia tên thành các phần
  const parts = cleanedName.split(" ");

  // Tạo chuỗi viết tắt
  const abbreviation = parts.map((part) => part[0]).join("");

  return abbreviation;
};

export const lowerCaseStringCustom = (numberChecked, originalString) => {
  return `${
    numberChecked ? numberChecked : "Tất cả"
  } ${originalString.toLowerCase()}`;
};

export const checkIsSettingModal = (dataSetting) => {
  return dataSetting && dataSetting.id;
};

export const sendingData = {
  provinceName: "tỉnh Thái Nguyên",
  cityName: "thành phố Thái Nguyên",
  sendingNo: "300623-0001",
  sendingCode: "CATP",
  province: "Thái Nguyên",
  day: "30",
  month: "6",
  year: "2023",
  policeHeadquarters: "Minh Đức",
  trafficViolator: "CÔNG TY TNHH MTV EAGON",
  violatorAddress:
    "TỔ DÂN PHỐ NGHĨA SƠN, MINH ĐỨC, QUẬN ĐỒ SƠN, THÀNH PHỐ HẢI PHÒNG.",
  transportation: "Ô tô",
  plateNumber: "15A-235.18",
  violationType: "Không chấp hành hiệu lệnh của đèn tín hiệu giao thông",
  phoneNumber: "0394.690.802",
};
export const notiData = {
  provinceName: "tỉnh Thái Nguyên",
  cityName: "thành phố Thái Nguyên",
  sendingNo: "300623-0001",
  sendingCode: "CATP",
  province: "Thái Nguyên",
  policeHeadquarters: "Minh Đức",
  trafficViolator: "CÔNG TY TNHH MTV EAGON",
  violatorAddress:
    "TỔ DÂN PHỐ NGHĨA SƠN, MINH ĐỨC, QUẬN ĐỒ SƠN, THÀNH PHỐ HẢI PHÒNG.",
  transportation: "Ô tô",
  plateNumber: "15A-235.18",
  violationType: "Không chấp hành hiệu lệnh của đèn tín hiệu giao thông",
  phoneNumber: "0394.690.802",
  time: "05:33:35",
  date: "29/06/2023",
  location:
    "Nút giao Phạm Văn Đồng - đường tỉnh 363 (phường Hải Thành, quận Dương Kinh, thành phố Hải Phòng)",
  policeAddress: "số 1 Trần Hữu Dực, Nam Từ Liêm",
  otherpoliceHeadquarters: "Công an Quận Đồ Sơn, Thành phố Hải Phòng",
  camera: "CAMERA Ngã tư 363 (2)",
  coordinates: "20.79274500 106.71510200",
};
