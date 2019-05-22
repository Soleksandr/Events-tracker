import styled from "@emotion/styled";
import { Centered } from "../common/Centered";

export const Container = styled(Centered)({
  width: 450,
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)"
});

export const BtnContainer = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "25px"
});
