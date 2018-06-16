import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const team = ({ id, letter }) => <TeamListItem key={`team-${id}`}>{letter}</TeamListItem>;

const Teams = ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
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
