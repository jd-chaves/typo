import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Redirect } from "react-router-dom";

import Create from "./Create.js";
import Join from "./Join.js";
import Random from "./Random.js";

export default class CreateJoin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameId: null,
			gameIdJoin: "",
			language: "es",
			privateGame: false,
			errorMessage: null
		};
		this.handleCreate = this.handleCreate.bind(this);
		this.handleGameIdJoinChange = this.handleGameIdJoinChange.bind(this);
		this.handleLanguageChange = this.handleLanguageChange.bind(this);
		this.handlePrivateGameChange = this.handlePrivateGameChange.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
		this.handleJoinFromInvitation = this.handleJoinFromInvitation.bind(this);
		
		this.dismissErrorMessage = this.dismissErrorMessage.bind(this);
		this.displayRandomGame = this.displayRandomGame.bind(this);
	}

	dismissErrorMessage() {
		this.setState({
			errorMessage: null
		});
	}

	handleCreate() {
		let language = this.state.language;
		let privateGame = this.state.privateGame;
		Meteor.call("games.create",
			language,
			privateGame,
			(err, res) => {
				let gameId = res;
				this.setState({
					gameId
				});
			}
		);
	}

	handleGameIdJoinChange(e) {
		let gameIdJoin = e.target.value;
		if (!/^\d*$/.test(gameIdJoin)) return;
		this.setState({
			gameIdJoin,
			errorMessage: null
		});
	}

	handlePrivateGameChange(e) {
		let privateGame = e.target.checked;
		this.setState({
			privateGame
		});
	}

	handleLanguageChange(e) {
		let language = e.target.value;
		this.setState({
			language
		});
	}

	handleJoin(e) {
		e.preventDefault();
		let gameIdJoin = this.state.gameIdJoin;
		if (gameIdJoin === "") return;
		Meteor.call("games.join", gameIdJoin, (err, res) => {
			if (res.ok) {
				this.setState({
					gameId: gameIdJoin
				});
			} else {
				let errorMessage = res.errorMessage;
				this.setState({
					errorMessage
				});
			}
		});
	}

	handleJoinFromInvitation(gameIdJoin) {
		Meteor.call("games.join", gameIdJoin, (err, res) => {
			if (res.ok) {
				this.setState({
					gameId: gameIdJoin
				});
			} else {
				let errorMessage = res.errorMessage;
				this.setState({
					errorMessage
				});
			}
		});
	}

	displayRandomGame(gameId) {
		this.setState({
			gameId
		});
	}

	render() {
		let gameId = this.state.gameId;
		if (gameId) {
			return <Redirect to={`/${gameId}`} />;
		}
		return (
			<div>
				<div className="text-center row">
					<div className="col-sm-12">
						<Random
							displayRandomGame={this.displayRandomGame} />
					</div>
				</div>
				<div id="create-join" className="row">
					<Create
						language={this.state.language}
						privateGame={this.state.privateGame}
						handleLanguageChange={this.handleLanguageChange}
						handlePrivateGameChange={this.handlePrivateGameChange}
						handleCreate={this.handleCreate} />
					<Join
						errorMessage={this.state.errorMessage}
						dismissErrorMessage={this.dismissErrorMessage}
						handleJoin={this.handleJoin}
						gameIdJoin={this.state.gameIdJoin}
						handleGameIdJoinChange={this.handleGameIdJoinChange}
						handleJoinFromInvitation={this.handleJoinFromInvitation} />
				</div>
			</div>
		);
	}
}