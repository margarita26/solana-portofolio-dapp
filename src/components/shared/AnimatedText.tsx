import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

interface TextProps {
  children: React.ReactNode;
  size: string;
  color: string;
  animated?: boolean;
}

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// const fadeOut = keyframes`
//   from {
//     transform: scale(1);
//     opacity: 0;
//   }

//   to {
//     transform: scale(.25);
//     opacity: 1;
//   }
// `;

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

const Text = ({ children, ...props }: TextProps) => {
  return <StyledAnimatedText {...props}>{children}</StyledAnimatedText>;
};

export default Text;
