import React, { Component } from "react";

import classnames from "classnames";

export default class InvitedPlayer extends Component {
	render() {
		let invitedPlayer = this.props.invitedPlayer;
		let username = invitedPlayer.username;
		let inGame = invitedPlayer.inGame;
		let inGameClass = inGame ? "badge-primary" : "badge-secondary";
		let className = classnames(
			"invited-player badge badge-pill",
			{[inGameClass]: true}
		);
		return (
			<div className={className}>
				{username}
			</div>
		);
	}
}
