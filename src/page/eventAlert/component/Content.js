import React from "react";
import { Navbar, TableGrid, GridView } from "./index";
import { Box } from "@material-ui/core";

const Content = React.memo(({ typeDisplay }) => {
  return (
    <Box>
      <Navbar />
      {typeDisplay === "list" ? <TableGrid /> : <GridView />}
    </Box>
  );
});

export default Content;
