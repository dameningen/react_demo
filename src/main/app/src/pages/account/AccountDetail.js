// Picker
import { Button, CssBaseline, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { Checkbox, TextField } from 'final-form-material-ui';
import React, { Component } from "react";
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { fetchAccountDetail, updateAccountDetail } from '../../actions/accountDetailActions';

/**
 * フォームのValidation設定。
 * @param {*} values 
 */
const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = '入力必須項目';
    }
    return errors;
};

class AccountDetail extends Component {

    componentDidMount() {
        const { params } = this.props.match;
        const ticketId = params.id;
        // チケットIDをパラメータにしてチケット情報を取得する
        this.props.dispatch(fetchAccountDetail(ticketId));
    }

    onSubmit = async values => {
        // アカウント情報を更新する
        this.props.dispatch(updateAccountDetail(values));
    };

    render() {
        return (
            <div style={{ padding: 16, margin: 'auto' }}>
                <CssBaseline />
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={this.props.response.accountDetailState.items}
                    validate={validate}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" value={this.props.response.accountDetailState.items.id} />
                            <Paper style={{ padding: 16 }}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            fullWidth
                                            required
                                            name="username"
                                            component={TextField}
                                            type="text"
                                            label="アカウント名"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            fullWidth
                                            required
                                            name="mailAddress"
                                            component={TextField}
                                            type="text"
                                            label="メールアドレス"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">権限</FormLabel>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    label="管理者"
                                                    control={
                                                        <Field
                                                            name="authorities"
                                                            component={Checkbox}
                                                            type="checkbox"
                                                            value="ROLE_ADMIN"
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="マネージャー"
                                                    control={
                                                        <Field
                                                            name="authorities"
                                                            component={Checkbox}
                                                            type="checkbox"
                                                            value="ROLE_MANAGER"
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="一般ユーザ"
                                                    control={
                                                        <Field
                                                            name="authorities"
                                                            component={Checkbox}
                                                            type="checkbox"
                                                            value="ROLE_USER"
                                                        />
                                                    }
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label>登録日：{this.props.response.accountDetailState.items.createdAt ? format(parseISO(this.props.response.accountDetailState.items.createdAt), 'yyyy年MM月dd日 HH:mm', { local: ja }) : null}</label>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label>更新日：{this.props.response.accountDetailState.items.updatedAt ? format(parseISO(this.props.response.accountDetailState.items.updatedAt), 'yyyy年MM月dd日 HH:mm', { local: ja }) : null}</label>
                                    </Grid>
                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={reset}
                                            disabled={submitting || pristine}>
                                            Reset
                                        </Button>
                                    </Grid>
                                    <Grid item style={{ marginTop: 16 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled={submitting}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                    )}
                />
            </div>
        );

    }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(AccountDetail);
