import React from 'react';
import styled from 'styled-components';

interface InputProps {
  onChange: any;
  value: string | number;
  hasError?: boolean;
  onBlur: any;
  id: string;
  label: string;
  type: string;
}

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px;
  padding-bottom: 0px;
`;

const InputLabel = styled.label<{ hasError?: boolean }>`
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => (props.hasError ? '#e74c3c' : '#7f8c8d')};
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 8px;
  border: 1px solid ${props => (props.hasError ? '#e74c3c' : '#d3d3d3')};
  font-size: 14px;

  &:focus {
    outline: none;
    border: 1px solid #3498db;
  }
`;

export const Input = (props: InputProps) => (
  <InputHolder>
    <InputLabel htmlFor={props.id} hasError={props.hasError}>
      {props.label}
    </InputLabel>
    <StyledInput
      id={props.id}
      type={props.type}
      onBlur={props.onBlur}
      onChange={props.onChange}
      value={props.value}
      hasError={props.hasError}
    />
  </InputHolder>
);

interface ButtonProps {
  onClick?: any;
  disabled?: boolean;
  children?: any;
  type: string;
}

const StyledButton = styled.button<{ disabled?: boolean }>`
  padding: 8px;
  background: #2980b9;
  border: none;
  border-top: 1px solid #2980b9;
  width: 100%;
  font-size: 14px;
  color: white;
  cursor: pointer;
  ${props => props.disabled && `opacity: .7;`}

  &:hover {
    color: #2980b9;
    background: white;
  }

  &:focus {
    outline: none;
  }
`;

export const Button = (props: ButtonProps) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);
