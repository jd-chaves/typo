import React, { Component } from "react";

export default class Timer extends Component {
	render() {
		let prepareTime = this.props.prepareTime;
		let timeRemaining = this.props.timeRemaining;
		let isHost = this.props.isHost;
		let host = this.props.host;
		let message;
		if (prepareTime !== 0 && timeRemaining === 0) {
			message = <h2>The game starts in {prepareTime}</h2>;
		} else {
			if (timeRemaining !== 0 ) {
				message = <h1 id="time-remaining">{timeRemaining}</h1>;
			} else {
				message = (
					<div>
						<h2>Waiting for <strong>{isHost ? "you" : host}</strong> to start the game...</h2>
						{isHost &&
							<button
								type="button"
								title="Start game"
								className="btn btn-primary"
								onClick={this.props.prepareGame}
								disabled={timeRemaining !== 0}>
								<i className="fa fa-play"></i>
							</button>
						}
					</div>
				);
			}
		}
		return <div id="timer">{message}</div>;
	}
}
