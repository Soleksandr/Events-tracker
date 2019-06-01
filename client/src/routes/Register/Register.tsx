import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "shared-components/form/Text-field";
import { messages } from "sdk";
import { required } from "utils/validate";
import { ICreateUser, IUser } from "sdk/models";
import { Formik, FormikActions, Form, Field } from "formik";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Container, BtnContainer } from "shared-components/form/Form-styles";

export interface IRegisterProps extends RouteComponentProps {
  createUser: (data: ICreateUser) => any;
  user: IUser;
}

const RegisterForm: React.SFC<IRegisterProps> = ({ user, createUser, history }) => {
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });
  const checkPasswords = (values: ICreateUser) => {
    if (values.password !== values.confirmPassword) {
      return {
        confirmPassword: messages.PASSWORDS_DIFFERENT
      };
    }
  };

  const submitFormHandler = async (values: ICreateUser, actions: FormikActions<ICreateUser>) => {
    createUser(values);
    actions.setSubmitting(false);
  };

  const initialValues = { email: "", password: "", name: "", confirmPassword: "" };

  return (
    <Container>
      <h1>Register User</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={submitFormHandler}
        validate={checkPasswords}
        render={() => (
          <Form>
            <Field name="name"
              component={TextField}
              label="Name"
              fullWidth
            />
            <Field name="email"
              type="email"
              component={TextField}
              validate={required}
              label="*Email"
              fullWidth
            />
            <Field
              name="password"
              type="password"
              component={TextField}
              validate={required}
              label="*Password"
              fullWidth
            />
            <Field
              name="confirmPassword"
              type="password"
              component={TextField}
              validate={required}
              label="*Confirm Password"
              fullWidth
            />
            <BtnContainer>
              <Button type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </BtnContainer>
          </Form>
        )}
      />
    </Container>
  );
};

export const Register = withRouter(RegisterForm);
