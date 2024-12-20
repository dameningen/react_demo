import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  errorMessage: {
    textAlign: "center",
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
}));
