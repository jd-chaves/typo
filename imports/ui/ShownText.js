import React, { Component } from "react";

export default class ShownText extends Component {
	render() {
		let text = this.props.text;
		let index = this.props.index;
		let shown = [];
		for (let i = 0; i < index; i++) {
			let c = text[i];
			shown.push(
				<span key={i} className="done-char">{c}</span>
			);
		}
		shown.push(
			<span key={index} className="current-char">{text[index]}</span>
		);
		return (
			<div>
				{shown}{text.slice(index + 1)}
			</div>
		);
	}
}
