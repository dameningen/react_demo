// Picker
import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, MenuItem, Paper } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ja from 'date-fns/locale/ja';
import { Select, TextField } from 'final-form-material-ui';
import React, { Component } from "react";
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { fetchTicketDetail, updateTicketDetail } from '../../actions/ticketDetailActions';
import DateTimeDisplay from "../../components/DateTimeDisplay/DateTimeDisplay";
import PageTitle from "../../components/PageTitle/PageTitle";

/**
 * materilal-uiのKeyboardDateTimePickerWrapperラッパー。
 * ※material-uiのDatePickerは最新のdate-ioを
 * インストールするとエラーになって動かないので1.3.13版を利用する必要がある。
 * @param {*} props 
 */
function KeyboardDateTimePickerWrapper(props) {
    const {
        input: { name, onChange, value, ...restInput },
        meta,
        ...rest
    } = props;
    const showError =
        ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
        meta.touched;


    return (
        <KeyboardDateTimePicker
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value === '' ? null : value}
            inputVariant="outlined"
            autoOk={true}
            ampm={false}
            disablePast
            format="yyyy/MM/dd HH:mm"
        />
    );
}

/**
 * フォームのValidation設定。
 * @param {*} values 
 */
const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = '入力必須項目';
    }
    return errors;
};

class TicketDetail extends Component {

    componentDidMount() {
        const { params } = this.props.match;
        const ticketId = params.id;
        // チケットIDをパラメータにしてチケット情報を取得する
        this.props.dispatch(fetchTicketDetail(ticketId));
    }

    onSubmit = async values => {
        // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        // await sleep(300);
        // window.alert(JSON.stringify(values, 0, 2));
        // TODO チケット更新に不要な情報を削除する（サーバ側でやる方が良いかも？）
        delete values.author.authorities;
        delete values.author.createdAt;
        delete values.author.updatedAt;
        delete values.updater.authorities;
        delete values.updater.createdAt;
        delete values.updater.updatedAt;
        delete values.assignedUser.authorities;
        delete values.assignedUser.createdAt;
        delete values.assignedUser.updatedAt;

        // チケット情報を更新する
        this.props.dispatch(updateTicketDetail(values));
    };

    render() {
        return (
            <>
                <PageTitle title="チケット詳細" />
                <div style={{ padding: 16, margin: 'auto' }}>
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
                                                name="title"
                                                component={TextField}
                                                type="text"
                                                label="チケットタイトル"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label>登録日：</label><DateTimeDisplay val={this.props.val.createdAt} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label>登録日：</label><DateTimeDisplay val={this.props.val.updatedAt} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                variant="outlined"
                                                fullWidth
                                                name="category.code"
                                                component={Select}
                                                label="分類"
                                                formControlProps={{ fullWidth: true }}>
                                                <MenuItem value={1}>質問</MenuItem>
                                                <MenuItem value={2}>クレーム</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                variant="outlined"
                                                fullWidth
                                                name="priority.code"
                                                component={Select}
                                                label="優先度"
                                                formControlProps={{ fullWidth: true }}>
                                                <MenuItem value={1}>高</MenuItem>
                                                <MenuItem value={2}>中</MenuItem>
                                                <MenuItem value={3}>低</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                variant="outlined"
                                                fullWidth
                                                name="status.code"
                                                component={Select}
                                                label="ステータス"
                                                formControlProps={{ fullWidth: true }}>
                                                <MenuItem value={1}>新規</MenuItem>
                                                <MenuItem value={2}>割り当て済み</MenuItem>
                                                <MenuItem value={3}>解決済み</MenuItem>
                                                <MenuItem value={4}>承認済み</MenuItem>
                                                <MenuItem value={5}>不承認</MenuItem>
                                                <MenuItem value={6}>終了</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                fullWidth
                                                required
                                                name="description"
                                                component={TextField}
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                type="text"
                                                label="説明"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field
                                                name="correspondence"
                                                fullWidth
                                                component={TextField}
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                type="text"
                                                label="対応内容"
                                            />
                                        </Grid>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                            <Grid item xs={12}>
                                                <Field
                                                    variant="outlined"
                                                    name="deadLine"
                                                    component={KeyboardDateTimePickerWrapper}
                                                    margin="normal"
                                                    label="期限"
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        <Grid item xs={4}>
                                            <Field
                                                variant="outlined"
                                                fullWidth
                                                name="author.id"
                                                component={Select}
                                                label="登録者"
                                                formControlProps={{ fullWidth: true }}>
                                                <MenuItem value={1}>admin</MenuItem>
                                                <MenuItem value={2}>user</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                variant="outlined"
                                                fullWidth
                                                name="updater.id"
                                                component={Select}
                                                label="更新者"
                                                formControlProps={{ fullWidth: true }}>
                                                <MenuItem value={1}>admin</MenuItem>
                                                <MenuItem value={2}>user</MenuItem>
                                            </Field>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Field
                                                variant="outlined"
                                                fullWidth
                                                name="assignedUser.id"
                                                component={Select}
                                                label="担当者"
                                                formControlProps={{ fullWidth: true }}>
                                                <MenuItem value={1}>admin</MenuItem>
                                                <MenuItem value={2}>user</MenuItem>
                                            </Field>
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
            </>
        );

    }
}

const mapStateToProps = (state) => {
    return { val: state.ticketDetailState.items };
};

export default connect(mapStateToProps)(TicketDetail);
