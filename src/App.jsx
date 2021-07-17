import React, { useState, useEffect } from "react";

// import React, { useEffect } from "react";
import { addItem } from "./function/function";
import { toggleTodo } from "./function/function";
import { deleteTodo } from "./function/function";
import { toggleTodoAll } from "./function/function";
import { serialize } from "./function/function";
import { deserialize } from "./function/function";
import { toggleTypeTodos } from "./function/function";
import { listNumber } from "./function/function";

let toogleConst = "all";

function App() {
	const [inputText, setInput] = useState("");

	const [todosActive, setTodosActive] = useState([]);
	const [todosCompleted, setTodosCompleted] = useState([]);
	const [todos, setTodos] = useState(
		deserialize() === undefined ? [] : deserialize
	);
	const [checkComp, setCheckComp] = useState(true);

	useEffect(() => {
		serialize(todos);
	}, [todos, todosCompleted, todosActive]);

	return (
		<div>
			<section className="todoapp">
				<header className="header">
					<h1>TodoAppMarco</h1>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setTodos(addItem(todos, inputText));
							setInput("");
						}}
					>
						<input
							className="new-todo"
							onInput={(evt) => setInput(evt.target.value)}
							placeholder="Cosa hai bisogno di Fare?"
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
						{toggleTypeTodos(
							toogleConst,
							todos,
							todosActive,
							todosCompleted
						).map((todo, index) => (
							<li className={todo.completed ? "completed" : ""}>
								<div className="view">
									<input
										onChange={(e) => {
											e.target.checked = todo.completed;
											setTodos(
												toggleTodo(
													toggleTypeTodos(
														toogleConst,
														todos,
														todosActive,
														todosCompleted
													),
													index
												)
											);
										}}
										className="toggle"
										type="checkbox"
										checked={todo.completed}
									/>
									<label>{todo.todo}</label>
									<button
										onClick={() =>
											setTodos(
												deleteTodo(
													toggleTypeTodos(
														toogleConst,
														todos,
														todosActive,
														todosCompleted
													),
													index
												)
											)
										}
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
						<strong>0</strong> item left
					</span>
					{/* <!-- Remove this if you don't implement routing --> */}
					<ul className="filters">
						<li>
							<a
								onClick={() => {
									toogleConst = "all";
									setTodos(todos.map((elem) => elem));
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
									toogleConst = "active";
									setTodosActive(
										todos.filter((elem) => elem.completed === false)
									);
								}}
								href="#/active"
							>
								Active
							</a>
						</li>
						<li>
							<a
								onClick={() => {
									toogleConst = "completed";
									return setTodosCompleted(
										todos.filter((elem) => elem.completed === true)
									);
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
					Created by <a href="http://todomvc.com">you</a>
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
