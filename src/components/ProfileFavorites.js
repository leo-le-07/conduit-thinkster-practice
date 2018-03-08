import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../agent';
import { Profile, mapStateToProps } from './Profile';

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: agent.Profile.follow(username)
  }),
  onLoad: (payload) =>
    dispatch({ type: 'PROFILE_FAVORITES_PAGE_LOADED', payload }),
  onUnfollow: username => dispatch({
    type: 'UNFOLLOW_USER',
    payload: agent.Profile.unfollow(username),
  onSetPage: (page, payload) =>
    dispatch({ type: 'SET_PAGE', page, payload })
  }),
  onUnload: () =>
    dispatch({ type: 'PROFILE_FAVORITES_PAGE_UNLOADED' })
});

class ProfileFavorites extends Profile {
  componentWillMount() {
    const { username } = this.props.match.params;
    this.props.onLoad(Promise.all([
      agent.Profile.get(username),
      agent.Articles.favoritedBy(username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onSetPage(page) {
    const promise = agent.Articles.favoritedBy(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
