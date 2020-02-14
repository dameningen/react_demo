import { Drawer, IconButton, List } from "@material-ui/core";
import {
  AccountBox as AccountBoxIcon,
  ArrowBack as ArrowBackIcon,
  BorderAll as TableIcon,
  FilterNone as UIElementsIcon,
  HelpOutline as FAQIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  QuestionAnswer as SupportIcon,
  Report as ReportIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
// context
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../context/LayoutContext";
import Dot from "./components/Dot";
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
    label: "チケット一覧",
    link: "/app/ticketlist",
    icon: <ReportIcon />,
  },
  { id: 2, label: "アカウント管理", link: "/app/account", icon: <AccountBoxIcon />, isAdminPage: true, },
  {
    id: 3,
    label: "Notifications",
    link: "/app/notifications",
    icon: <AccountBoxIcon />,
  },
  {
    id: 4,
    label: "UI Elements",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Icons", link: "/app/ui/icons" },
      { label: "Charts", link: "/app/ui/charts" },
      { label: "Maps", link: "/app/ui/maps" },
    ],
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "PROJECTS" },
  {
    id: 12,
    label: "My recent",
    link: "",
    icon: <Dot size="large" color="warning" />,
  },
  {
    id: 13,
    label: "Starred",
    link: "",
    icon: <Dot size="large" color="primary" />,
  },
  {
    id: 14,
    label: "Background",
    link: "",
    icon: <Dot size="large" color="secondary" />,
  },
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
