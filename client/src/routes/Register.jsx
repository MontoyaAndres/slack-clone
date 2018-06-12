import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class Register extends Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onSubmit = this.onSubmit.bind(this);
  onChange = this.onChange.bind(this);

  async onSubmit() {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });

    const { username, email, password } = this.state;

    const response = await this.props.mutate({
      variables: { username, email, password },
    });
    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/login');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      username, email, password, usernameError, emailError, passwordError,
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form>
          <Form.Field error={!!usernameError}>
            <Input name="username" onChange={this.onChange} value={username} type="text" placeholder="Username" fluid />
          </Form.Field>
          <Form.Field error={!!emailError}>
            <Input name="email" onChange={this.onChange} value={email} type="email" placeholder="Email" fluid />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input name="password" onChange={this.onChange} value={password} type="password" placeholder="Password" fluid />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length > 0 ? <Message
          error
          header="There was some errors with your submission."
          list={errorList}
        /> : null}
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

Register.propTypes = {
  mutate: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default graphql(registerMutation)(Register);
