import React from "react";
import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";

import "../imports/startup/accounts-config.js";

import App from "../imports/ui/App.js";

Meteor.startup(() => {
	ReactDOM.render(<App />, document.getElementById("render-target"));
});