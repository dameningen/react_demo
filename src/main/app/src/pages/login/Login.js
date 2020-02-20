import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, Fade, Link, TextField, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
// context
import { loginUser, useUserDispatch } from "../../context/UserContext";
// styles
import useStyles from "./styles";

/**
 * 
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <div className={classes.form}>
          <React.Fragment>
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                メールアドレスまたはパスワードが間違っています。
              </Typography>
            </Fade>
            <TextField
              id="email"
              required
              variant="outlined"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="メールアドレス"
              label="メールアドレス"
              type="email"
              fullWidth
              autoFocus
            />
            <TextField
              id="password"
              required
              variant="outlined"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="パスワード"
              label="パスワード"
              type="password"
              fullWidth
            />
            <div>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      )
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    ログイン
                  </Button>
                )}
            </div>
          </React.Fragment>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
    </Container>
  );
}

export default withRouter(Login);
