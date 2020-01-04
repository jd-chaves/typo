import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import InvitedPlayer from "./InvitedPlayer.js";

export default class InvitedPlayers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inviteUsername: ""
		};
		this.handleInviteUsernameChange = this.handleInviteUsernameChange.bind(this);
		this.handleInvitePlayer = this.handleInvitePlayer.bind(this);
	}

	handleInviteUsernameChange(e) {
		let inviteUsername = e.target.value;
		this.setState({
			inviteUsername
		});
	}

	handleInvitePlayer(e) {
		e.preventDefault();
		let inviteUsername = this.state.inviteUsername;
		if (inviteUsername.length === 0) return;
		let gameId = this.props.gameId;
		Meteor.call("games.invitePlayer", gameId, inviteUsername, (err, res) => {
			if (res.ok) {
				this.setState({
					inviteUsername: ""
				});
			} else {
				alert(res.errorMessage);
			}
		});
	}

	render() {
		let isHost = this.props.isHost;
		let invited = this.props.invited;
		return (
			<div>
				<div className="row">
					<div className="col-sm-3">
						<h2>Invited</h2>
					</div>
					{isHost &&
						<div className="text-right col-sm-9">
							<form onSubmit={this.handleInvitePlayer}>
								<input
									type="text"
									placeholder="Invite a new player"
									value={this.state.inviteUsername}
									onChange={this.handleInviteUsernameChange} />
								<button
									id="invite-player-button"
									className="btn btn-primary"
									type="button"
									name="Invite player"
									onClick={this.handleInvitePlayer}>
									<i className="fa fa-plus"></i>
								</button>
							</form>
						</div>
					}
				</div>
				{
					invited.map(invitedPlayer => 
						<InvitedPlayer
							key={invitedPlayer.username}
							invitedPlayer={invitedPlayer} />
					)
				}
			</div>
		);
	}
}
