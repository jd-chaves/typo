import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import GameHeader from "./GameHeader.js";

describe("GameHeader", function () {
	it("should render ",  function (){

		let match={params:{gameId:5}};
		const create = shallow(<GameHeader match = {match} />);


		assert.equal(create.find("span").text(), "5");

	});
});