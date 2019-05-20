import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "shared-components/form/Text-field";
import { messages } from "sdk/constants";
import { required } from "utils/validate";
import { Formik, FormikActions, FormikProps, Form, Field } from "formik";
import { Container, BtnContainer } from "shared-components/form/Form-styles";;

interface IRegisterFormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const isPasswordsEqual = (values: IRegisterFormValues) => {
  if (values.password !== values.confirmPassword) {
    return {
      confirmPassword: messages.PASSWORDS_DIFFERENT
    };
  }
};

export const Register: React.SFC<{}> = (props: any) => {
  console.log(props);
  return (
    <Container>
      <h1>Register User</h1>
      <Formik
        initialValues={{ email: "", password: "", name: "", confirmPassword: "" }}
        onSubmit={(values: IRegisterFormValues, actions: FormikActions<IRegisterFormValues>) => {
          console.log({ values, actions });
          actions.setSubmitting(false);
        }}
        validate={isPasswordsEqual}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={(formikBag: FormikProps<IRegisterFormValues>) => (
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
