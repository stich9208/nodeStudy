import React from "react";
import styled from "styled-components";

const TitleText = ({ text }) => {
  return <Title>{text}</Title>;
};

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export default TitleText;
