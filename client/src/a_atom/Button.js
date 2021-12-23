import React from "react";
import styled from "styled-components";

const Button = ({ title, type, size, onClick }) => {
  return (
    <ButtonContainer type={type} size={size} onClick={onClick}>
      {title.toUpperCase()}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  font-weight: bold;
  border: ${(props) =>
    props.type === "primary" ? "solid 3px white" : "solid 3px #FECF47"};
  border-radius: 10px;
  background-color: ${(props) =>
    props.type === "primary" ? "#FECF47" : "white"};
  color: ${(props) => (props.type === "primary" ? "white" : "#FECF47")};
`;
export default Button;
