// Picker
import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, MenuItem, Paper } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ja from 'date-fns/locale/ja';
import { Select, TextField } from 'final-form-material-ui';
import React, { Component } from "react";
import { Field, Form } from 'react-final-form';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { getAccountList } from '../../actions/accountListActions';
import { getTicketDetail, updateTicketDetail } from '../../actions/ticketDetailActions';
import { getTicketSubInfo } from '../../actions/ticketSubInfoActions';
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
 * セレクトボックスを描画する。
 * @param {*} props 
 */
function FieldSelect(props) {
    // MenuItemのvalueとして設定する値を保持するキー名
    let itemvalkey = props.itemvalkey;
    // MenuItemのラベルとして設定する値を保持するキー名
    let itemlabelkey = props.itemlabelkey;

    return (
        <>
            <Field {...props}>
                {props.itemval ?
                    props.itemval.map((d, idx) =>
                        <MenuItem key={idx} value={d[itemvalkey]}>{d[itemlabelkey]}</MenuItem>
                    )
                    : <MenuItem value={0}>null</MenuItem>}
            </Field>
        </>
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
    constructor(props) {
        super(props);
        this.myRef = React.createRef(); // create a ref
        this.myFormRef = React.createRef(); // create a ref
    }

    componentDidMount() {
        const { params } = this.props.match;
        const ticketId = params.id;
        // チケットIDをパラメータにしてチケット情報を取得する
        this.props.dispatch(getTicketDetail(ticketId));
        // チケットサブ情報を取得する
        this.props.dispatch(getTicketSubInfo());
        // アカウントリストを取得する
        this.props.dispatch(getAccountList());
    }

    onSubmit = async values => {
        const { params } = this.props.match;
        const ticketId = params.id;
        values.id = ticketId;
        // チケット情報を更新する
        this.props.dispatch(updateTicketDetail(values));
    };

    setTitleVal = (updVal) => {
        console.log('★setTtitleVal:' + updVal);
        console.log('★setTtitleVal:' + this.myRef.current);
        console.log('★setTtitleVal:' + this.myRef.current.defaultValue);
        console.log('★this.val:' + JSON.stringify(this.props.val));
        console.log('★setTtitleVal:' + this.myFormRef.current.elements);
        setTimeout(() => {
            this.myRef.current.focus();
            this.myRef.current.click();
            this.myRef.current.select();
            this.myRef.current.value = updVal;
            if (this.props.val && this.props.val.correspondence) {
                this.props.val.correspondence = updVal;
            } else if (this.props.val) {
                console.log('test!!!');
                this.props.val.correspondence = updVal;
                console.log(this.props.val.correspondence);
            } else {
                this.props.val.push({ title: updVal });
            }
        }, 100);
    }

    render() {
        return (
            <>
                <PageTitle title="チケット詳細" />
                <div style={{ padding: 16, margin: 'auto' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => this.setTitleVal('test')}>
                        タイトル更新
                    </Button>
                    <LoadingOverlay
                        active={this.props.isLoading}
                        spinner
                        text='Loading ...'>
                        <Form
                            onSubmit={this.onSubmit}
                            initialValues={this.props.val}
                            validate={validate}
                            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit}
                                    ref={this.myFormRef}>
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
                                                <label>更新日：</label><DateTimeDisplay val={this.props.val.updatedAt} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FieldSelect
                                                    variant="outlined"
                                                    fullWidth
                                                    name="category.code"
                                                    component={Select}
                                                    label="分類"
                                                    formControlProps={{ fullWidth: true }}
                                                    itemval={this.props.subInfo.ticketCategories}
                                                    itemvalkey="code"
                                                    itemlabelkey="name">
                                                </FieldSelect>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FieldSelect
                                                    variant="outlined"
                                                    fullWidth
                                                    name="priority.code"
                                                    component={Select}
                                                    label="優先度"
                                                    formControlProps={{ fullWidth: true }}
                                                    itemval={this.props.subInfo.ticketPriorities}
                                                    itemvalkey="code"
                                                    itemlabelkey="name">
                                                </FieldSelect>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FieldSelect
                                                    variant="outlined"
                                                    fullWidth
                                                    name="status.code"
                                                    component={Select}
                                                    label="ステータス"
                                                    formControlProps={{ fullWidth: true }}
                                                    itemval={this.props.subInfo.ticketStatuses}
                                                    itemvalkey="code"
                                                    itemlabelkey="name">
                                                </FieldSelect>
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
                                                    inputRef={this.myRef}
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
                                                <FieldSelect
                                                    variant="outlined"
                                                    fullWidth
                                                    name="author.id"
                                                    component={Select}
                                                    label="登録者"
                                                    formControlProps={{ fullWidth: true }}
                                                    itemval={this.props.accountList}
                                                    itemvalkey="id"
                                                    itemlabelkey="username">
                                                </FieldSelect>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FieldSelect
                                                    variant="outlined"
                                                    fullWidth
                                                    name="updater.id"
                                                    component={Select}
                                                    label="更新者"
                                                    formControlProps={{ fullWidth: true }}
                                                    itemval={this.props.accountList}
                                                    itemvalkey="id"
                                                    itemlabelkey="username">
                                                </FieldSelect>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <FieldSelect
                                                    variant="outlined"
                                                    fullWidth
                                                    name="assignedUser.id"
                                                    component={Select}
                                                    label="担当者"
                                                    formControlProps={{ fullWidth: true }}
                                                    itemval={this.props.accountList}
                                                    itemvalkey="id"
                                                    itemlabelkey="username">
                                                </FieldSelect>
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
                    </LoadingOverlay>
                </div>
            </>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        val: state.ticketDetailState.items,
        isLoading: state.ticketDetailState.isLoading,
        subInfo: state.ticketSubInfoState.items,
        accountList: state.accountListState.items
    };
};

export default connect(mapStateToProps)(TicketDetail);
