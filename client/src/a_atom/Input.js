import React from "react";
import styled from "styled-components";

const Input = ({ type, name, placeholder, onChange }) => {
  return (
    <InputContainer
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

const InputContainer = styled.input`
  width: 200px;
  height: 30px;
  margin-bottom: 15px;
  border: 3px solid #fecf47;
  border-radius: 10px;
  outline: none;
`;

export default Input;
