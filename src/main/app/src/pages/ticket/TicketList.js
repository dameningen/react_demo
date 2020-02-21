import { Button, CssBaseline } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { fetchTicketList } from '../../actions/ticketListActions';
import { convDateTIme } from "../../libs/common/dateUtil";


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
            name: "author",
            label: "チケット登録者",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "updater",
            label: "チケット更新者",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "assignedUser",
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
    async fowardTicketDetail(ticketId) {
        try {
            // ID指定でチケット情報を取得し、チケット詳細画面に遷移する
            // await apiCallGet('http://localhost:8080/api/ticket/' + ticketId);
            this.props.history.push('/app/ticket/' + ticketId)

        } catch (error) {
            console.error(error.stack || error);
        }
    }

    dataConvert(data) {
        let ticketList = [];
        let apiResArray = data;
        console.log("★チケットリスト数：" + apiResArray.length);
        for (let i = 0; i < apiResArray.length; i++) {
            let tmpTicket =
            {
                id: apiResArray[i].id,
                priority: apiResArray[i].priority.name,
                title: apiResArray[i].title,
                category: apiResArray[i].category.name,
                description: apiResArray[i].description,
                status: apiResArray[i].status.name,
                deadLine: convDateTIme(apiResArray[i].deadLine),
                author: apiResArray[i].author.username,
                updater: apiResArray[i].updater.username,
                assignedUser: apiResArray[i].assignedUser ? apiResArray[i].assignedUser.username : '',
                createdAt: convDateTIme(apiResArray[i].createdAt),
                updatedAt: convDateTIme(apiResArray[i].updatedAt),
            };
            ticketList.push(tmpTicket);
        }
        return ticketList;
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
                        data={this.dataConvert(this.props.response.ticketListState.items)}
                        columns={this.columns}
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
