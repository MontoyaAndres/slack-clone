import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
`;

const channel = ({ id, name }) => <li key={`channel-${id}`}># {name}</li>;

const user = ({ id, name }) => <li key={`user-${id}`}>{name}</li>;

const Channels = ({ teamName, username, channels, users }) => (
  <ChannelWrapper>
    <div>
      {teamName}
      {username}
    </div>
    <div>
      <ul>
        <li>Channels</li>
        {channels.map(channel)}
      </ul>
    </div>
    <div>
      <ul>
        <li>Direct Messages</li>
        {users.map(user)}
      </ul>
    </div>
  </ChannelWrapper>
);

Channels.propTypes = {
  teamName: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
  channels: propTypes.array.isRequired,
  users: propTypes.array.isRequired
};

channel.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired
};

user.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired
};

export default Channels;
