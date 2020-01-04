import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Pending } from "./pending.js";
import faker  from "faker";

if (Meteor.isServer) {
	describe("Pending", () => {
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
			
		});

		afterEach(() => {
			Meteor.user.restore();
			resetDatabase();
		});



		describe("pending notify ready", () => {

			beforeEach(() => {
				let newP = {
					username: currentUser.username,
					gameId
				};
				Pending.insert(newP);
			});
			it("should notify ready", ()=>{

				let user = Pending.findOne({username:currentUser.username});
				assert.equal(!!user, true);
				assert.equal(user.ready, undefined);
				Meteor.call("pending.notifyReady", currentUser.username);		
				user = Pending.findOne({username:currentUser.username});
				assert.equal(user.username, currentUser.username);
				assert.equal(user.ready, true);
			});
		});

		describe("pending wait", () => {


			it("should insert user in pending", ()=>{

				let user = Pending.findOne({username:currentUser.username});
				assert.equal(user, undefined);
				Meteor.call("pending.wait", gameId);		
				user = Pending.findOne({username:currentUser.username});
				assert.equal(user.username, currentUser.username);
				assert.equal(user.gameId, gameId);
			});
		});


		describe("pending stop waiting", () => {
			beforeEach(() => {
				let newP = {
					username: currentUser.username,
					gameId
				};
				Pending.insert(newP);
			});

			it("should stop waiting", ()=>{
				let user = Pending.findOne({username:currentUser.username});
				assert.equal(user.username, currentUser.username);
				Meteor.call("pending.stopWaiting");		
				user = Pending.findOne({username:currentUser.username});
				assert.equal(user, undefined);
			});
		});
	});
}