import styled from "@emotion/styled";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { StledTypography } from "./SharedComponents";
import { Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import { UserForm } from "./user/UserForm";
import { useParams } from "react-router-dom";

const StyledViewUserPage = styled("div")({
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
});

export default function ViewUser() {
  const { contextData, setContextData } = useContext(AppContext);
  const { userName } = useParams();

  const user = contextData.users.find(user => user.userName === userName);

  if (!contextData.currentUser) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    setContextData({
      ...contextData,
      error: `The user ${userName} does not exist!`
    })
  }

  return (
    <MainLayout hasHeader={true} hasFooter={true}>
      <StyledViewUserPage>
        <StledTypography fontSize={"24px"} marginTop={"34px"}>
          View User Detail
        </StledTypography>

        <UserForm isEditing={false} user={user} />
      </StyledViewUserPage>
    </MainLayout>
  );
}
