import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchTicketSubInfo } from '../../actions/ticketSubInfoActions';

class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        // チケットサブ情報を取得する
        this.props.dispatch(fetchTicketSubInfo());
    }

    render() {

        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">ステータス</InputLabel>
                    <Select style={{ width: '300px' }}>
                        {
                            this.props.subInfo.ticketStatuses ?
                                this.props.subInfo.ticketStatuses.map((d, idx) =>
                                    <MenuItem key={idx} value={d.code}>{d.name}</MenuItem>
                                )
                                : <MenuItem value={0}>null</MenuItem>
                        }
                    </Select>
                </FormControl>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subInfo: state.ticketSubInfoState.items
    };
};

export default connect(mapStateToProps)(SelectComponent);

