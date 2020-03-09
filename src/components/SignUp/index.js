import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = async event => {
    event.preventDefault();
    try {
      const { username, email, passwordOne } = this.state;
      const authUser = await this.props.firebase.doCreateUserWithEmailAndPassword(
        email,
        passwordOne
      );
      await this.props.firebase.user(authUser.user.uid).set({
        username,
        email
      });
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    } catch (error) {
      this.setState({ error });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink };
