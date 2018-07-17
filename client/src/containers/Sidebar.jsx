import React, { Component, Fragment } from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModel from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';
import DirectMessageModal from '../components/DirectMessageModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false,
    openDirectMessageModal: false
  };

  toggleDirectMessageModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState(state => ({ openDirectMessageModal: !state.openDirectMessageModal }));
  };

  toggleAddChannelModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openAddChannelModal: !this.state.openAddChannelModal });
  };

  toggleInvitePeopleModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({ openInvitePeopleModal: !this.state.openInvitePeopleModal });
  };

  render() {
    const { teams, team, username, currentUserId } = this.props;
    const { openInvitePeopleModal, openAddChannelModal, openDirectMessageModal } = this.state;

    const regularChannels = [];
    const dmChannels = [];

    team.channels.forEach(c => {
      if (c.dm) {
        dmChannels.push(c);
      } else {
        regularChannels.push(c);
      }
    });

    return (
      <Fragment>
        <Teams key="team-sidebar" teams={teams} />
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          username={username}
          teamId={team.id}
          channels={regularChannels}
          dmChannels={dmChannels}
          onAddChannelClick={this.toggleAddChannelModal}
          onInvitePeopleClick={this.toggleInvitePeopleModal}
          onDirectMessageClick={this.toggleDirectMessageModal}
          isOwner={team.admin}
        />
        <DirectMessageModal
          teamId={team.id}
          onClose={this.toggleDirectMessageModal}
          open={openDirectMessageModal}
          key="sidebar-direct-message-modal"
          currentUserId={currentUserId}
        />
        <AddChannelModel
          teamId={team.id}
          onClose={this.toggleAddChannelModal}
          open={openAddChannelModal}
          key="sidebar-add-channel-modal"
          currentUserId={currentUserId}
        />
        <InvitePeopleModal
          teamId={team.id}
          onClose={this.toggleInvitePeopleModal}
          open={openInvitePeopleModal}
          key="Invite-people-modal"
        />
      </Fragment>
    );
  }
}

export default Sidebar;
