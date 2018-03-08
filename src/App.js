import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import agent from './agent';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';
import Article from './components/Article';
import Profile from './components/Profile';
import ProfileFavorites from './components/ProfileFavorites';
import Editor from './components/Editor';

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  redirectTo: state.common.redirectTo,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({ type: 'REDIRECT' }),
  onLoad: (payload, token) =>
    dispatch({ type: 'APP_LOAD', payload, token }),
});

class App extends React.Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if(token) {
      agent.setToken(token)
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    const { appName, currentUser, appLoaded } = this.props;

    if (appLoaded) {
      return(
        <div>
          <Header appName={appName} currentUser={currentUser} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/settings' component={Settings} />
            <Route path='/article/:id' component={Article} />
            <Route exact path='/@:username' component={Profile} />
            <Route path='/@:username/favorites' component={ProfileFavorites} />
            <Route path='/editor' component={Editor} />
            <Route path='/editor/:slug' component={Editor} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
          <Header appName={appName} currentUser={currentUser} />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
