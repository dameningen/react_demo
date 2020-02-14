// Picker
import DateFnsUtils from '@date-io/date-fns';
import { Button, CssBaseline, Grid, MenuItem, Paper } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ja from 'date-fns/locale/ja';
import { Select, TextField } from 'final-form-material-ui';
import React, { Component } from "react";
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { fetchTicketDetail } from '../../actions/ticketDetailActions';


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


const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};

const stringifyKeys = values =>
    Object.keys(values).reduce((result, key) => {
        result[key] = String(values[key])
        return result
    }, {})


class TicketDetail extends Component {

    componentDidMount() {
        const { params } = this.props.match;
        const ticketId = params.id;
        // チケットIDをパラメータにしてチケット情報を取得する
        this.props.dispatch(fetchTicketDetail(ticketId));
    }

    render() {
        return (
            <div style={{ padding: 16, margin: 'auto' }}>
                <CssBaseline />
                <Form
                    onSubmit={onSubmit}
                    initialValues={this.props.response.ticketDetailState.items}
                    validate={validate}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
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
                                    <Grid item xs={6}>
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
                                            name="author.username"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            label="登録者"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Field
                                            variant="outlined"
                                            name="updater.username"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            label="更新者"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Field
                                            variant="outlined"
                                            name="assignedUser.username"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            label="担当者"
                                        />
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                        <Grid item xs={6}>
                                            <Field
                                                variant="outlined"
                                                name="createdAt"
                                                component={KeyboardDateTimePickerWrapper}
                                                fullWidth
                                                margin="normal"
                                                label="登録日"
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                        <Grid item xs={6}>
                                            <Field
                                                variant="outlined"
                                                name="updatedAt"
                                                component={KeyboardDateTimePickerWrapper}
                                                fullWidth
                                                margin="normal"
                                                label="更新日"
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
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

export default connect(mapStateToProps)(TicketDetail);
