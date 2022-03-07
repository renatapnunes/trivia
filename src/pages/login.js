import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { saveLogin, fetchTrivia } from '../redux/actions/login';
// Link image: https://www.pikpng.com/pngl/m/238-2383834_brain-week-rcd-foundation-brain-cartoon-image-png.png"
import brain from '../images/brain.png';
// Link image: href="https://www.freepik.com"
import gear from '../images/gear.png';
import '../styles/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      email: '',
      disabled: true,
      shouldRedirectConfig: false,
      shouldRedirectPlay: false,
      getTokenError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyButton = this.verifyButton.bind(this);
    this.submit = this.submit.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.redirect = this.redirect.bind(this);
    this.loginInputs = this.loginInputs.bind(this);
  }

  async handleChange({ target }) {
    const { name, value } = target;
    await this.setState({ [name]: value });
    this.verifyButton();
  }

  verifyButton() {
    const emailRegex = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
    const { email, playerName } = this.state;
    const tres = 3;
    let checked = true;
    if (emailRegex.test(email) && playerName.length >= tres) {
      checked = false;
    }
    this.setState({
      disabled: checked,
    });
  }

  async submit() {
    const { playerName, email } = this.state;
    const { setLogin, setToken, token } = this.props;
    setLogin(playerName, email);
    await setToken();
    if (token === 'erro') {
      this.setState({ getTokenError: true });
    } else {
      await this.saveToken();
      this.setState({ shouldRedirectPlay: true });
    }
  }

  saveToken() {
    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
  }

  redirect() {
    this.setState({ shouldRedirectConfig: true });
  }

  loginInputs(playerName, email) {
    return (
      <div className="inputs-div">
        <input
          type="text"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          className="login-input"
          data-testid="input-gravatar-email"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="playerName"
          value={ playerName }
          onChange={ this.handleChange }
          className="login-input"
          data-testid="input-player-name"
          placeholder="Name"
          required
        />
      </div>
    );
  }

  render() {
    const { disabled, playerName, email,
      shouldRedirectConfig, shouldRedirectPlay, getTokenError } = this.state;
    if (shouldRedirectConfig) { return <Redirect to="/settings" />; }
    if (shouldRedirectPlay) { return <Redirect to="/play" />; }
    if (getTokenError) { return <div>Erro! Tente novamente mais tarde</div>; }
    return (
      <div className="login-screen">
        <div className="login-box">
          <img className="brain" src={ brain } alt="Brain" />
          <form>
            { this.loginInputs(playerName, email) }
            <button
              type="button"
              onClick={ this.submit }
              className="login-button"
              disabled={ disabled }
              data-testid="btn-play"
            >
              Play
            </button>
            <button
              type="button"
              className="settings-button"
              data-testid="btn-settings"
              onClick={ this.redirect }
            >
              <img className="gear" src={ gear } alt="Gear" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

const mapDispatchToProps = (dispatch) => ({
  setLogin: (name, email) => dispatch(saveLogin(name, email)),
  setToken: () => dispatch(fetchTrivia()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  setLogin: PropTypes.func,
}.isRequired;
