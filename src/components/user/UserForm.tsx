import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { IUser, UserRoles } from "../../models/models";
import styled from "@emotion/styled";
import { StledTypography } from "../SharedComponents";
import { logDebug } from "../../logs/logger";

export interface UserFormProps {
  user?: IUser;
  isEditing: boolean;
  onSave?: (user: IUser) => Promise<void>;
}

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

const validateField = (values: any) => {
  const errors: any = {};

  if (!values.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!values.userName) {
    errors.userName = "User Name is required";
  }

  if (!values.email) {
    errors.email = "Invalid email address";
  }

  if (!values.userRole) {
    errors.userRole = "User Role is required";
  }

  return errors;
};

export function UserForm(props: UserFormProps) {
  return (
    <Formik
      initialValues={{
        firstName: props.user?.firstName,
        lastName: props.user?.lastName,
        userName: props.user?.userName,
        phone: props.user?.phone,
        email: props.user?.email,
        userRole: props.user?.userRole,
      }}
      validate={(values) => {
        const errors = validateField(values);
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.onSave &&
          props.onSave(values as unknown as IUser).then(() => {
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
        setValues,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} pl={7} pr={7} pt={4} pb={4}>
            <Grid item xs={12} md={12}>
              <StyledTextField
                error={!!(errors.userName && touched.userName)}
                helperText={
                  !!(errors.userName && touched.userName) && errors.userName
                }
                id="userName"
                defaultValue={values.userName}
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
                disabled={!props.isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                error={!!(errors.firstName && touched.firstName)}
                helperText={
                  !!(errors.firstName && touched.firstName) && errors.firstName
                }
                id="firstName"
                defaultValue={values.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                placeholder="First Name"
                required={true}
                disabled={!props.isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                error={!!(errors.lastName && touched.lastName)}
                helperText={
                  !!(errors.lastName && touched.lastName) && errors.lastName
                }
                id="lastName"
                defaultValue={values.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EditIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                placeholder="Last Name"
                required={true}
                disabled={!props.isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledTextField
                error={!!(errors.phone && touched.phone)}
                helperText={!!(errors.phone && touched.phone) && errors.phone}
                id="phone"
                defaultValue={values.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                placeholder="Phone"
                disabled={!props.isEditing}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                error={!!(errors.email && touched.email)}
                helperText={!!(errors.email && touched.email) && errors.email}
                id="email"
                defaultValue={values.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                placeholder="Email"
                required={true}
                disabled={!props.isEditing}
              />
            </Grid>
            <Grid item xs={12} md={12}>
            <FormControl 
              variant="standard" 
              fullWidth
              error={!!(errors.userRole && touched.userRole)}
            >
              <InputLabel id="lblrole">User Role</InputLabel>
              <Select
                labelId="lblrole"
                id="role"
                value={values.userRole}
                onChange={(event) => {
                  const value = event.target.value;
                  setValues({ ...values, userRole: value as UserRoles });
                }}
                label="role"
                fullWidth
                disabled={!props.isEditing}
              >
                <MenuItem
                  value={''}
                >
                  -- Select one --
                </MenuItem>
                <MenuItem
                  value={UserRoles.Admin}
                  selected={values.userRole === UserRoles.Admin}
                >
                  {UserRoles.Admin}
                </MenuItem>
                <MenuItem
                  value={UserRoles.Student}
                  selected={values.userRole === UserRoles.Student}
                >
                  {UserRoles.Student}
                </MenuItem>
                <MenuItem
                  value={UserRoles.Mentor}
                  selected={values.userRole === UserRoles.Mentor}
                >
                  {UserRoles.Mentor}
                </MenuItem>
              </Select>
              <FormHelperText>{!!(errors.userRole && touched.userRole) && errors.userRole}</FormHelperText>
              </FormControl>
            </Grid>
            {props.isEditing && (
              <Grid item xs={12} md={12}>
                <StledPageBodySend>
                  <Button
                    size="large"
                    color="inherit"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    <StledTypography fontSize={"14px"}>Save</StledTypography>
                  </Button>
                </StledPageBodySend>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </Formik>
  );
}
