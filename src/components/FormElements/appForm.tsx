import React from 'react';
import { withFormik, FormikProps } from 'formik';
import { Input, Button } from '.';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useMutation } from 'react-apollo-hooks';
import { insertApplicationMutation } from '../../graphql/mutations/application/createApplication';
import { addToastWithTimeout } from '../../redux/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

const ActionGroup = styled.div`
  padding-top: 12px;
  width: 100%;
`;

interface FormValues {
  email: string;
  name: string;
  phone: string;
  zip: string;
  address: string;
}

export const Forms = compose(
  connect(),
  withRouter
)((props: FormikProps<FormValues> & { dispatch: any; history: any }) => {
  const { errors, isSubmitting, values, handleBlur, handleChange, dispatch } = props;
  const [newApp] = useMutation(insertApplicationMutation, {
    variables: {
      objects: [
        {
          ...values,
        },
      ],
    },
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        // Time constaints. Sorry.
        if (errors !== {}) {
          return dispatch(
            addToastWithTimeout(
              'error',
              'There was an error! Please check your inputs and try again.'
            )
          );
        }
        props.handleSubmit(e);
        newApp().then(resp => {
          const { newApp } = resp.data;
          if (newApp.returning.length > 0) {
            dispatch(addToastWithTimeout('success', 'Your application is being processed'));
            return props.history.push(`/app/${newApp.returning[0].id}`);
          } else {
            return dispatch(
              addToastWithTimeout(
                'error',
                'There was an error! Please check your inputs and try again.'
              )
            );
          }
        });
      }}
    >
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        hasError={errors.name ? true : false}
        label="Name"
        id="name"
        type="text"
      />
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        hasError={errors.email ? true : false}
        label="Email"
        id="email"
        type="email"
      />
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phone}
        hasError={errors.phone ? true : false}
        label="Phone"
        id="phone"
        type="phone"
      />
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address}
        hasError={errors.address ? true : false}
        label="Address"
        id="address"
        type="text"
      />
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.zip}
        hasError={errors.zip ? true : false}
        label="Zip"
        id="zip"
        type="text"
      />
      <ActionGroup>
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </ActionGroup>
    </form>
  );
});

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default withFormik<any, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      email: '',
      name: '',
      phone: '',
      zip: '',
      address: '',
    };
  },

  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .email('Invalid Email!'),
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phone: Yup.string()
      .required('Required')
      .matches(phoneRegExp, 'Phone number is not valid'),
    zip: Yup.string()
      .min(5, 'Invalid ZIP')
      .max(9, 'Invalid ZIP')
      .required('Required'),
    address: Yup.string().required('Required'),
  }),

  handleSubmit: (values: FormValues, { resetForm }) => {
    resetForm();
  },
})(Forms);
