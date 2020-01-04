import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Meteor } from "meteor/meteor";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

import HomeHeader from "./HomeHeader.js";
import HomeHeaderUser from "./HomeHeaderUser.js";
import GameHeader from "./GameHeader.js";

export default class Header extends Component {
	render() {
		if (!Meteor.user()) {
			return <HomeHeader/>;
		}
		return (
			<Switch>
				<Route exact path="/" component={HomeHeaderUser} />
				<Route path="/:gameId" component={GameHeader} />
			</Switch>
		);
	}
}
