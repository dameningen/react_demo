import React from "react";
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
    Typography,
    Paper,
    Link,
    Grid,
    Button,
    CssBaseline,
    RadioGroup,
    FormLabel,
    MenuItem,
    FormGroup,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';
// Picker
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from '@material-ui/pickers';
import ja from 'date-fns/locale/ja'


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

export default function TicketDetail() {
    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <CssBaseline />
            <Form
                onSubmit={onSubmit}
                initialValues={{ employed: true, stooge: 'larry' }}
                validate={validate}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="firstName"
                                        component={TextField}
                                        type="text"
                                        label="First Name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="lastName"
                                        component={TextField}
                                        type="text"
                                        label="Last Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="email"
                                        fullWidth
                                        required
                                        component={TextField}
                                        type="email"
                                        label="Email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        label="Employed"
                                        control={
                                            <Field
                                                name="employed"
                                                component={Checkbox}
                                                type="checkbox"
                                            />
                                        }
                                    />
                                </Grid>
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
                                        component={TextField}
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
                                        formControlProps={{ fullWidth: true }}
                                    >
                                        <MenuItem value="London">London</MenuItem>
                                        <MenuItem value="Paris">Paris</MenuItem>
                                        <MenuItem value="Budapest">
                                            A city with a very long Name
                      </MenuItem>
                                    </Field>
                                </Grid>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                                    <Grid item xs={6}>
                                        <Field
                                            name="date"
                                            component={DatePickerWrapper}
                                            fullWidth
                                            margin="normal"
                                            label="日付"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            name="time"
                                            component={TimePickerWrapper}
                                            fullWidth
                                            margin="normal"
                                            label="時間"
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                    >
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