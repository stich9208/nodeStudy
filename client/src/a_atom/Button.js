import React from "react";
import styled, { keyframes } from "styled-components";

const Button = ({ title, type, size, onClick, style, children }) => {
  return (
    <ButtonContainer type={type} size={size} onClick={onClick} style={style}>
      {title}
      {children}
    </ButtonContainer>
  );
};

const clickAnimation = keyframes`
  0%{
    transform:scale(1)
  }50%{
    transform:scale(0.95)
  }100%{
    transform:scale(1)
  }
`;

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) =>
    props.size === "big"
      ? "200px"
      : props.size === "medium"
      ? "120px"
      : "70px"};
  height: ${(props) =>
    props.size === "big" ? "40px" : props.size === "medium" ? "35px" : "27px"};
  font-weight: bold;
  font-size: ${(props) =>
    props.size === "big" ? "20px" : props.size === "medium" ? "15px" : "12px"};
  border: ${(props) =>
    props.type === "primary" ? "solid 3px white" : "solid 3px #809bce"};
  border-radius: 10px;
  background-color: ${(props) =>
    props.type === "primary" ? "#809bce" : "white"};
  color: ${(props) => (props.type === "primary" ? "white" : "#809bce")};
  cursor: pointer;
  :active {
    animation: ${clickAnimation} 0.1s linear;
  }
`;

export default Button;
