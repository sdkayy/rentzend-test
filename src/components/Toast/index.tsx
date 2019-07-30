import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 48px;
  right: 0;
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  background: transparent;
  pointer-events: none;
  z-index: 9999;
`;

const toastFade = keyframes`
  0% {
    opacity: 0;
    top: 8px;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  95% {
    opacity: 1;
    top: 0;
  }
  100% {
    opacity: 0;
    top: -4px;
  }
`;

const Colors = {
  success: '#27ae60',
  error: '#e74c3c',
  neutral: '#ecf0f1',
};

export const Toast = styled.div<{ timeout?: number; kind: string }>`
  border-radius: 6px;
  padding: 12px;
  color: ${props => (props.kind === 'neutral' ? '#7f8c8d' : '#FFF')};
  background: ${props => Colors[props.kind]};
  border: ${props => (props.kind === 'neutral' ? `1px solid #000` : 'none')};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  display: block;
  margin-bottom: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  opacity: 0;
  position: relative;
  animation-duration: 4s;
  animation-fill-mode: forwards;
  animation-name: ${toastFade};
  animation-timing-function: linear;
`;

const ToastsPure = ({ toasts }): any => {
  if (!toasts) {
    return <span />;
  }

  return (
    <Container>
      {toasts.map(toast => {
        if (toast.kind) {
          return (
            <Toast key={toast.id} kind={toast.kind}>
              {toast.message}
            </Toast>
          );
        }
        return <span key={toast.id} />;
      })}
    </Container>
  );
};

const Toasts = compose<any, any>(pure)(ToastsPure);
const mapStateToProps = state => ({
  toasts: state.toasts.toasts,
});
export default connect(mapStateToProps)(Toasts);
