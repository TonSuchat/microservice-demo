import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { clearSession } from "../../../../store/ducks/session";

const Email = styled.div`
  color: ${(props) => props.theme.nero};
  fonts-zize: 1rem;
  margin-top: 0.25rem;
`;

const Wrapper = styled.div`
  color: ${(props) => props.theme.mortar};
  font-size: 0.9rem;
`;

const LogoutLink = styled.a.attrs({ href: "#" })`
  color: blue;
  display: block;
  margin-top: 0.25rem
`;

const mutation = gql`
  mutation($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

const Account = () => {
  const [deleteUserSession] = useMutation(mutation);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearSession());
    deleteUserSession({ variables: { sessionId: session.id } });
  };

  return (
    <Wrapper>
      Logged in as <Email>{session.user.email}</Email>
      <LogoutLink onClick={handleLogout}>(Logout)</LogoutLink>
    </Wrapper>
  );
};

export default Account;
