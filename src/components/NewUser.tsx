import styled from "@emotion/styled";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IUser, UserRoles } from "../models/models";
import { StledTypography } from "./SharedComponents";
import { Persistent } from "../persistent/PersistentFactory";
import { Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import { UserForm } from "./user/UserForm";

const StyledNewUserPage = styled("div")({
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
});

export default function NewUser() {
  const { contextData, setContextData } = useContext(AppContext);

  if (!contextData.currentUser) {
    return <Navigate to="/login" />;
  }

  const onSave = async (user: IUser) => {
    return Persistent.addUser(user)
      .then(() => {
        setContextData({
          ...contextData,
          message: "Created new user succeed!",
        });
      })
      .catch((err) => {
        if (err) {
          setContextData({
            ...contextData,
            error: err.message,
          });
        }
      });
  };

  if (contextData.currentUser?.userRole !== UserRoles.Admin) {
    setContextData({
      ...contextData,
      error: "You do not have permission to create new user!",
    });
  }

  return (
    <MainLayout hasHeader={true} hasFooter={true}>
      <StyledNewUserPage>
        <StledTypography fontSize={"24px"} marginTop={"34px"}>
          Create New User
        </StledTypography>

        <UserForm isEditing={true} onSave={onSave}/>
      </StyledNewUserPage>
    </MainLayout>
  );
}
