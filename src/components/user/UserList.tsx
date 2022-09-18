import styled from "@emotion/styled";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { UserItem } from "./UserItem";

export interface UserListProps {
  userRole: string;
  onDelete: (userName: string) => Promise<void>;
  onClick: (userName: string) => void;
}

const StledUserInforWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  borderRadius: "4px",
  backgroundColor: "#FFFFFF",
  marginBottom: "8px",
});

export default function UserList(props: UserListProps) {
  const { contextData } = useContext(AppContext);

  return (
    <>
    {contextData.users.map((user, index) => {
      return (
        <StledUserInforWrapper key={index} onClick={props.onClick.bind(null, user.userName)}>
          <UserItem user={user} itemNumber={index} onDelete={props.onDelete.bind(null, user.userName)}/>
        </StledUserInforWrapper>
      )
    })}
    </>
  )
}
