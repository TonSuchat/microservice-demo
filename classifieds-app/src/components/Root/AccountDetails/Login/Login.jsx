import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import TextInput from "../../../shared/TextInput";
import { setSession } from "../../../../store/ducks/session";

const Label = styled.label`
  display: block;
  :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const LoginButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const OrSignUp = styled.span`
  font-size: .9rem;
`;

const mutaion = gql`
  mutation($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        email
        id
      }
    }
  }
`;

const Login = (props) => {
  const [createUserSession] = useMutation(mutaion);
  const dispatch = useDispatch();

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const {
      data: { createUserSession: createdSession },
    } = await createUserSession({ variables: { email, password } });
    dispatch(setSession(createdSession));
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>
        <LabelText>Email</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="email"
          type="email"
          ref={register({ required: true })}
        />
      </Label>
      <Label>
        <LabelText>Password</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="password"
          type="password"
          ref={register({ required: true })}
        />
      </Label>
      <LoginButton disabled={isSubmitting} type="submit">
        Login
      </LoginButton>
      {" "}
      <OrSignUp>
        or <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            props.onSignupClicked();
          }}
        >
          Sign Up
        </a>
      </OrSignUp>
    </form>
  );
};

export default Login;
