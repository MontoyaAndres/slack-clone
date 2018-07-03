import React, { Component, Fragment } from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModel from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
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
    const { teams, team, username } = this.props;
    const { openInvitePeopleModal, openAddChannelModal } = this.state;

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
          onAddChannelClick={this.toggleAddChannelModal}
          onInvitePeopleClick={this.toggleInvitePeopleModal}
          isOwner={team.admin}
        />
        <AddChannelModel
          teamId={team.id}
          onClose={this.toggleAddChannelModal}
          open={openAddChannelModal}
          key="sidebar-add-channel-modal"
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
