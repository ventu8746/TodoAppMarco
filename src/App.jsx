import React, { useState } from "react";
// import React, { useEffect } from "react";
import { addItem } from "./function/function";

function App() {
	const [inputText, setInput] = useState("");
	const [todos, setTodos] = useState([]);

	return (
		<div>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Template • TodoMVC</title>
				<link rel="stylesheet" href="node_modules/todomvc-common/base.css" />
				<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css" />

				<link rel="stylesheet" href="css/app.css" />
			</head>
			<body>
				<section className="todoapp">
					<header className="header">
						<h1>TodoAppMarco</h1>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								setTodos(addItem(todos, inputText));
							}}
						>
							<input
								className="new-todo"
								onInput={(evt) => setInput(evt.target.value)}
								placeholder="What needs to be done?"
								autofocus
							/>
						</form>
					</header>
					{/* <!-- This section should be hidden by default and shown when there are todos --> */}
					<section className="main">
						<input id="toggle-all" className="toggle-all" type="checkbox" />
						<label for="toggle-all">Mark all as complete</label>
						<ul className="todo-list">
							{/* <!-- These are here just to show the structure of the list items -->
					<!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
							<li className="completed">
								<div className="view">
									<input className="toggle" type="checkbox" checked />
									<label>Taste JavaScript</label>
									<button className="destroy"></button>
								</div>
								<input className="edit" value="Create a TodoMVC template" />
							</li>
							<li>
								<div className="view">
									<input className="toggle" type="checkbox" />
									<label>Buy a unicorn</label>
									<button className="destroy"></button>
								</div>
								<input className="edit" value="Rule the web" />
							</li>
						</ul>
					</section>
					{/* <!-- This footer should be hidden by default and shown when there are todos --> */}
					<footer className="footer">
						{/* <!-- This should be `0 items left` by default --> */}
						<span className="todo-count">
							<strong>0</strong> item left
						</span>
						{/* <!-- Remove this if you don't implement routing --> */}
						<ul className="filters">
							<li>
								<a className="selected" href="#/">
									All
								</a>
							</li>
							<li>
								<a href="#/active">Active</a>
							</li>
							<li>
								<a href="#/completed">Completed</a>
							</li>
						</ul>
						{/* <!-- Hidden if no completed items are left ↓ --> */}
						<button className="clear-completed">Clear completed</button>
					</footer>
				</section>
				<footer className="info">
					<p>Double-click to edit a todo</p>
					{/* <!-- Remove the below line ↓ --> */}
					<p>
						Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
					</p>
					{/* <!-- Change this out with your name and url ↓ --> */}
					<p>
						Created by <a href="http://todomvc.com">you</a>
					</p>
					<p>
						Part of <a href="http://todomvc.com">TodoMVC</a>
					</p>
				</footer>
				{/* <!-- Scripts here. Don't remove ↓ --> */}
				<script src="node_modules/todomvc-common/base.js"></script>
				<script src="js/app.js"></script>
			</body>
		</div>
	);
}

export default App;
