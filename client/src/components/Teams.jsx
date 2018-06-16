import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
`;

const team = ({ id, letter }) => <li key={`team-${id}`}>{letter}</li>;

const Teams = ({ teams }) => (
  <TeamWrapper>
    <ul>{teams.map(team)}</ul>
  </TeamWrapper>
);

Teams.propTypes = {
  teams: propTypes.array.isRequired
};

team.propTypes = {
  id: propTypes.number.isRequired,
  letter: propTypes.string.isRequired
};

export default Teams;
