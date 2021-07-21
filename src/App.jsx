import React, { useState, useEffect } from "react";

// import React, { useEffect } from "react";
import {
	addItem,
	toggleTodo,
	deleteTodo,
	toggleTodoAll,
	serialize,
	deserialize,
	toggleTypeTodos,
	listNumber,
} from "./function/function";

let idCount = 0;

function App() {
	const [inputText, setInput] = useState("");
	const [todosType, setTypeToggle] = useState("all");
	const [todos, setTodos] = useState(() => deserialize() || []);
	const [checkComp, setCheckComp] = useState(true);

	useEffect(() => {
		serialize(todos);
	}, [todos]);

	function handleSubmit(event) {
		event.preventDefault();
		setTodos(addItem(todos, inputText));
		setInput("");
		idCount++;
	}

	const filterActive = todos.filter((elem) => !elem.completed).length;
	const todosSwitch = toggleTypeTodos(todosType, todos);

	return (
		<div>
			<section className="todoapp">
				<header className="header">
					<h1>TodoAppMarco </h1>

					<form onSubmit={handleSubmit}>
						<input
							className="new-todo"
							onInput={(evt) => setInput(evt.target.value)}
							placeholder="Cosa devi portare a termine?"
							value={inputText}
							autoFocus
						/>
					</form>
				</header>
				{/* <!-- This section should be hidden by default and shown when there are todos --> */}
				<section className="main">
					<input id="toggle-all" className="toggle-all" type="checkbox" />
					<label
						onClick={() => {
							setTodos(toggleTodoAll(todos, checkComp));
							setCheckComp(() => !checkComp);
						}}
						htmlFor="toggle-all"
					>
						Mark all as complete
					</label>
					<ul className="todo-list">
						{/* <!-- These are here just to show the structure of the list items -->
					<!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
						{todosSwitch.map((todo, index) => (
							<li className={todo.completed ? "completed" : ""}>
								<div className="view">
									<input
										onChange={() => {
											setTodos(toggleTodo(todos, index, todo.id));
										}}
										className="toggle"
										type="checkbox"
										checked={todo.completed}
									/>
									<label onDoubleClick={(e) => alert(e.target.value)}>
										{todo.todo}
									</label>
									<button
										onClick={() => setTodos(deleteTodo(todos, index, todo.id))}
										className="destroy"
									></button>
								</div>
								{<input className="edit" value="Create a TodoMVC template" />}
							</li>
						))}
					</ul>
				</section>
				{/* <!-- This footer should be hidden by default and shown when there are todos --> */}
				<footer className="footer">
					{/* <!-- This should be `0 items left` by default --> */}
					<span className="todo-count">
						<strong>{filterActive}</strong>{" "}
						{filterActive != 1 ? "todo rimanenti" : "todo rimanente"}
					</span>
					{/* <!-- Remove this if you don't implement routing --> */}
					<ul className="filters">
						<li>
							<a
								onClick={() => {
									setTypeToggle("all");
								}}
								className="selected"
								href="#/"
							>
								All
							</a>
						</li>
						<li>
							<a
								onClick={() => {
									setTypeToggle("active");
								}}
								href="#/active"
							>
								Active
							</a>
						</li>
						<li>
							<a
								onClick={() => {
									setTypeToggle("completed");
								}}
								href="#/completed"
							>
								Completed
							</a>
						</li>
					</ul>
					{/* <!-- Hidden if no completed items are left ↓ --> */}
					<button
						onClick={() => {
							setTodos(todos.filter((elem) => elem.completed !== true));
						}}
						className="clear-completed"
					>
						Clear completed
					</button>
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
					Created by <a href="http://todomvc.com">Marco Venturini</a>
				</p>
				<p>
					Part of <a href="http://todomvc.com">TodoMVC</a>
				</p>
			</footer>
			{/* <!-- Scripts here. Don't remove ↓ --> */}
		</div>
	);
}

export default App;
