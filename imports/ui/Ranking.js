import React, { Component } from "react";
import classnames from "classnames";

import RankingItem from "./RankingItem.js";

export default class Ranking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1
		};
		this.perPage = 5;
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange(e) {
		let value = e.target.value;
		let nextPage = this.state.currentPage;
		if (value === "previous") {
			if (nextPage !== 1) {
				nextPage--;
			}
		} else if (value === "next") {
			if (nextPage !== this.calculateNumberOfPages()) {
				nextPage++;
			}
		} else {
			nextPage = parseInt(value);
		}
		this.setState({
			currentPage: nextPage
		});
	}

	calculateNumberOfPages() {
		let numberOfPages = 1;
		let players = this.props.players;
		if (players.length > this.perPage) {
			numberOfPages = Math.floor(players.length / this.perPage) + 1;
		}
		return numberOfPages;
	}

	render() {
		let players = this.props.players;
		let currentPage = this.state.currentPage;
		let numberOfPages = this.calculateNumberOfPages();
		players = players.slice((currentPage - 1) * this.perPage, currentPage * this.perPage);
		let pagination = [
			<li key="previous" className="page-item">
				<button
					value="previous"
					onClick={this.handlePageChange}
					className="page-link page-button">
					Previous
				</button>
			</li>
		];
		for(let i = 1; i <= numberOfPages; i++) {
			let pageButtonClassName = classnames({
				"page-link": true,
				"page-button": true,
				"active-page": i === currentPage
			});
			pagination.push(
				<li key={i} className="page-item">
					<button
						value={i}
						onClick={this.handlePageChange}
						className={pageButtonClassName}>
						{i}
					</button>
				</li>
			);
		}
		pagination.push(
			<li key="next" className="page-item">
				<button
					value="next"
					onClick={this.handlePageChange}
					className="page-link page-button">
					Next
				</button>
			</li>
		);

		return (
			<div className="text-center">
				<h1 id="ranking-title">Ranking</h1>
				<ul className="pagination">
					{pagination}
				</ul>
				<table className="table">
					<thead>
						<tr>
							<th>Position</th>
							<th>Username</th>
							<th>Speed (wpm)</th>
							<th>Max ever (wpm)</th>
						</tr>
					</thead>
					<tbody>
						{
							players.map((player, index) => (
								<RankingItem
									key={player.username}
									position={(currentPage - 1) * this.perPage + index + 1}
									player={player} />
							))
						}
					</tbody>
				</table>
			</div>
		);
	}
}
