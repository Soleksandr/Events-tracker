import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "shared-components/form/Text-field";
import { required } from "utils/validate";
import { ILoginUser, IUser } from "sdk/models";
import { Formik, FormikActions, Form, Field } from "formik";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Container, BtnContainer } from "shared-components/form/Form-styles";

export interface ILoginProps extends RouteComponentProps {
  loginUser: (data: ILoginUser) => any;
  user: IUser;
}

const LoginForm: React.SFC<ILoginProps> = ({ user, loginUser, history }) => {
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  const submitFormHandler = (values: ILoginUser, actions: FormikActions<ILoginUser>) => {
    loginUser(values);
    actions.setSubmitting(false);
  };

  const initialValues = { email: "", password: "" };

  return (
    <Container>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={submitFormHandler}
        render={() => (
          <Form>
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
            <BtnContainer>
              <Button type="submit"
                variant="contained"
                color="primary"
              >
                Log In
              </Button>
            </BtnContainer>
          </Form>
        )}
      />
    </Container>
  );
};

export const Login = withRouter(LoginForm);
