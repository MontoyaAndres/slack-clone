import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';

const Home = ({ data: { allUsers = [] } }) => (
  <Fragment>{allUsers.map(user => <h1 key={user.id}>{user.email}</h1>)}</Fragment>
);

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

Home.propTypes = {
  data: propTypes.shape({
    allUsers: propTypes.array
  }).isRequired
};

export default graphql(allUsersQuery)(Home);
