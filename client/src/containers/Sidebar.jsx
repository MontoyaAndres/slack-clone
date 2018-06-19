import React, { Component, Fragment } from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModel from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false });
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true });
  };

  handleInvitePeopleClick = () => {
    this.setState({ openInvitePeopleModal: true });
  };

  handleCloseInvitePeopleModal = () => {
    this.setState({ openInvitePeopleModal: false });
  };

  render() {
    const { teams, team } = this.props;
    const { openInvitePeopleModal, openAddChannelModal } = this.state;
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
        <Teams key="team-sidebar" teams={teams} />
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          username={username}
          teamId={team.id}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
          onAddChannelClick={this.handleAddChannelClick}
          onInvitePeopleClick={this.handleInvitePeopleClick}
        />
        <AddChannelModel
          teamId={team.id}
          onClose={this.handleCloseAddChannelModal}
          open={openAddChannelModal}
          key="sidebar-add-channel-modal"
        />
        <InvitePeopleModal
          teamId={team.id}
          onClose={this.handleCloseInvitePeopleModal}
          open={openInvitePeopleModal}
          key="Invite-people-modal"
        />
      </Fragment>
    );
  }
}

export default Sidebar;
