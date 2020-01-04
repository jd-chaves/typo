import React, { Component } from "react";

export default class Invitation extends Component {
	constructor(props) {
		super(props);
		this.handleJoinFromInvitation = this.handleJoinFromInvitation.bind(this);
	}

	handleJoinFromInvitation() {
		let gameId = this.props.invitation.gameId;
		this.props.handleJoinFromInvitation(gameId);
	}

	render() {
		let invitation = this.props.invitation;
		let host = invitation.host;
		return (
			<div className="invitation-alert alert alert-info alert-dismissible">
				<button
					onClick={this.props.dismissErrorMessage}
					type="button"
					className="close alert-close"
					data-dismiss="alert">
					&times;
				</button>
				{host} has invited you to
				<button
					className="btn btn-link"
					type="button"
					onClick={this.handleJoinFromInvitation}>
					<strong> this </strong>
				</button>
				game.
			</div>
		);
	}
}