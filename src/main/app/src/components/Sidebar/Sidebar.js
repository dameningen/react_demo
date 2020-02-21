import { Drawer, IconButton, List } from "@material-ui/core";
import { AccountBox as AccountBoxIcon, ArrowBack as ArrowBackIcon, FilterNone as UIElementsIcon, Home as HomeIcon, Report as ReportIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
// context
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../context/LayoutContext";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// styles
import useStyles from "./styles";

// サイドメニューのリンク定義
// TODO:将来的にはAPI叩いてユーザの権限に基づいたメニューを取得するようにした方がいいかも
const structure = [
  { id: 0, label: "ダッシュボード", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "チケット管理",
    icon: <ReportIcon />,
    children: [
      { label: "チケット一覧", link: "/app/ticketlist" },
    ],
  },
  {
    id: 2,
    label: "アカウント管理",
    icon: <AccountBoxIcon />,
    isAdminPage: true,
    children: [
      { label: "アカウント一覧", link: "/app/accountList" },
    ],
  },
  {
    id: 3,
    label: "UI Elements",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Icons", link: "/app/ui/icons" },
      { label: "Charts", link: "/app/ui/charts" },
      { label: "Maps", link: "/app/ui/maps" },
    ],
  },
  { id: 4, type: "divider" },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
