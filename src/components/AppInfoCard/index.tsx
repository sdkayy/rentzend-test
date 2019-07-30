import React from 'react';
import styled from 'styled-components';

const Holder = styled.div`
  margin: 12px;
`;

const Items = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  app: any;
}

export default (props: Props) => (
  <Holder>
    <Items>
      {Object.keys(props.app)
        .filter(k => k !== '__typename')
        .map(k => (
          <Row key={k}>
            <p style={{ textTransform: 'uppercase' }}>{k}</p>
            <p>{props.app[k]}</p>
          </Row>
        ))}
    </Items>
  </Holder>
);
