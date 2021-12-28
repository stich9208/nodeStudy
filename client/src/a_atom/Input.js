import React from "react";
import styled from "styled-components";

const Input = ({ type, name, size, placeholder, onChange, style }) => {
  return (
    <InputContainer
      type={type}
      name={name}
      size={size}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
    />
  );
};

const InputContainer = styled.input`
  width: ${(props) =>
    props.size === "big"
      ? "400px"
      : props.size === "medium"
      ? "300px"
      : "200px"};
  height: 40px;

  padding-left: 8px;
  font-size: 18px;
  border: 3px solid #fecf47;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
`;

export default Input;
