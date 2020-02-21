import { Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { fetchSbRandom } from '../../actions/springBootRandomActions';
import PageTitle from "../../components/PageTitle/PageTitle";
import { apiCallGet, apiCallPost } from '../../libs/common/apiCall';

const AUTH_ENDPOINT = 'http://localhost:8080/api/auth';
const GET_ACCOUNT_INFO_ENDPOINT = 'http://localhost:8080/api/account/getCurrentAccountInfo';
const IS_ADMIN_ENDPOINT = 'http://localhost:8080/api/account/isAdminUser';
const USESR_CREATE_ENDPOINT = 'http://localhost:8080/api/user/create';
const TICKET_CREATE_ENDPOINT = 'http://localhost:8080/api/ticket/create';

const TICKET_LIST_ENDPOINT = 'http://localhost:8080/api/ticket/0/10';
const ACCOUNT_LIST_ENDPOINT = 'http://localhost:8080/api/account/0/10';
const ACCOUNT_ID_ENDPOINT = 'http://localhost:8080/api/account/1';

/**
 * テーブル表示用のカラム設定値
 */
const columns = [
  {
    name: "type",
    label: "タイプ",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "value.id",
    label: "ID",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "value.quote",
    label: "文言",
    options: {
      filter: true,
      sort: false,
    }
  }
]


class DashBoard extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.dispatch(fetchSbRandom());
  }

  handleAuth() {
    let params = {
      mailAddress: 'admin@localhost',
      password: 'secret'
    }
    apiCallPost(AUTH_ENDPOINT, params);
  }

  handleGetList() {
    this.props.dispatch(fetchSbRandom());
  }

  handleAddUser() {
    let params = {
      id: "9",
      email: "user1@localhost",
      password: "pass",
      roles: "ROLE_CUSTOMER"
    }
    apiCallPost(USESR_CREATE_ENDPOINT, params);
  }

  handleGetUser() {
    apiCallGet(GET_ACCOUNT_INFO_ENDPOINT);
  }

  handleIsAdmin() {
    apiCallGet(IS_ADMIN_ENDPOINT);
  }

  handleCreateTicket() {
    let params = {
      priority: { code: 1 },
      title: "新規チケット",
      category: { code: 2 },
      description: "新規チケットの説明何かをいっぱい書いたりする。",
    }
    apiCallPost(TICKET_CREATE_ENDPOINT, params);

  }

  handleGetTicketList() {
    apiCallGet(TICKET_LIST_ENDPOINT);
  }

  handleGetAccountList() {
    apiCallGet(ACCOUNT_LIST_ENDPOINT);
  }

  handleGetAccountInfo() {
    apiCallGet(ACCOUNT_ID_ENDPOINT);
  }

  render() {

    return (
      <div className="app">
        <PageTitle title="ダッシュボード" />
        <LoadingOverlay
          active={this.props.response.sbRandomState.isLoading}
          spinner
          text='Loading ...'
        >
          <MUIDataTable
            title="Springの何か格言的なやつ"
            data={this.props.response.sbRandomState.items}
            columns={columns}
            options={
              {
                filterType: "checkbox",
              }
            } />
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
          <input
            type="button"
            value="ユーザー登録"
            onClick={() => this.handleAddUser()}
          />
          <Button variant="contained" onClick={() => this.handleGetUser()}>
            アカウント情報取得
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.handleIsAdmin()}>
            ユーザー権限判定
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.handleCreateTicket()}>
            チケット新規登録
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.handleGetTicketList()}>
            チケットリスト取得
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.handleGetAccountList()}>
            アカウントリスト取得
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.handleGetAccountInfo()}>
            アカウント情報取得
          </Button>
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(DashBoard);
