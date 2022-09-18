import styled from "@emotion/styled";
import { Snackbar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { StledTypography } from "./SharedComponents";

const StledSnackbarMsg = styled("div")(
  {
    width: "100%",
    height: "47px",
    borderRadius: "0px 0px 34.5px 34.5px",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "16px",
    paddingRight: "16px",
    textAlign: "center"
  },
  (props: any) => ({
    backgroundColor: props.isError ? "red" : "#25A575",
  })
);

const SnackbarWrapper = styled("div")({
  width: "60%",
  top: "0px",
  left: "20%",
  position: "fixed",
  zIndex: 1400, // should refer to the theme value 
  div: {
    width: "100%",
    top: "0px",
    position: "relative",
  },
});

export function SystemMsg() {
  const { contextData, setContextData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (contextData.error || contextData.message) {
      setOpen(true);
      setIsError(!!contextData.error);
    }
  }, [contextData.error, contextData.message]);

  const handleClose = () => {
    if (isError) {
      setContextData({
        ...contextData,
        error: undefined,
      });
    } else {
      setContextData({
        ...contextData,
        message: undefined,
      });
    }
  };

  return contextData.error || contextData.message ? (
    <SnackbarWrapper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={100000}
        open={open}
        onClose={handleClose}
      >
        <StledSnackbarMsg isError={!!contextData.error}>
          {contextData.error ? (
            <StledTypography fontWeight={400}>{contextData.error}</StledTypography>
          ) : (
            <StledTypography fontWeight={400}>{contextData.message}</StledTypography>
          )}
        </StledSnackbarMsg>
      </Snackbar>
    </SnackbarWrapper>
  ) : null;
}
