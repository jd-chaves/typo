import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import { Factory } from "meteor/dburles:factory";
import { sinon } from "meteor/practicalmeteor:sinon";
import HomeHeaderUser from "./HomeHeaderUser.js";

describe("HomeHeaderUser", function () {
	it("should render max words",  function (){

		// Factory.define("user", Meteor.users, {
		// 	profile: {
		// 		maxWpm: 75
		// 	}
		// });
		// let currentUser = Factory.create("user");
		// sinon.stub(Meteor, "user");
		// Meteor.user.returns(currentUser);
		
		// const create = shallow(<HomeHeaderUser />);


		// assert.equal(create.find("span").length, 1);


	});
	it("should not render max words",  function (){
		
		// const create = shallow(<HomeHeaderUser
		// 	/>);


		// assert.equal(create.find("span").length, 0);

	
	});
});