import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import AccountsUIWrapper from "./AccountsUIWrapper.js";

class HomeHeaderUser extends Component {
	render() {
		let maxWpm = this.props.maxWpm;
		let otherUsername = null;
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
						{maxWpm !== undefined &&
							<span>
								Your max: <span className="bigger-header-message">{maxWpm}</span> wpm
							</span>
						}
					</div>
					<div className="col-sm-3">
						{
							// <div id="twitter-login">{otherUsername}</div>
						}
						<AccountsUIWrapper />
					</div>
				</div>
				<hr />
			</div>
		);
	}
}

export default withTracker(() => {

	let maxWpm = undefined;
	let user = Meteor.user();
	if (user) {
		maxWpm = user.profile.maxWpm;
		// if (!user.profile) {
		// 	Meteor.call("players.tryCreateProfile", () => {
		// 		maxWpm = user.profile.maxWpm;
		// 	});
		// }
	}
	return {
		maxWpm
	};
})(HomeHeaderUser);