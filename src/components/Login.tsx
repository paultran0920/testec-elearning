import styled from "@emotion/styled";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { Formik } from "formik";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ILogin } from "../models/models";
import { StledTypography } from "./SharedComponents";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Persistent } from "../persistent/PersistentFactory";
import { Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";

const StledLoginPage = styled("div")({
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "60%",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
});

const validateField = (values: any) => {
  const errors: any = {};
  if (!values.username) {
    errors.username = "UserName is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const StyledTextField = styled(TextField)({
  "& .MuiInput-root": {
    color: "#3A719B",
    ":before": {
      borderBottomColor: "#3A719B",
    },
  },
  "& .MuiInputAdornment-root": {
    color: "#3A719B",
  },
});

const StledPageBodySend = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  button: {
    width: "50%",
    backgroundColor: "#0B2B5B",
    color: "#FFFFFF",
    borderRadius: "34.5px",
    marginBottom: "40px",
    marginTop: "40px",
  },
});

export default function Login() {
  const { contextData, setContextData } = useContext(AppContext);

  const doLogin = async (loginInfo: ILogin) => {
    try {
      const result = await Persistent.login(loginInfo);
      const accessToken = result.access_token;
      Persistent.accessToken = accessToken; // Should save into cookie

      try {
        const user = await Persistent.fetchUser(loginInfo.username);
        if (user) {
          setContextData({
            ...contextData,
            currentUser: user,
          });
        }
      } catch (err) {
        if (err) {
          setContextData({
            ...contextData,
            error: `Can not fetch user info for ${loginInfo.username}`,
          });
        }
      }
    } catch (err) {
      if (err) {
        setContextData({
          ...contextData,
          error: `The username or password is not correct!`,
        });
      }
    }
  };

  if (contextData.currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <MainLayout hasHeader={true} hasFooter={false}>
      <StledLoginPage>
        <StledTypography fontSize={"24px"} marginTop={"34px"}>
          Login
        </StledTypography>

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validate={(values) => {
            const errors = validateField(values);
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            doLogin(values).then(() => {
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} pl={7} pr={7} pt={4} pb={4}>
                <Grid item xs={12} md={12}>
                  <StyledTextField
                    error={!!(errors.username && touched.username)}
                    helperText={
                      !!(errors.username && touched.username) && errors.username
                    }
                    id="username"
                    defaultValue={values.username}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    placeholder="User Name"
                    required={true}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <StyledTextField
                    error={!!(errors.password && touched.password)}
                    helperText={
                      !!(errors.password && touched.password) && errors.password
                    }
                    id="password"
                    defaultValue={values.password}
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    placeholder="Password"
                    required={true}
                    type="password"
                  />
                </Grid>
              </Grid>

              <Grid item xs={4} md={4}>
                <StledPageBodySend>
                  <Button
                    size="large"
                    color="inherit"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <StledTypography fontSize={"14px"}>Login</StledTypography>
                  </Button>
                </StledPageBodySend>
              </Grid>
            </form>
          )}
        </Formik>
      </StledLoginPage>
    </MainLayout>
  );
}
