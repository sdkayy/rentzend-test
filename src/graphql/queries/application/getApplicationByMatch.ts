import gql from 'graphql-tag';

export const getAppByMatchQuery = gql`
  query applications_by_pk($id: uuid!) {
    app: applications_by_pk(id: $id) {
      id
      name
      phone
      status
      zip
      email
      address
    }
  }
`;
