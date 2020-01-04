import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { Games } from "../api/games.js";

import Invitation from "./Invitation.js";

class Join extends Component {
	render() {
		let errorMessage = this.props.errorMessage;
		let invitations = this.props.invitations;
		return (
			<div className="col-sm-6">
				<h1>Join a game</h1>
				<form onSubmit={this.props.handleJoin}>
					<label>
						Enter the game ID:{" "}
						<input
							autoFocus
							type="text"
							value={this.props.gameIdJoin}
							onChange={this.props.handleGameIdJoinChange} />
					</label>
				</form>
				{errorMessage &&
					<div id="join-error-alert">
						<div className="alert alert-danger alert-dismissible">
							<button
								onClick={this.props.dismissErrorMessage}
								type="button"
								className="close alert-close"
								data-dismiss="alert">
								&times;
							</button>
							{errorMessage}
						</div>
					</div>
				}
				{invitations &&
					invitations.map(invitation => 
						<Invitation
							invitation={invitation}
							handleJoinFromInvitation={this.props.handleJoinFromInvitation} />
					)
				}
			</div>
		);
	}
}

export default withTracker(() => {
	if (Meteor.subscribe("games").ready()) {
		let gamesInvitedTo = Games.find({
			invited: {
				username: Meteor.user().username,
				joined: false
			}
		}).fetch();
		let invitations = gamesInvitedTo
			.map(game => {
				return {
					host: game.host,
					gameId: game._id
				};
			});
		return {
			invitations
		};
	} else {
		return {};
	}
})(Join);