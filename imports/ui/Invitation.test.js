import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import Invitation from "./Invitation.js";

describe("Invitation", function () {
	it("should render ",  function (){
		let invitation = 
			{host:"juan diego",
				gameId:8};
		const create = shallow(<Invitation
			invitation={invitation}
			handleJoinFromInvitation={console.log("hjfi")}/>);
		assert.equal(create.find("div").length, "1");

		let contains = create.find("div").text().includes("juan diego has invited you to this game");
		assert.equal(contains, true);
		assert.equal(create.find("div").hasClass("invitation-alert"), true);
		assert.equal(create.find("div").hasClass("alert-info"), true);
		assert.equal(create.find("div").hasClass("alert"), true);
		assert.equal(create.find("div").hasClass("alert-dismissible"), true);
		assert.equal(create.find("button").length, "2");
	});
});