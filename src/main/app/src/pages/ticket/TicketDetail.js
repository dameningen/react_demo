// Picker
import DateFnsUtils from '@date-io/date-fns';
import { Button, CssBaseline, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Paper, RadioGroup } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import ja from 'date-fns/locale/ja';
import { Checkbox, Radio, Select, TextField } from 'final-form-material-ui';
import React, { Component } from "react";
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { fetchTicketDetail } from '../../actions/ticketDetailActions';


function DatePickerWrapper(props) {
    const {
        input: { name, onChange, value, ...restInput },
        meta,
        ...rest
    } = props;
    const showError =
        ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
        meta.touched;

    return (
        <DatePicker
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value === '' ? null : value}
            autoOk={true}
        />
    );
}

function TimePickerWrapper(props) {
    const {
        input: { name, onChange, value, ...restInput },
        meta,
        ...rest
    } = props;
    const showError =
        ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
        meta.touched;

    return (
        <TimePicker
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value === '' ? null : value}
            ampm={false}
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
                        <form onSubmit={handleSubmit} noValidate>
                            <Paper style={{ padding: 16 }}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            fullWidth
                                            required
                                            name="category"
                                            component={TextField}
                                            type="text"
                                            label="分類"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            fullWidth
                                            required
                                            name="title"
                                            component={TextField}
                                            type="text"
                                            label="チケットタイトル"
                                        />
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
                                            required
                                            component={TextField}
                                            multiline
                                            rows={6}
                                            variant="outlined"
                                            type="text"
                                            label="対応内容"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            name="status"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            label="ステータス"
                                        />
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                        <Grid item xs={6}>
                                            <Field
                                                name="deadLine"
                                                component={DatePickerWrapper}
                                                fullWidth
                                                margin="normal"
                                                label="期限"
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <Grid item xs={6}>
                                        <Field
                                            name="author.username"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            label="登録者"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            name="updater.username"
                                            fullWidth
                                            required
                                            component={TextField}
                                            type="text"
                                            label="更新者"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
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
                                                name="createdAt"
                                                component={DatePickerWrapper}
                                                fullWidth
                                                margin="normal"
                                                label="登録日"
                                                initialValue={this.props.response.ticketDetailState.items.createdAt}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                        <Grid item xs={6}>
                                            <Field
                                                name="updatedAt"
                                                component={DatePickerWrapper}
                                                fullWidth
                                                margin="normal"
                                                label="更新日"
                                                initialValue={this.props.response.ticketDetailState.items.updatedAt}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <Grid item>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Best Stooge</FormLabel>
                                            <RadioGroup row>
                                                <FormControlLabel
                                                    label="Larry"
                                                    control={
                                                        <Field
                                                            name="stooge"
                                                            component={Radio}
                                                            type="radio"
                                                            value="larry"
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="Moe"
                                                    control={
                                                        <Field
                                                            name="stooge"
                                                            component={Radio}
                                                            type="radio"
                                                            value="moe"
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="Curly"
                                                    control={
                                                        <Field
                                                            name="stooge"
                                                            component={Radio}
                                                            type="radio"
                                                            value="curly"
                                                        />
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Sauces</FormLabel>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    label="Ketchup"
                                                    control={
                                                        <Field
                                                            name="sauces"
                                                            component={Checkbox}
                                                            type="checkbox"
                                                            value="ketchup"
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="Mustard"
                                                    control={
                                                        <Field
                                                            name="sauces"
                                                            component={Checkbox}
                                                            type="checkbox"
                                                            value="mustard"
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="Salsa"
                                                    control={
                                                        <Field
                                                            name="sauces"
                                                            component={Checkbox}
                                                            type="checkbox"
                                                            value="salsa"
                                                        />
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="Guacamole 🥑"
                                                    control={
                                                        <Field
                                                            name="sauces"
                                                            component={Checkbox}
                                                            type="checkbox"
                                                            value="guacamole"
                                                        />
                                                    }
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="notes"
                                            component="textarea"
                                            multiline
                                            label="Notes"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            fullWidth
                                            name="city"
                                            component={Select}
                                            label="Select a City"
                                            formControlProps={{ fullWidth: true }}>
                                            <MenuItem value="London">London</MenuItem>
                                            <MenuItem value="Paris">Paris</MenuItem>
                                            <MenuItem value="Budapest">
                                                A city with a very long Name
                                            </MenuItem>
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
        );

    }
}

const mapStateToProps = (response) => ({ response });

export default connect(mapStateToProps)(TicketDetail);
