import { CssBaseline } from '@material-ui/core';
import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { fetchTicketList } from '../../actions/ticketListActions';

const columns = [
    {
        name: "id",
        label: "ID",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "priority",
        label: "優先度",
        options: {
            filter: true,
            sort: false,
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
        }
    },
    {
        name: "deadLine",
        label: "期限",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "author.username",
        label: "チケット登録者",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "updater.username",
        label: "チケット更新者",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "assignedUser.username",
        label: "担当者",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "createdAt",
        label: "登録日",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "updatedAt",
        label: "更新日",
        options: {
            filter: true,
            sort: false,
        }
    },
]

class TicketList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchTicketList());
    }

    render() {
        return (
            <div style={{ padding: 16, margin: 'auto', }}>
                <CssBaseline />
                <LoadingOverlay
                    active={this.props.response.ticketListState.isLoading}
                    spinner
                    text='Loading ...'
                >
                    <MUIDataTable
                        title="チケット一覧"
                        data={this.props.response.ticketListState.items}
                        columns={columns}
                        options={
                            {
                                filterType: "checkbox",
                            }
                        } />
                </LoadingOverlay>
            </div>
        );
    }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(TicketList);
