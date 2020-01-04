import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import classnames from "classnames";

import ShownText from "./ShownText.js";

export default class CurrentPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState();
		this.handleChange = this.handleChange.bind(this);
	}

	initialState() {
		let gameId = this.props.gameId;
		let initialCurrent = "";
		let initialWpm = 0;
		Meteor.call("games.setCurrent", gameId, initialCurrent);
		Meteor.call("games.setWpm", gameId, initialWpm);
		this.inAccent = false;
		return {
			index: 0,
			wordIndex: 0,
			shownIndex: 0,
			amount: 7,
			counter: 0,
			value: ""
		};
	}

	calculateWpm() {
		let timeElapsed = this.props.timeElapsed;

		let wordIndex = this.state.wordIndex;
		let counter = this.state.counter;

		let totalWords = wordIndex + counter;
		let wpm = timeElapsed !== 0 ? 
			(totalWords / timeElapsed) * 60
			: 0;
		wpm = Math.round(wpm);
		return wpm;
	}

	attemptMaxWpm() {
		let wpm = this.calculateWpm();
		Meteor.call("players.attemptMaxWpm", wpm, (err, res) => {
			if (res) {
				this.props.showSuccess();
			}
		});
	}

	updateWpm() {
		let gameId = this.props.gameId;
		let wpm = this.calculateWpm();
		Meteor.call("games.setWpm", gameId, wpm);
	}

	addChar(char) {
		let gameId = this.props.gameId;
		Meteor.call("games.addChar", gameId, char);
	}

	addAccent(vocal) {
		switch (vocal) {
		case "a":
			return "á";
		case "e":
			return "é";
		case "i":
			return "í";
		case "o":
			return "ó";
		case "u":
			return "ú";
		default:
			return null;
		}
	}

	handleChange(e) {
		let index = this.state.index;
		let inputText = e.target.value;
		let inputChar = inputText[inputText.length - 1];
		if (inputChar === "´") {
			this.inAccent = true;
			return;
		}
		if (this.inAccent) {
			inputChar = this.addAccent(inputChar);
			inputText = inputText.slice(0, inputText.length - 1);
			inputText += inputChar;
			this.inAccent = false;
		}
		if (
			(inputChar !== " " || inputText !== " ")
			&& inputChar === this.props.text[index]
		) {
			this.addChar(inputChar);
			this.setState(state => {
				index = state.index;
				let shownIndex = state.shownIndex;
				shownIndex++;
				index++;
				let wordIndex = state.wordIndex;
				let counter = state.counter;
				let amount = state.amount;
				if (inputChar === " ") {
					inputText = "";
					counter++;
					if (counter === amount) {
						wordIndex += amount;
						counter = 0;
						shownIndex = 0;
					}
				}
				return {
					value: inputText,
					shownIndex,
					index,
					counter,
					wordIndex,
					amount
				};
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props) {
			let timeElapsed = nextProps.timeElapsed;
			if (timeElapsed === 0) {
				this.setState(this.initialState());
			} else if (timeElapsed === 60) {
				this.attemptMaxWpm();
				this.setState({value: ""});
			} else {
				this.updateWpm();
			}
		}
	}

	render() {
		let shownIndex = this.state.shownIndex;
		let wordIndex = this.state.wordIndex;
		let amount = this.state.amount;

		let textArray = this.props.text
			.split(" ");
		let shownText = textArray
			.slice(wordIndex, wordIndex + amount)
			.join(" ");
		let nextText = textArray
			.slice(wordIndex + amount, wordIndex + 2 * amount)
			.join(" ");

		let position = this.props.position;
		let termination;
		switch(position) {
		case 1:
			termination = "st";
			break;
		case 2:
			termination = "nd";
			break;
		case 3:
			termination = "rd";
			break;
		default:
			termination = "th";
		}
		let timeElapsed = this.props.timeElapsed;
		let wpm = this.props.wpm;
		let inputClassName = classnames({
			"input-waiting": timeElapsed === 60,
			"input-playing": timeElapsed !== 60
		});
		let inputPlaceholder = timeElapsed === 60 ? "Get ready..." : "";
		return (
			<div className="row">
				<div className="col-sm-2 text-center">
					<div><span id="current-position">{position}</span>{termination}</div>
				</div>
				<div className="col-sm-8 text-center">
					{
						timeElapsed !== 60 &&
							<div id="my-text">
								<ShownText
									text={shownText}
									index={shownIndex} />
								<div>{nextText}</div>
							</div>
					}
					<label>
						<span className="arrow">&#x21E8;{" "}</span>
						<input
							className={inputClassName}
							placeholder={inputPlaceholder}
							title="Type here"
							autoFocus
							type="text"
							value={this.state.value}
							onChange={this.handleChange} />
						<span className="arrow">{" "}&#x21E6;</span>
					</label>
				</div>
				<div className="col-sm-2 text-center">
					<div id="current-wpm-number">{wpm}</div>
					<div>wpm</div>
				</div>
			</div>
		);
	}
}