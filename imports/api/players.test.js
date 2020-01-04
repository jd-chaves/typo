import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from "meteor/practicalmeteor:sinon";
import { Players } from "./players.js";
import faker  from "faker";

if (Meteor.isServer) {
	describe("Players", () => {
		const name = faker.name.findName();
		let currentUser;

		beforeEach(() => {
		// Stud the user
			resetDatabase();
			Factory.define("user", Meteor.users, {
				username: name,
			});
			currentUser = Factory.create("user");
			currentUser.profile = {maxWpm:0};
			sinon.stub(Meteor, "user");
			Meteor.user.returns(currentUser);
			
		});

		afterEach(() => {
			Meteor.user.restore();
			resetDatabase();
		});

		/*
		describe("player attempt maxWpm ", () => {


			it("should attempt update maxWpm", ()=>{

				
				Meteor.call("players.attemptMaxWpm", 85);		
				let user = Meteor.users.findOne({username:currentUser.username});
				assert.equal(user.username, currentUser.username);
				assert.equal(user.profile.maxWpm, 85);
			});
		});

*/
		
	});
}