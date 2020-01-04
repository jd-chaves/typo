import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Pending = new Mongo.Collection("pending");

if (Meteor.isServer) {
	Meteor.publish("pending", function pendingPublication() {
		return Pending.find();
	});
}

Meteor.methods({
	"pending.wait"(gameId) {
		let username = Meteor.user().username;
		let	pendingPlayer = {
			username,
			gameId
		};
		Pending.insert(pendingPlayer);
	},
	"pending.stopWaiting"() {
		let username = Meteor.user().username;
		Pending.remove({username});
	},
	"pending.notifyReady"(username) {
		Pending.update({username}, {$set: {ready: true}});
	}
});