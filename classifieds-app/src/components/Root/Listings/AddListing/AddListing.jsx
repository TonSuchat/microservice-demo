import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import TextInput from "../../../shared/TextInput";
import TextArea from "../../../shared/TextArea";

const Form = styled.form`
    background-color: ${(props) => props.theme.whiteSmoke};
    margin-top: 1rem;
    padding: 1rem;
`;

const Label = styled.label`
    display: block;

    :not(:first-child) {
        margin-top: .5rem;
    }
`;

const LabelText = styled.strong`
    display:block;
    font-size: .9rem;
    margin-bottom: .25rem;
`;

const Button = styled.button`
    display: inline-block;
    margin-top: 0.5rem;
`;

const mutation = gql`
    mutation($title: String!, $description: String!) {
        createListing(title: $title, description: $description){
            id
        }
    }
`;

const AddListing = ({ onAddedListing }) => {
  const {
    formState: {isSubbmitting},
    handleSubmit,
    register,
    reset,
  } = useForm();

  const [createListing] = useMutation(mutation);

  const onSubmit = handleSubmit(async ({ title, description }) => {
    createListing({ variables: { title, description } });
    reset();
    onAddedListing();
  });

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        <LabelText>Title</LabelText>
        <TextInput
          disabled={isSubbmitting}
          type="text"
          name="title"
          ref={register}
        />
      </Label>
      <Label>
        <LabelText>Description</LabelText>
        <TextArea
          disabled={isSubbmitting}
          name="description"
          ref={register}
        />
      </Label>
      <Button disabled={isSubbmitting} type="submit">Add Listing</Button>
    </Form>
  );
};

export default AddListing;
