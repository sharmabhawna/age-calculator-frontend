/* eslint-disable jsx-a11y/img-has-alt */
import React, { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.calculateAge = this.calculateAge.bind(this);
	}

	componentDidMount() {
		fetch("/visitorsCount")
			.then(res => res.text())
			.then(visitorsCount => {
				this.setState({ visitorsCount });
			});
		this.updated = true;
	}

	componentDidUpdate() {
		if (!this.updated) {
			fetch("/visitorsCount")
				.then(res => res.text())
				.then(visitorsCount => {
					this.setState({ visitorsCount });
					this.updated = true;
				});
		}
	}

	getBirthDay(dateOfBirth) {
		const birthDay = {
			year: +dateOfBirth.split("-")[0],
			month: +dateOfBirth.split("-")[1],
			date: +dateOfBirth.split("-")[2]
		};
		return birthDay;
	}

	calculateAge() {
		const dateOfBirth = document.getElementById("date-of-birth").value;
		const birthDay = this.getBirthDay(dateOfBirth);

		fetch("/age", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(birthDay)
		})
			.then(res => res.json())
			.then(age => {
				this.setState({ age, visitorsCount: this.state.visitorsCount });
			});
		this.updated = false;
	}

	render() {
		if (!this.state.age) {
			return (
				<div className="App">
					<div>Total Users count : {this.state.visitorsCount}</div>
					<main>
						<section>
							<label> Date of birth : </label>
							<input type="date" id="date-of-birth" />
						</section>
						<button onClick={this.calculateAge}>Submit</button>
					</main>
				</div>
			);
		}
		return (
			<div className="App">
				<div>Total Users count : {this.state.visitorsCount}</div>
				<main>
					<p>
						You are {" - "}
						{this.state.age.year} years {this.state.age.month} month(s){" "}
						{this.state.age.day} day(s) old
					</p>
				</main>
			</div>
		);
	}
}

export default App;
