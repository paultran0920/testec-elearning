import styled from "@emotion/styled";
import { StledTypography } from "./SharedComponents";

const StledPageWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  justifyContent: "left",
  alignItems: "center",
});

const StledPageBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "60%",
  alignItems: "center",
  color: "#0B2B5B",
});

const StledPageHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "196px",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  color: "#0B2B5B",
});

const StledPageFooter = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "80px",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  color: "#0B2B5B",
  marginTop: "40px",
});


interface MainLayoutProps {
  hasHeader?: boolean;
  hasFooter?: boolean;
  children?: any;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <StledPageWrapper>
        {props.hasHeader && (
          <StledPageHeader>
            <StledTypography fontSize={"30px"}>
              Testec Interview Test
            </StledTypography>
          </StledPageHeader>
        )}
        <StledPageBody>{props.children}</StledPageBody>
        {props.hasFooter && (
          <>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <StledPageFooter>
              <StledTypography fontSize={"30px"}></StledTypography>
            </StledPageFooter>
          </>
        )}
      </StledPageWrapper>
    </>
  );
}
