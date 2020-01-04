import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
	Meteor.publish("players", function playersPublication() {
		return Meteor.users.find();
	});
}

Meteor.methods({
	"players.attemptMaxWpm"(wpm) {
		let maxWpm = Meteor.users.findOne(Meteor.userId()).profile.maxWpm;
		if (wpm > maxWpm) {
			maxWpm = wpm;
			Meteor.users.update(Meteor.userId(), {$set: {"profile.maxWpm": maxWpm}});
			return true;
		}
		return false;
	},
	"players.tryCreateProfile"() {
		let hasProfile = Meteor.users.findOne(Meteor.userId()).profile !== undefined;
		if (!hasProfile) {
			Meteor.users.update(Meteor.userId(), {$set: {"profile.maxWpm": 0}});
		}
	}
});