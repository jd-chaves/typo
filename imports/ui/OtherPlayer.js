import React, { Component } from "react";

export default class OtherPlayer extends Component {
	render() {
		let player = this.props.player;
		if (player === undefined) {
			if (this.props.isFirst) {
				return <div className="is-first">You're the <strong>fastest</strong>!</div>;
			} else {
				return <div className="is-last">You're the <strong>slowest</strong> :(</div>;
			}
		}
		let position = this.props.position;
		let termination;
		switch(position) {
		case 1:
			termination = "st";
			break;
		case 2:
			termination = "nd";
			break;
		case 3:
			termination = "rd";
			break;
		default:
			termination = "th";
		}
		let username = player.username;
		let wpm = player.wpm;
		let current = player.current;

		let currentArray = current.split(" ");
		let amount = 4;
		current = currentArray
			.slice(-amount)
			.join(" ");
		return (
			<div className="row">
				<div className="col-sm-2 text-center">
					<div><span className="other-position">{position}</span>{termination}</div>
				</div>
				<div className="col-sm-3 text-center">
					<div className="other-username">{username}</div>
				</div>
				<div className="col-sm-5">
					<div className="other-current">{current}</div>
				</div>
				<div className="col-sm-2 text-center">
					<div className="other-wpm-number">{wpm}</div>
					<div>wpm</div>
				</div>
			</div>
		);
	}
}
