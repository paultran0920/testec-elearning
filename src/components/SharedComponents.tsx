import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const StledTypography = styled(Typography)(
  {
    fontFamily: "Montserrat",
  },
  (props) => ({
    marginTop: props.marginTop ? (props.marginTop as string) : "0px",
    marginBottom: props.marginBottom ? (props.marginBottom as string) : "0px",
    fontWeight: props.fontWeight ? (props.fontWeight as number) : 500,
    fontSize: props.fontSize ? (props.fontSize as string) : "14px",
  })
);

export const StyledLink = styled(Link)(
  {
    textDecoration: "none",
    color: "inherit",
  },
  (props: any) => ({
    width: props.width ? (props.width as string) : undefined,
  })
);
