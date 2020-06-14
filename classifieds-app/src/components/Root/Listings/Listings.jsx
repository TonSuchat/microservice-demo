import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";

const Description = styled.p`
  margin-botton: 0;
`;

const Listing = styled.div`
  padding: 1rem 0;
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.veryLightGrey};
  }
`;

const Title = styled.strong`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`;

const query = gql`
  {
    listings {
      id
      title
      description
    }
  }
`;

function Listings() {
  const { data, loading } = useQuery(query);
  if (loading) return "Loading Listings...";

  if (!data.listings || data.listings.length == 0)
    return "Not found any listings";

  return (
    <div>
      {data.listings.map((listing) => (
        <Listing key={listing.id}>
          <Title>{listing.title}</Title>
          <Description>{listing.description}</Description>
        </Listing>
      ))}
    </div>
  );
}

export default Listings;
