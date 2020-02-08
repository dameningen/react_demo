import React, { useState, Component } from "react";
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import LoadingOverlay from 'react-loading-overlay';

import { apiCallPost } from '../../libs/common/apiCall';
import { fetchSbRandom } from '../../actions/springBootRandomActions';

const AUTH_ENDPOINT = 'http://localhost:8080/api/auth';
const USESR_CREATE_ENDPOINT = 'http://localhost:8080/api/user/create';

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

  render() {

    return (
      <div className="app">
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
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(DashBoard);
