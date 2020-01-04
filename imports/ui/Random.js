import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { Pending } from "../api/pending.js";

import classnames from "classnames";

class Random extends Component {
	constructor(props) {
		super(props);
		this.state = {
			waiting: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let waiting = this.state.waiting;
		if (!waiting) {
			let pendingPlayers = this.props.pendingPlayers;
			let rivalPlayer = null;
			let currentWpm = Meteor.user().profile.maxWpm;
			let maxDiff = 20;
			for (let p of pendingPlayers) {
				let currentRivalUsername = p.username;
				let rivalWpm = Meteor.users.findOne({username: currentRivalUsername}).profile.maxWpm;
				let diff = Math.abs(currentWpm - rivalWpm);
				if (diff < maxDiff) {
					rivalPlayer = p;
					break;
				}
			}
			if (rivalPlayer) {
				let gameIdJoin = rivalPlayer.gameId;
				Meteor.call("games.join", gameIdJoin, (err, res) => {
					if (res.ok) {
						Meteor.call("pending.notifyReady", rivalPlayer.username);
						this.props.displayRandomGame(gameIdJoin);
					}
				});
			} else {
				Meteor.call("games.create", "en", false, (err, res) => {
					let gameId = res;
					Meteor.call("pending.wait", gameId);
					this.setState({
						waiting: !waiting
					});
				});
			}
		} else {
			Meteor.call("pending.stopWaiting");
			this.setState({
				waiting: !waiting
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			let pendingPlayers = nextProps.pendingPlayers;
			if (!pendingPlayers) return;
			let pendingPlayer = pendingPlayers
				.filter(pp => pp.username === Meteor.user().username)[0];
			if (pendingPlayer && pendingPlayer.ready) {
				this.props.displayRandomGame(pendingPlayer.gameId);
				Meteor.call("pending.stopWaiting");
			}
		}
	}

	componentWillUnmount() {
		if (this.state.waiting) {
			Meteor.call("pending.stopWaiting");
		}
	}

	render() {
		let pendingPlayers = this.props.pendingPlayers;
		if (!pendingPlayers) {
			return null;
		}
		let waiting = this.state.waiting;
		let title = waiting ?
			"Waiting for a player with similar level..." :
			"Play with a random player";

		let iconStyle = waiting ? "fa-remove" : "fa-play";
		let className = classnames(
			"fa",
			{[iconStyle]: true}
		);
		let spinner = null;
		if (waiting) {
			spinner = <i id="waiting-spinner" className="fa fa-spinner fa-spin"></i>;
		}
		let button = (
			<button
				type="button"
				className="btn btn-primary"
				onClick={this.handleClick}>
				<i className={className}></i>
			</button>
		);
		return (
			<div>
				<h2 id="waiting-title">{title}</h2>
				{button}
				<br />
				{spinner}
			</div>
		);
	}
}

export default withTracker(() => {
	if (Meteor.subscribe("pending").ready() && Meteor.subscribe("players").ready()) {
		let pendingPlayers = Pending.find().fetch();
		return {
			pendingPlayers
		};
	} else {
		return {};
	}
})(Random);