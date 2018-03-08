import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import ListErrors from "./ListErrors";

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { email, password, errors, inProgress } = this.props;
    return(
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>
              <h1 className='text-xs-center'>Sign In</h1>
              <p className='text-xs-center'>
                <a>
                  Need an account?
                </a>
              </p>

              <ListErrors errors={errors}/>

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>
                  <fieldset className='form-group'>
                    <input className='form-control form-control-lg' type='email' placeholder='email' value={email} onChange={this.changeEmail} />
                  </fieldset>
                  <fieldset className='form-group'>
                    <input className='form-control form-control-lg' type='password' placeholder='password' value={password} onChange={this.changePassword} />
                  </fieldset>
                  <button className='btn btn-lg btn-primary pull-xs-right' type='submit' disabled={inProgress}>
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: 'LOGIN', payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: 'LOGIN_PAGE_UNLOADED' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
