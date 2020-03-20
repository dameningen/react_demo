import { Button, CssBaseline } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { deleteTicketDetail, registerTicketDetail } from '../../actions/ticketDetailActions';
import { getTicketList } from '../../actions/ticketListActions';
import PageTitle from "../../components/PageTitle/PageTitle";
import { convDateTIme } from "../../libs/common/dateUtil";


class TicketList extends Component {

    componentDidMount() {
        // チケット情報一覧取得
        this.props.dispatch(getTicketList());
    }

    /**
     * チケットIDを指定してチケット詳細ページに遷移する。
     * @param {*} ticketId チケットID
     */
    fowardTicketDetail(ticketId) {
        // ID指定でチケット情報を取得し、チケット詳細画面に遷移する
        this.props.history.push('/app/ticket/' + ticketId)
    }

    /**
     * チケットを削除する
     * @param {*} ticketId 削除対象チケットID
     */
    deleteTicket(ticketId) {
        // チケット情報削除
        this.props.dispatch(deleteTicketDetail(ticketId));
        // チケット情報一覧再取得
        this.props.dispatch(getTicketList());
    }

    // TODO チケット新規追加ボタン処理
    registerTicket() {
        var params = {
            priority: { code: 1 },
            category: { code: 2 },
            title: "新規チケット",
            description: "新規チケットの説明何かをいっぱい書いたりする。",
            author: { id: 1, },
            updater: { id: 1, },
        };
        this.props.dispatch(registerTicketDetail(params));
    }

    // チケット情報一覧のカラム定義
    columns = [
        { name: "id", label: "ID", },
        { name: "category.name", label: "分類" },
        { name: "priority.name", label: "優先度" },
        { name: "title", label: "タイトル", },
        { name: "description", label: "説明", },
        { name: "status.name", label: "ステータス", },
        {
            name: "deadLine",
            label: "期限",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {convDateTIme(value)}
                        </>
                    );
                }
            }
        },
        { name: "author.username", label: "チケット登録者", },
        { name: "updater.username", label: "チケット更新者", },
        { name: "assignedUser.username", label: "担当者", },
        {
            name: "createdAt",
            label: "登録日",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {convDateTIme(value)}
                        </>
                    );
                }
            }
        },
        {
            name: "updatedAt",
            label: "更新日",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {convDateTIme(value)}
                        </>
                    );
                }
            }
        },
        {
            name: "updateButton",
            label: "更新ボタン",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => this.fowardTicketDetail(tableMeta.rowData[0])}>
                            {'更新'}
                        </Button>
                    );
                }
            },
        },
        {
            name: "deleteeButton",
            label: "削除ボタン",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => this.deleteTicket(tableMeta.rowData[0])}>
                            {'削除'}
                        </Button>
                    );
                }
            },
        }
    ]

    render() {
        return (
            <>
                <PageTitle title="チケット一覧" />
                <div style={{ padding: 16, margin: 'auto', }}>
                    <CssBaseline />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.registerTicket()}>
                        {'新規追加（簡略版）'}
                    </Button>
                    <LoadingOverlay
                        active={this.props.isLoading}
                        spinner
                        text='Loading ...'>
                        <MUIDataTable
                            title="チケット一覧"
                            data={this.props.val}
                            columns={this.columns}
                            options={
                                {
                                    filterType: "checkbox",
                                }
                            } />
                    </LoadingOverlay>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        val: state.ticketListState.items,
        isLoading: state.ticketListState.isLoading,
    };
};

export default connect(mapStateToProps)(TicketList);
