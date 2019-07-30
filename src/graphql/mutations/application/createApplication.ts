import gql from 'graphql-tag';

export const insertApplicationMutation = gql`
  mutation insert_applications($objects: [applications_insert_input!]!) {
    newApp: insert_applications(objects: $objects) {
      returning {
        id
      }
    }
  }
`;
