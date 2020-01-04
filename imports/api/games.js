import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

import generateWords from "./WordGenerator.js";

export const Games = new Mongo.Collection("games");

if (Meteor.isServer) {
	Meteor.publish("games", function gamesPublication() {
		return Games.find();
	});
}

let numberOfWords = 200;

Meteor.methods({
	"games.create"(language, privateGame) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}

		let gameId = "" + (Games.find({}).count() + 1);
		let host = Meteor.user().username;
		let text = generateWords(language, numberOfWords);
		let prepareTime = 0;
		let timeRemaining = 0;
		let players = [{
			username: host,
			wpm: 0,
			current: ""
		}];
		let newGame = {
			_id: gameId,
			host,
			text,
			language,
			prepareTime,
			timeRemaining,
			players
		};
		if (privateGame) {
			newGame.privateGame = true;
			newGame.invited = [];
		}
		Games.insert(newGame);
		return gameId;
	},
	"games.changeText"(gameId) {
		let game = Games.findOne(gameId);
		if (!game) return;
		let language = game.language;
		let text = generateWords(language, numberOfWords);
		Games.update(gameId, {$set: {text}});
	},
	"games.removePlayer"(gameId) {
		let game = Games.findOne(gameId);
		let players = game
			.players
			.filter(p => p.username !== Meteor.user().username);
		Games.update(gameId, {$set: {players}});
	},
	"games.join"(gameId) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}

		let game = Games.findOne(gameId);
		if (!game) {
			return {
				errorMessage: `The game with ID ${gameId} doesn't exist.`
			};
		}
		let privateGame = game.privateGame;
		let invited = game.invited;
		if (privateGame) {
			let invitedPlayer = null;
			for (let inv of invited) {
				if (inv.username === Meteor.user().username) {
					invitedPlayer = inv;
					break;
				}
			}
			let isHost = game.host === Meteor.user().username;
			if (!isHost) {
				if (!invitedPlayer) {
					return {
						errorMessage: "This game is private and you haven't been invited."
					};
				}
				invitedPlayer.joined = true;
			}
		}
		let newPlayer = {
			username: Meteor.user().username,
			wpm: 0,
			current: ""
		};
		let update = {
			$push: {players: newPlayer},
		};
		if (privateGame) {
			update.$set = {invited};
		}
		Games.update(gameId, update);
		return {ok: true};
	},
	"games.setTimeRemaining"(gameId, timeRemaining) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}

		Games.update(gameId, {$set: {timeRemaining}});
	},
	"games.setPrepareTime"(gameId, prepareTime) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}

		Games.update(gameId, {$set: {prepareTime}});
	},
	"games.addChar"(gameId, char) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		let players = game.players;
		let player;
		for (let p of players) {
			if (p.username === Meteor.user().username) {
				player = p;
				break;
			}
		}
		let current = player.current;
		current += char;
		player.current = current;
		Games.update(gameId, {$set: {players}});
	},
	"games.setWpm"(gameId, wpm) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		let players = game.players;
		let player;
		for (let p of players) {
			if (p.username === Meteor.user().username) {
				player = p;
				break;
			}
		}
		player.wpm = wpm;
		Games.update(gameId, {$set: {players}});
	},
	"games.setCurrent"(gameId, current) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		let players = game.players;
		let player;
		for (let p of players) {
			if (p.username === Meteor.user().username) {
				player = p;
				break;
			}
		}
		player.current = current;
		Games.update(gameId, {$set: {players}});
	},
	"games.invitePlayer"(gameId, username) {
		if (!Meteor.user()._id) {
			throw new Meteor.Error("not-authorized");
		}
		let game = Games.findOne(gameId);
		if (!game.privateGame) {
			throw new Meteor.Error("operation not supported on public games");
		}
		let exists = Meteor.users.find({username}).count() === 1;
		if (!exists) {
			return {
				errorMessage: `The username ${username} doesn't exist.`
			};
		}
		let invited = game.invited;
		let alreadyInvited = invited
			.filter(invitedPlayer => invitedPlayer.username === username)
			.length === 1;
		if (username !== game.host && !alreadyInvited) {
			let newInvited = {
				username,
				joined: false
			};
			Games.update(gameId, {$push: {invited: newInvited}});
		}
		return {ok: true};
	}
});