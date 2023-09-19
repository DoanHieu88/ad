export const heatmapInsights = {
  id: "Code id Site",
  nameSite: "380 Lạc Long Quân",
  dataZone: [
    {
      deviceId: "Code id Device",
      deviceName: "Tên camera",
      zoneName: "Zone 1",
      totalVisitor: 700, // Tổng số sự kiện của Device
      data: [300, 400, 102, 300, 540, 123, 112],
    },
    {
      deviceId: "Code id 2",
      deviceName: "Tên camera 2",
      zoneName: "Zone 2",
      totalVisitor: 300, // Tổng số sự kiện của Device
      data: [500, 600, 300, 400, 440, 103, 112],
    },
    {
      deviceId: "Code id 2",
      deviceName: "Tên camera 2",
      zoneName: "Zone 3",
      totalVisitor: 350, // Tổng số sự kiện của Device
      data: [300, 150, 240, 360, 409, 203, 330],
    },
    {
      deviceId: "Code id 2",
      deviceName: "Tên camera 2",
      zoneName: "Zone 4",
      totalVisitor: 210, // Tổng số sự kiện của Device
      data: [220, 335, 451, 111, 333, 114, 231],
    },
  ],
  totalSize: 1000,
  labelTime: ["01/07", "02/07", "03/07", "04/07", "05/07", "06/07", "07/07"],
};

export const heatmapInsightsAllSite = {
  total: 4202,
  data: [
    {
      deviceId: "Nhãn code Device",
      groupId: "Code id group Device",
      deviceName: "têm thiết bị",
      groupName: "tên Group",
      zoneName: "Zone1",
      totalVisitor: 120,
    },
    {
      deviceId: "Nhãn code Device",
      groupId: "Code id group Device",
      deviceName: "têm thiết bị",
      groupName: "tên Group",
      zoneName: "Zone1",
      totalVisitor: 220,
    },
  ],
};

export const randomBgColor = () => {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  return "rgb(" + x + "," + y + "," + z + ")";
};

export const data = [
  {
    name: "llq",
    children: [
      { name: "site 1", size: 1302 },
      { name: "site 2", size: 2459 },
    ],
  },
  {
    name: "hqv",
    children: [
      { name: "site 1", size: 2138 },
      { name: "site 2", size: 3824 },
      { name: "site 3", size: 1353 },
    ],
  },
  {
    name: "data",
    children: [
      { name: "size 4", size: 2054 },
      { name: "site 5", size: 1978 },
    ],
  },
  {
    name: "events",
    children: [
      { name: "site 6", size: 7313 },
      { name: "site 7", size: 6880 },
    ],
  },
  {
    name: "legend",
    children: [
      { name: "site 8", size: 2085 },
      { name: "site 6", size: 4614 },
      { name: "site 0", size: 1053 },
    ],
  },
  {
    name: "operator",
    size: 4614,
  },
].map((it) => ({ ...it, fillColor: randomBgColor() }));
