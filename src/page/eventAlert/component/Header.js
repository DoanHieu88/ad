import React from "react";
import { Box, Icon, SvgIcon, Typography } from "@material-ui/core";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  TypographyStyle: {
    fontSize: "12px",
  },
});

const Iconsss = (
  <path>
    <defs>
      <clipPath id="fvfoqsuo3a">
        <path
          data-name="Rectangle 4310"
          transform="translate(32 365)"
          style="stroke:#939393;fill:#939393"
          d="M0 0h24v24H0z"
        />
      </clipPath>
    </defs>
    <g
      data-name="Mask Group 703"
      transform="translate(-32 -365)"
      style="clip-path:url(#fvfoqsuo3a)"
    >
      <g data-name="001-file">
        <g data-name="Group 8816">
          <path
            data-name="Path 6401"
            d="M14.3 0H4.7a2.389 2.389 0 0 0-2.388 2.4L2.3 21.6A2.389 2.389 0 0 0 4.688 24H19.1a2.4 2.4 0 0 0 2.4-2.4V7.2zm2.4 19.2H7.1v-2.4h9.6zm0-4.8H7.1V12h9.6zm-3.6-6V1.8l6.6 6.6z"
            transform="translate(32.1 365)"
            style="fill:#939393"
          />
        </g>
      </g>
    </g>
  </path>
);

const Header = React.memo(({ setTypeDisplay }) => {
  const classes = useStyles();
  return (
    <Box
      className="flex-between"
      style={{ borderBottom: "3px solid #f4f4f4", paddingBottom: 5 }}
    >
      <Box className="sidebar-resources-categories">Live View</Box>
      <Box
        className="flex"
        style={{ borderLeft: "1px solid #333", paddingLeft: 8 }}
      >
        <Box
          className="flex-col-center"
          style={{ marginRight: 5, cursor: "pointer" }}
          onClick={() => setTypeDisplay("list")}
        >
          <FormatListBulletedIcon />
          <Typography className={classes.TypographyStyle}>List View</Typography>
        </Box>
        <Box
          className="flex-col-center"
          style={{ cursor: "pointer" }}
          onClick={() => setTypeDisplay("grid")}
        >
          <FormatListBulletedIcon />
          <Typography className={classes.TypographyStyle}>Grid View</Typography>
        </Box>
      </Box>
      {/* <Icon component={Iconsss} /> */}
      <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ fill: "red" }}
      >
        <defs>
          <clipPath id="fvfoqsuo3a">
            <path
              data-name="Rectangle 4310"
              transform="translate(32 365)"
              d="M0 0h24v24H0z"
            />
          </clipPath>
        </defs>
        <g data-name="Mask Group 703" transform="translate(-32 -365)">
          <g data-name="001-file">
            <g data-name="Group 8816">
              <path
                data-name="Path 6401"
                d="M14.3 0H4.7a2.389 2.389 0 0 0-2.388 2.4L2.3 21.6A2.389 2.389 0 0 0 4.688 24H19.1a2.4 2.4 0 0 0 2.4-2.4V7.2zm2.4 19.2H7.1v-2.4h9.6zm0-4.8H7.1V12h9.6zm-3.6-6V1.8l6.6 6.6z"
                transform="translate(32.1 365)"
              />
            </g>
          </g>
        </g>
      </SvgIcon>
    </Box>
  );
});

export default Header;
