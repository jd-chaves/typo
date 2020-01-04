import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import HomeHeader from "./HomeHeader.js";

describe("HomeHeader", function () {
	it("should render ",  function (){

		const create = shallow(<HomeHeader />);
		assert.equal(create.find("h2").text(), "A typing competition for you and your friends");

		assert.equal(create.find("#home-title").length, 1);
		assert.equal(create.find("#welcome-message").length, 1);
		assert.equal(create.find("#home-title").name(), "h1");
		assert.equal(create.find("#welcome-message").name(), "h2");
	});
});