import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import RankingItem from "./RankingItem.js";

describe("RankingItem", function () {
	it("should render ranking item",  function (){


		let newPlayer = {username: "juan diego",
					  wpm: 54,
					  maxWpm: 86
				};	
		const create = shallow(<RankingItem
			player ={newPlayer}
			position = {3} />);
		

		assert.equal(create.find("tr").length, 1);
		assert.equal(create.find("tr").children().length, 4);
		assert.equal(create.find("tr").childAt(0).type(), "td");
		assert.equal(create.find("tr").childAt(1).type(), "td");
		assert.equal(create.find("tr").childAt(2).type(), "td");
		assert.equal(create.find("tr").childAt(3).type(), "td");
		assert.equal(create.find("tr").childAt(0).text(), "3");
		assert.equal(create.find("tr").childAt(1).text(), "juan diego");
		assert.equal(create.find("tr").childAt(2).text(), "54");
		assert.equal(create.find("tr").childAt(3).text(), "86");
	});
});
