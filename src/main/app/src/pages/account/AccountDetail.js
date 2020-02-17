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
    if (!values.password) {
        errors.password = "入力必須項目";
    }
    if (!values.confirm) {
        errors.confirm = "入力必須項目";
    } else if (values.confirm !== values.password) {
        errors.confirm = "パスワード入力不一致";
    }
    return errors;
};

class AccountDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.val
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        const accountId = params.id;
        // アカウントIDをパラメータにしてアカウント情報を取得する
        this.props.dispatch(fetchAccountDetail(accountId));
    }

    onSubmit = async values => {
        // TODO 一旦権限を無視
        delete values.authorities;
        values.authorities = ['ROLE_ADMIN', 'ROLE_USER'];

        // アカウント情報を更新する
        this.props.dispatch(updateAccountDetail(values));
    };

    handleChange = () => {
        console.log('test');
    };

    render() {
        return (
            <div style={{ padding: 16, margin: 'auto' }}>
                <CssBaseline />
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={this.props.val}
                    validate={validate}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" value={this.props.val.id} />
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
                                        <Field
                                            variant="outlined"
                                            fullWidth
                                            required
                                            name="password"
                                            component={TextField}
                                            type="password"
                                            label="パスワード"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            variant="outlined"
                                            fullWidth
                                            required
                                            name="confirm"
                                            component={TextField}
                                            type="password"
                                            label="パスワード確認"
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
                                                            onChange={this.handleChange()}
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
                                        <label>登録日：{this.props.val.createdAt ? format(parseISO(this.props.val.createdAt), 'yyyy年MM月dd日 HH:mm', { local: ja }) : null}</label>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <label>更新日：{this.props.val.updatedAt ? format(parseISO(this.props.val.updatedAt), 'yyyy年MM月dd日 HH:mm', { local: ja }) : null}</label>
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

//const mapStateToProps = (response) => ({ response });
const mapStateToProps = (response) => {
    return { val: response.accountDetailState.items };
};

export default connect(mapStateToProps)(AccountDetail);
