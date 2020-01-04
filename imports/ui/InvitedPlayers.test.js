import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import  React  from "react";
import InvitedPlayers from "./InvitedPlayers.js";

describe("InvitedPlayers", function () {
	it("should render for host",  function (){


		let invited = [{username: "juan diego",
					  	},{username: "juan camilo",
					  	},{username: "pinilla chaves",
					  	}];	

		const create = shallow(<InvitedPlayers
			invited ={invited}
			isHost = {true} />);
		

		assert.equal(create.find("input").length, 1);

		assert.equal(create.find("button").length, 1);



	});
	it("should not render for guest",  function (){


		let invited = [{username: "juan diego",
					  	},{username: "juan camilo",
					  	},{username: "pinilla chaves",
					  	}];	

		const create = shallow(<InvitedPlayers
			invited ={invited}
			isHost = {false} />);
		

		assert.equal(create.find("input").length, 0);

		assert.equal(create.find("button").length, 0);




	});
});