import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import Create from "./Create.js";

describe("Create", function () {
	it("should show a button", function (){

		const create = shallow(<Create
			language="en"
			privateGame={false}
			handleLanguageChange={console.log("hlc")}
			handlePrivateGameChange={console.log("hpgc")}
			handleCreate={console.log("hc")} />);

		assert.equal(create.find("button").length, 1);
	});
});