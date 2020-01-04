import React, { Component } from "react";

export default class RankingItem extends Component {
	render() {
		let player = this.props.player;
		let position = this.props.position;
		let username = player.username;
		let wpm = player.wpm;
		let maxWpm = player.maxWpm;
		return (
			<tr>
				<td>{position}</td>
				<td>{username}</td>
				<td>{wpm}</td>
				<td>{maxWpm}</td>
			</tr>
		);
	}
}
