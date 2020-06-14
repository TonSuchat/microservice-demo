import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useDispatch } from "react-redux";
import graphqlClient from "../../api/graphqlClient";
import styled from "styled-components";
import Listings from "./Listings";
import AccountDetails from "./AccountDetails/AccountDetails";
import { setSession } from "../../store/ducks/session";

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  width: 80rem;
`;

const Content = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const SideBar = styled.div`
  flex: 0 auto;
  width: 10rem;
`;

const query = gql`
  {
    userSession(me: true) {
      id
      user {
        id
        email
      }
    }
  }
`;

const Root = () => {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchQuery = async () => {
      const { data } = await graphqlClient.query({ query });
      if (data && data.userSession) {
        dispatch(setSession(data.userSession));
      }
      setInitialized(true);
    };
    fetchQuery();
  }, []);

  if (!initialized) return "Loading...";

  return (
    <Wrapper>
      <Container>
        <Content>
          <Listings />
        </Content>
        <SideBar>
          <AccountDetails />
        </SideBar>
      </Container>
    </Wrapper>
  );
};

export default Root;
