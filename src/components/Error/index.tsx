import * as React from 'react';
import styled from 'styled-components';

const ErrorHolder = styled.div`
  width: 50%;
  padding: 12px;
  margin: auto;
`;

const ErrorText = styled.p`
  margin: auto;
  display: table;
  font-size: 24px;
  color: #c6c6c6;
`;

const EmojiTop = styled.span`
  font-size: 46px;
  display: table;
  opacity: 0.5;
  margin: auto;
`;

interface Props {
  message: string;
}

export default (props: Props) => (
  <ErrorHolder>
    <EmojiTop role="img" aria-label="message">
      🤖
    </EmojiTop>
    <ErrorText id="message">{props.message}</ErrorText>
  </ErrorHolder>
);
