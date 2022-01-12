import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

interface CustomTextProps {
  children: React.ReactNode;
  size: string;
  color: string;
  animated?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

interface StyledAnimatedTextProps {
  size: string;
  color: string;
  animated?: boolean;
}
const StyledAnimatedText = styled.span<StyledAnimatedTextProps>`
  font-size: ${(props: StyledAnimatedTextProps) => props.size};
  color: ${(props: StyledAnimatedTextProps) => props.color};
  animation: ${(props: StyledAnimatedTextProps) => props.animated? css`${fadeIn} 2s linear` : null};
`;

const CustomText = ({ children, ...props }: CustomTextProps) => {
  return <StyledAnimatedText {...props}>{children}</StyledAnimatedText>;
};

export default CustomText;
