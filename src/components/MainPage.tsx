import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { StledTypography, StyledLink } from "./SharedComponents";
import UserList from "./user/UserList";
import { Navigate } from "react-router-dom";
import { Persistent } from "../persistent/PersistentFactory";
import MainLayout from "./MainLayout";
import { UserRoles } from "../models/models";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const StledPageBodySend = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  button: {
    width: "100%",
    backgroundColor: "#0B2B5B",
    color: "#FFFFFF",
    borderRadius: "34.5px",
    marginBottom: "40px",
    marginTop: "40px",
  },
});

export default function MainPage() {
  const { contextData, setContextData } = useContext(AppContext);
  const [viewUserName, setViewUserName] = useState("");

  useEffect(() => {
    if (contextData.currentUser?.userRole) {
      Persistent.fetchUsers().then((users) => {
        setContextData({
          ...contextData,
          users: users,
        });
      });
    }
  }, [contextData.currentUser?.userRole]);

  const onDelete = async (userName: string) => {
    Persistent.deleteUser(userName).then(() => {
      Persistent.fetchUsers().then((users) => {
        setContextData({
          ...contextData,
          users: users,
        });
      });
    });
  };

  if (viewUserName) {
    const viewUser = contextData.users.find(
      (user) => user.userName === viewUserName
    );
    if (viewUser) {
      if (contextData.currentUser?.userRole === UserRoles.Admin) {
        return <Navigate to={`/view/${viewUserName}`} />;
      } else if (
        contextData.currentUser?.userRole === UserRoles.Mentor
      ) {
        if (viewUser.userRole === UserRoles.Student) {
          return <Navigate to={`/view/${viewUserName}`} />;
        }
      } else if (
        contextData.currentUser?.userRole === UserRoles.Student
      ) {
        if (viewUser.userRole === UserRoles.Mentor) {
          return <Navigate to={`/view/${viewUserName}`} />;
        }
      }
    }
    setContextData({
      ...contextData,
      error: "You can not view this user detail!",
    });
    setViewUserName("");
  }

  if (!contextData.currentUser) {
    return <Navigate to="/login" />;
  } else {
    return (
      <MainLayout hasHeader={true} hasFooter={true}>
        <StledTypography
          fontSize={"24px"}
          marginTop={"34px"}
          marginBottom={"34px"}
        >
          User List
        </StledTypography>

        <UserList
          userRole="Admin"
          onDelete={onDelete}
          onClick={setViewUserName}
        />

        {contextData.currentUser?.userRole === UserRoles.Admin && (
          <StyledLink to="/new" width={"100%"}>
            <StledPageBodySend>
              <Button size="large" color="inherit">
                <StledTypography fontSize={"14px"}>New User</StledTypography>
              </Button>
            </StledPageBodySend>
          </StyledLink>
        )}
      </MainLayout>
    );
  }
}
