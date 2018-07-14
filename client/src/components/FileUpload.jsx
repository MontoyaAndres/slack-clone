import React from 'react';
import Dropzone from 'react-dropzone';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const FileUpload = ({ children, channelId, mutate, disableClick, style }) => (
  <Dropzone
    style={style}
    className="ignore"
    onDrop={async ([file]) => {
      const response = await mutate({
        variables: {
          channelId,
          file
        }
      });
      console.log(response);
    }}
    disableClick={disableClick}
  >
    {children}
  </Dropzone>
);

const createFileMessageMutation = gql`
  mutation($channelId: Int!, $file: Upload!) {
    createMessage(channelId: $channelId, file: $file)
  }
`;

export default graphql(createFileMessageMutation)(FileUpload);
