import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { Header, Content } from "./component/index";

const EventAlert = () => {
  const [typeDisplay, setTypeDisplay] = useState("list");
  return (
    <Box>
      <Header setTypeDisplay={setTypeDisplay} />
      <Content typeDisplay={typeDisplay} />
    </Box>
  );
};
export default EventAlert;
