import React, { useState, Component } from "react";
import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';

// styles
import useStyles from "./styles";


// export default function Dashboard(props) {
//   return (
//     <div>DashBord Page</div>
//   );
// }

const AUTH_ENDPOINT = 'http://localhost:8080/api/auth';
const LIST_ENDPOINT = 'http://localhost:8080/api/sbRandom';

// const axiosCookieJarSupport = require('axios-cookiejar-support').default;
// const tough = require('tough-cookie');

const getCookie = (cname) => {
  let name = cname + '=';
  let ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

class DashBoard extends Component {
  constructor(props) {
    super(props);
  }



  handleAuth() {
    axiosCookieJarSupport(axios);
    let cookieJar = new tough.CookieJar();
    axios
      .post(AUTH_ENDPOINT,
        {
          mailAddress: 'admin@localhost',
          password: 'secret'
        },
        {
          jar: cookieJar,
          withCredentials: true,
        }
      )
      .then((response) => {
        const config = response.config;
        console.log("認証のレスポンス：" + JSON.stringify(config.jar.toJSON()));
      })
      .catch((err) => {
        console.error(err.stack || err);
      });


    // let instance = axios.create(
    //   {
    //     mailAddress: 'admin@localhost',
    //     password: 'secret'
    //   },
    //   {
    //     jar: cookieJar,
    //     withCredentials: true
    //   });
    // let res = instance.post(AUTH_ENDPOINT);
    // console.log("認証のres:" + JSON.stringify(res.data));
    // console.log("認証のAPI実行後のcsrftoken:" + res.data.csrf_token);

  }

  handleGetList() {
    axiosCookieJarSupport(axios);
    let cookieJar = new tough.CookieJar();

    let instance = axios.create(
      {
        jar: cookieJar,
        withCredentials: true
      });


    console.log("XSRF-TOKEN:" + getCookie("XSRF-TOKEN"));
    instance.defaults.headers['X-XSRF-TOKEN'] = getCookie("XSRF-TOKEN");

    let res = instance.get(LIST_ENDPOINT);
    console.log(res.statusCode);
    console.log(res);

    // axios
    //   .get(LIST_ENDPOINT,
    //     {
    //       withCredentials: true,
    //       xsrfCookieName: "XSRF-TOKEN",
    //       xsrfHeaderName: getCookie("XSRF-TOKEN")
    //     }
    //   )
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log("一覧取得失敗：" + err)
    //   });


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
