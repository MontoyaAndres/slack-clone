import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import findIndex from 'lodash.findindex';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModel from '../components/AddChannelModal';

import { allTeamsQuery } from '../graphql/teams';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  };

  render() {
    const {
      data: { loading, allTeams },
      currentTeamId
    } = this.props;

    if (loading) {
      return null;
    }

    const teamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
    const team = allTeams[teamIdx];
    let username = '';

    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (err) {
      return;
    }

    return (
      <Fragment>
        <Teams
          key="team-sidebar"
          teams={allTeams.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase()
          }))}
        />
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          username={username}
          teamId={team.id}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
          onAddChannelClick={this.handleAddChannelClick}
        />
        <AddChannelModel
          teamId={team.id}
          onClose={this.handleCloseAddChannelModal}
          open={this.state.openAddChannelModal}
          key="sidebar-add-channel-modal"
        />
      </Fragment>
    );
  }
}

export default graphql(allTeamsQuery)(Sidebar);
