import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

export default class GameHeader extends Component {
	render() {
		let gameId = this.props.match.params.gameId;
		// let otherUsername = null;
		// if (Meteor.user() && Meteor.user().services && Meteor.user().services.twitter) {
		// 	otherUsername = "@" + Meteor.user().services.twitter.screenName;
		// }
		return (
			<div>
				<div className="row text-center">
					<div className="col-sm-3">
						<h1 className="display-1">
							<Link to="/">TYPO</Link>
						</h1>
					</div>
					<div className="col-sm-6 header-message">
						Game ID: <span className="bigger-header-message">{gameId}</span>
					</div>
					<div className="col-sm-3">
						{
							//<div id="twitter-login">{otherUsername}</div>
						}
						<AccountsUIWrapper />
					</div>
				</div>
				<hr />
			</div>
		);
	}
}
