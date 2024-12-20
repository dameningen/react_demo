import { Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { getAccountList } from '../../actions/accountListActions';
import PageTitle from "../../components/PageTitle/PageTitle";
import { convDateTIme } from "../../libs/common/dateUtil";

class AccountList extends Component {

  componentDidMount() {
    this.props.dispatch(getAccountList());
  }

  /**
 * アカウントIDを指定してアカウント詳細ページに遷移する。
 * @param {*} accountId
 */
  fowardAccountDetail(accountId) {
    // ID指定でアカウント情報を取得し、アカウント詳細画面に遷移する
    this.props.history.push('/app/account/' + accountId)
  }

  columns = [
    { name: "id", label: "ID", },
    { name: "username", label: "アカウント名", },
    { name: "mailAddress", label: "メールアドレス", },
    {
      name: "roles",
      label: "権限",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let authorities = '';
          for (let i = 0; i < value.length; i++) {
            if (i === 0) {
              authorities = value[i];
            } else {
              authorities = authorities + ', ' + value[i];
            }
          }
          return (
            <>
              {authorities}
            </>
          );
        }
      },
    },
    {
      name: "createdAt",
      label: "登録日",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {convDateTIme(value)}
            </>
          );
        }
      },
    },
    {
      name: "updatedAt",
      label: "更新日",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {convDateTIme(value)}
            </>
          );
        }
      },
    },
    {
      name: "Actions",
      label: "更新ボタン",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="outlined" color="secondary" onClick={() => this.fowardAccountDetail(tableMeta.rowData[0])}>
              {'更新'}
            </Button>
          );
        }
      },
    }
  ]


  render() {

    return (
      <div className="app">
        <PageTitle title="アカウント一覧" />
        <LoadingOverlay
          active={this.props.response.accountListState.isLoading}
          spinner
          text='Loading ...'>
          <MUIDataTable
            title="アカウント一覧"
            data={this.props.response.accountListState.items}
            columns={this.columns} />
        </LoadingOverlay>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(AccountList);
