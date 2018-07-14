import React, { Component } from 'react';

class RenderText extends Component {
  state = {
    text: ''
  };

  componentWillMount = async () => {
    const response = await fetch(this.props.url);
    const text = await response.text();
    this.setState({ text });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <p>{text}</p>
      </div>
    );
  }
}

export default RenderText;
