import React from "react";
import styled from "styled-components";

const Button = ({ title, type, size, onClick, style }) => {
  return (
    <ButtonContainer type={type} size={size} onClick={onClick} style={style}>
      {title.toUpperCase()}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) =>
    props.size === "big"
      ? "200px"
      : props.size === "medium"
      ? "120px"
      : "80px"};
  height: ${(props) =>
    props.size === "big" ? "40px" : props.size === "medium" ? "35px" : "30px"};
  font-weight: bold;
  font-size: ${(props) =>
    props.size === "big" ? "20px" : props.size === "medium" ? "18px" : "15px"};
  border: ${(props) =>
    props.type === "primary" ? "solid 3px white" : "solid 3px #FECF47"};
  border-radius: 10px;
  background-color: ${(props) =>
    props.type === "primary" ? "#FECF47" : "white"};
  color: ${(props) => (props.type === "primary" ? "white" : "#FECF47")};
  cursor: pointer;
`;
export default Button;
