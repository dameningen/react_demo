import classnames from "classnames";
import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
// context
import { useLayoutState } from "../../context/LayoutContext";
// pages
import Dashboard from "../../pages/dashboard/Dashboard";
import Icons from "../../pages/icons/Icons";
import Tables from "../../pages/tables/Tables";
import TicketList from "../../pages/ticket/TicketList";
// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
// styles
import useStyles from "./styles";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/ticketList" component={TicketList} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/icons" component={Icons} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
