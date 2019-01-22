import React, { Component } from "react";
import api from "../../services/api";
import moment from "moment";

import logo from "../../assets/logo.png";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as FavoriteActions from "../../store/actions/favorites";

import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";

class Main extends Component {
  static propTypes = {
    addFavorite: PropTypes.func.isRequired,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string
      })
    ).isRequired
  };

  state = {
    repositoryInput: "",
    repositories: []
  };

  handleAddRepository = async event => {
    event.preventDefault();

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: "",
        repositories: [...this.state.repositories, repository]
      });
    } catch (err) {
      console.log(err);
    }

    //this.props.addFavorite();
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
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
      last_commit: PropTypes.string
    })
  ).isRequired
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
