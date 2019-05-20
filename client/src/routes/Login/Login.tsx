import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "shared-components/form/Text-field";
import { required } from "utils/validate";
import { withTheme } from "@material-ui/core/styles";
import { Formik, FormikActions, FormikProps, Form, Field } from "formik";
import { Container, BtnContainer } from "shared-components/form/Form-styles";

interface ILoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.SFC<{}> = (props: any) => {
  console.log(props);
  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: ILoginFormValues, actions: FormikActions<ILoginFormValues>) => {
          console.log({ values, actions });
          actions.setSubmitting(false);
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={(formikBag: FormikProps<ILoginFormValues>) => (
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
                color="primary">
                Log In
              </Button>
            </BtnContainer>
          </Form>
        )}
      />
    </Container>
  );
};

export const Login = withTheme()(LoginForm);
