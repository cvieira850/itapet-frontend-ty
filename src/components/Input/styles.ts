import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #5CB3A5;
  border-radius: 10px;
  border: 2px solid #5CB3A5;
  padding: 16px;
  width: 100%;
  color: #FFFFF2;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #de6449;
      border-color: #de6449;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #de6449;
    `}


  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #FFFFF2;

    &::placeholder {
      color: #FFFFF2;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
