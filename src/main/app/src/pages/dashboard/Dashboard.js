import React, { useState, Component } from "react";
import { apiCallGet, apiCallPost } from '../../libs/common/apiCall';

// export default function Dashboard(props) {
//   return (
//     <div>DashBord Page</div>
//   );
// }

const AUTH_ENDPOINT = 'http://localhost:8080/api/auth';
const LIST_ENDPOINT = 'http://localhost:8080/api/sbRandom';

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  handleAuth() {
    let params = {
      mailAddress: 'admin@localhost',
      password: 'secret'
    }
    apiCallPost(AUTH_ENDPOINT, params);
  }

  handleGetList() {
    // apiCallGet(LIST_ENDPOINT, {});
    apiCallGet(LIST_ENDPOINT);
  }

  render() {
    return (
      <div className="app">
        <input
          type="button"
          value="認証"
          onClick={() => this.handleAuth()}
        />
        <input
          type="button"
          value="一覧取得"
          onClick={() => this.handleGetList()}
        />
      </div>
    );
  }
}

export default DashBoard;
