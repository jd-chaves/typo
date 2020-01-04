import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import Timer from "./Timer.js";

describe("Timer", function () {
	it("should render only 1 preparation message",  function (){

		const create = shallow(<Timer
			timeRemaining ={0}
			prepareTime = {3}
			isHost = {true}
			host = "revisar"
			prepareGame={console.log("pG")} />);
		assert.equal(create.find("h2").text(), "The game starts in 3");
	});
});
