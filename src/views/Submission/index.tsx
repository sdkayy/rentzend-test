import React from 'react';
import { Container, Card } from '../../components/Containers';
import { compose } from 'redux';
import { useQuery } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';
import { getAppByMatchQuery } from '../../graphql/queries/application/getApplicationByMatch';
import Error from '../../components/Error';
import AppInfoCard from '../../components/AppInfoCard';

export const Submission = compose(withRouter)((props: { match: any }) => {
  // @ts-ignore
  const { data, error, loading } = useQuery(getAppByMatchQuery, {
    variables: { id: props.match.params.id },
  });
  if (error) {
    return <Error message={'Error!'} />;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Container>
      <Card>
        <AppInfoCard app={data.app} />
      </Card>
    </Container>
  );
});

export default (props: any) => <Submission />;
