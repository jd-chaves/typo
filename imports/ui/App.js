import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import CurrentGame from "./CurrentGame.js";
import CreateJoin from "./CreateJoin.js";
import Header from "./Header.js";

class App extends Component {
	render() {
		let user = this.props.currentUser;
		return (
			<Router>
				<div className="container-fluid">
					{!user &&
						<Switch><Redirect from="/:gameId" to="/" /></Switch>
					}
					<header>
						<Header />
					</header>
					<main>
						{user &&
							<Switch>
								<Route exact path="/" component={CreateJoin} />
								<Route path="/:gameId" component={CurrentGame} />
							</Switch>
						}
					</main>
				</div>
			</Router>
		);
	}
}

export default withTracker(() => {
	return {
		currentUser: Meteor.user()
	};
})(App);