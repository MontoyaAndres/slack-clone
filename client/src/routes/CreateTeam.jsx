import React, { Component } from 'react';
import propTypes from 'prop-types';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {},
    });

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSubmit() {
    const { name } = this;
    const response = await this.props.mutate({
      variables: { name },
    });

    const { ok, errors } = response.data.createTeam;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this[name] = value;
  }

  render() {
    const { name, errors: { nameError } } = this;

    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <Container text>
        <Header as="h2">Create a team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input name="name" onChange={this.onChange} value={name} placeholder="Name" fluid />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length > 0 ? (
          <Message error header="There was some errors with your submission" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

CreateTeam.propTypes = {
  mutate: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default graphql(createTeamMutation)(observer(CreateTeam));
