import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment, Button } from 'semantic-ui-react';

import FileUpload from '../components/FileUpload';
import RenderText from '../components/RenderText';

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      url
      filetype
      created_at
    }
  }
`;

const Message = ({ message: { url, text, filetype } }) => {
  if (url) {
    if (filetype.startsWith('image/')) {
      return <img src={url} alt={filetype} />;
    } else if (filetype === 'text/plain') {
      return <RenderText url={url} />;
    } else if (filetype.startsWith('audio/')) {
      return (
        <div>
          <audio controls>
            <source src={url} type={filetype} />
          </audio>
        </div>
      );
    }
  }

  return <Comment.Text>{text}</Comment.Text>;
};

class MessageContainer extends React.Component {
  state = {
    hasMoreItems: true
  };

  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = channelId =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage]
        };
      }
    });

  render() {
    const {
      data: { loading, messages, fetchMore },
      channelId
    } = this.props;
    const { hasMoreItems } = this.state;

    return loading ? null : (
      <FileUpload
        style={{
          gridColumn: 3,
          gridRow: 2,
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'auto'
        }}
        channelId={channelId}
        disableClick
      >
        <Comment.Group>
          {hasMoreItems && (
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    channelId,
                    offset: messages.length
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return previousResult;
                    }

                    if (fetchMoreResult.messages.length < 35) {
                      this.setState({ hasMoreItems: false });
                    }

                    return {
                      ...previousResult,
                      messages: [...previousResult.messages, ...fetchMoreResult.messages]
                    };
                  }
                });
              }}
            >
              Load More
            </Button>
          )}
          {messages.map(m => (
            <Comment key={`${m.id}-message`}>
              <Comment.Content>
                <Comment.Author as="a">{m.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{m.created_at}</div>
                </Comment.Metadata>
                <Message message={m} />
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </FileUpload>
    );
  }
}

const messagesQuery = gql`
  query($offset: Int!, $channelId: Int!) {
    messages(offset: $offset, channelId: $channelId) {
      id
      text
      user {
        username
      }
      url
      filetype
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  options: props => ({
    variables: {
      channelId: props.channelId,
      offset: 0
    },
    fetchPolicy: 'network-only'
  })
})(MessageContainer);
