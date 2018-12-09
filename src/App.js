import React, { Component } from 'react';
import keys from './config/keys';

class GoogleAuth extends Component {
	state = {
		isSignedIn: false,
	}

	async componentDidMount() {
		// load up google api lib
		window.gapi.load('client: auth2', () => {
			window.gapi.client.init({
				clientId: keys.google_oauth_client_id,
				scope: 'email',
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.setState({ isSignedIn: this.auth.isSignedIn.get()});
				// listen for sign-in state change
				this.auth.isSignedIn.listen(this.updateSigninStatus);
			});
		});
	}

	updateSigninStatus = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	}

	googleLogin = () => this.auth.signIn();

	googleLogout = () => this.auth.signOut();

  render() {
		const { isSignedIn } = this.state; console.log(isSignedIn);
    return (
      <div>
				<button
					onClick={isSignedIn ? this.googleLogout : this.googleLogin}
					style={{
						fontSize: 25,
					}}
				>
					{
						isSignedIn ?
						'Log out' :
						'Login with Google'
					}
				</button>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleAuth />
      </div>
    );
  }
}

export default App;
