import React, { Component } from 'react';
// import api from '../../services/api';
// import moment from 'moment';

import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FavoriteActions from '../../store/actions/favorites';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: []
  };

  handleAddRepository = event => {
    event.preventDefault();

    // try {
    //   const { data: repository } = await api.get(
    //     `/repos/${this.state.repositoryInput}`
    //   );

    //   repository.last_commit = moment(repository.pushed_at).fromNow();

    //   this.setState({
    //     repositoryInput: "",
    //     repositories: [...this.state.repositories, repository]
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    this.props.addFavoriteRequest(this.state.repositoryInput);
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="Usuário/Repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>
        <CompareList repositories={this.props.favorites.data} />
      </Container>
    );
  }
}

Main.propTypes = {
  addFavoriteRequest: PropTypes.func.isRequired,
  favorites: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string
      })
    )
  }).isRequired
};

const mapsStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Main);
