import { Button, CssBaseline } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { fetchTicketList } from '../../actions/ticketListActions';
import PageTitle from "../../components/PageTitle/PageTitle";
import { convDateTIme } from "../../libs/common/dateUtil";

/**
 * 
 * @param {*} value
 * @param {*} property 
 */
const getPropVal = (value, property) => {
    let retVal = '';
    if (value) {
        retVal = value[property];
    }
    return retVal
}

class TicketList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "category",
            label: "分類",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {getPropVal(value, 'name')}
                        </>
                    );
                }
            }
        },
        {
            name: "priority",
            label: "優先度",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {getPropVal(value, 'name')}
                        </>
                    );
                }
            }
        },
        {
            name: "title",
            label: "タイトル",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "description",
            label: "説明",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "status",
            label: "ステータス",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {getPropVal(value, 'name')}
                        </>
                    );
                }
            }
        },
        {
            name: "deadLine",
            label: "期限",
            options: {
                filter: true,
                sort: false,
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
            name: "author",
            label: "チケット登録者",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {getPropVal(value, 'username')}
                        </>
                    );
                }
            }
        },
        {
            name: "updater",
            label: "チケット更新者",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {getPropVal(value, 'username')}
                        </>
                    );
                }
            }
        },
        {
            name: "assignedUser",
            label: "担当者",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {getPropVal(value, 'username')}
                        </>
                    );
                }
            }
        },
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
            name: "Actions",
            label: "更新ボタン",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button variant="outlined" color="secondary" onClick={() => this.fowardTicketDetail(tableMeta.rowData[0])}>
                            {'更新'}
                        </Button>
                    );
                }
            },
        }
    ]


    /**
     * チケットIDを指定してチケット詳細ページに遷移する。
     * @param {*} ticketId 
     */
    fowardTicketDetail(ticketId) {
        // ID指定でチケット情報を取得し、チケット詳細画面に遷移する
        this.props.history.push('/app/ticket/' + ticketId)
    }

    componentDidMount() {
        this.props.dispatch(fetchTicketList());
    }

    render() {
        return (
            <>
                <PageTitle title="チケット一覧" />
                <div style={{ padding: 16, margin: 'auto', }}>
                    <CssBaseline />
                    <LoadingOverlay
                        active={this.props.val.isLoading}
                        spinner
                        text='Loading ...'
                    >
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
    return { val: state.ticketListState.items };
};

export default connect(mapStateToProps)(TicketList);
