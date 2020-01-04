import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Games } from "./games.js";
import faker  from "faker";

if (Meteor.isServer) {
	describe("Games", () => {
		const name = faker.name.findName();
		let currentUser;
		let gameId;

		beforeEach(() => {
		// Stud the user
			resetDatabase();
			Factory.define("user", Meteor.users, {
				username: name,
			});
			currentUser = Factory.create("user");
			sinon.stub(Meteor, "user");
			Meteor.user.returns(currentUser);

			gameId = faker.random.number()+"";
			let host = currentUser.username;
			let prepareTime = 0;
			let timeRemaining = 0;
			let text = "hola mundo";
			let players = [{
				username: host,
				wpm: 0,
				current: ""
			}];
			let newGame = {
				_id: gameId,
				host,
				text,
				prepareTime,
				timeRemaining,
				players
			};
			newGame.privateGame = true;
			newGame.invited = [];

			Games.insert(newGame);

			Accounts.createUser({
				username: "juan diego",
				email: "test@hotmail.com",
				password: "password",
				profile: {} 
			});   
		});

		afterEach(() => {
			Meteor.user.restore();
			resetDatabase();
		});



		describe("invite player", () => {


			it("should invite player correctly", ()=>{
				Meteor.call("games.invitePlayer", gameId, "juan diego");		
				let game = Games.findOne({_id:gameId});
				
				let invited = game.invited;
				let agregado = invited.filter((e)=>e.username==="juan diego").length; 
				assert.equal(agregado, 1);
			});
		});

		describe("set  current", () => {
			it("should set current", ()=>{
				Meteor.call("games.setCurrent", gameId, "test");		
				let game = Games.findOne({_id:gameId});

				let players = game.players;
				let player;
				for (let p of players) {
					if (p.username === currentUser.username) {
						player = p;
						break;
					}
				}
				assert.equal(player.current, "test");
			});
		});

		describe("add  char", () => {
			it("should add char to current String", ()=>{
				Meteor.call("games.addChar", gameId, "b");		
				let game = Games.findOne({_id:gameId});

				let players = game.players;
				let player;
				for (let p of players) {
					if (p.username === currentUser.username) {
						player = p;
						break;
					}
				}
				assert.equal(player.current, "b");
			});
		});
		describe("set  timeRemaining", () => {
			it("should set time remaining correctly", ()=>{
				Meteor.call("games.setTimeRemaining", gameId, 10);
				let game = Games.findOne({_id:gameId});
				assert.equal(game.timeRemaining, 10);
			});
		});

		describe("set prepareTime", () => {
			it("should set prepare time  correctly", ()=>{
				Meteor.call("games.setPrepareTime", gameId, 20);
				let game = Games.findOne({_id:gameId});
				assert.equal(game.prepareTime, 20);
			});
		});

		describe("removePlayer from game", ()=>{
			it("should remove player from game", ()=>{
				let game = Games.findOne({_id:gameId});
				let players = game.players; 
				assert.equal(players.length, 1);
				Meteor.call("games.removePlayer", gameId);
				game = Games.findOne({_id:gameId});
				players = game.players; 
				assert.equal(players.length, 0);
			});

		});
		describe("setWpm", () => {
			it("should set words per minute", () => {

				Meteor.call("games.setWpm", gameId,  80);
			

				let game = Games.findOne({_id:gameId});

				let players = game.players;
				let player;
				for (let p of players) {
					if (p.username === currentUser.username) {
						player = p;
						break;
					}
				}
				assert.equal(player.wpm, 80);

			});
		});
	});
}