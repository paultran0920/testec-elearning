import styled from "@emotion/styled";
import { IUser } from "../../models/models";
import DeleteIcon from '@mui/icons-material/Delete';
import { StledTypography } from "../SharedComponents";


export interface UserItemProps {
    user: IUser,
    itemNumber: number;
    onDelete: () => Promise<void>
}

const FIXED_BKGD_COLOR = ['#25A575', '#2595A5', '#3A719B', '#254B7A', '#142B58'];

const StledUserHeaderWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "64px",
  textAlign: 'center'
});

const StledUserHeaderLeft = styled.div(
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: "#FFFFFF",
    width: "40px",
    height: "100%",
    borderRadius: "4px 0px 0px 0px"
  },
  (props: any) => ({
    backgroundColor: FIXED_BKGD_COLOR[props.itemNumber % 5],
  })
);

const StledUserHeaderRight = styled.div({
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'left',
  alignItems: 'center',
  width: "40px",
  height: "100%"
});

const StledUserHeaderCenter = styled("div")({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  flexGrow: 1,
  alignContent: 'flex-end',
  width: "72px",
  height: "100%",
  marginLeft: "16px"
});

const StledDeleteIcon = styled("div")({
  marginRight: "16px"
});

export function UserItem(props: UserItemProps) {

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    props.onDelete();
  }

  return (
    <StledUserHeaderWrapper>
      <StledUserHeaderLeft
        itemNumber={props.itemNumber}
      >
        <StledTypography fontSize={"26px"} >{props.itemNumber + 1}</StledTypography>
      </StledUserHeaderLeft>
      <StledUserHeaderCenter>
        <StledTypography fontSize={"20px"} >{props.user.firstName} {props.user.lastName} - {props.user.userRole.toLocaleUpperCase()}</StledTypography>
      </StledUserHeaderCenter>
      <StledUserHeaderRight>
        <StledDeleteIcon onClick={onClick}><DeleteIcon fontSize="small"/></StledDeleteIcon>
      </StledUserHeaderRight>
    </StledUserHeaderWrapper>
  )
}
