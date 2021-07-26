import React, { useState, useEffect, useRef } from "react";

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
	modifyTodo,
} from "./function/function";

const idCount = 0;

function App() {
	const [inputText, setInput] = useState("");
	const [todosType, setTypeToggle] = useState("all");
	const [todos, setTodos] = useState(() => deserialize() || []);
	const [bool, setBool] = useState(false);
	const [editing, toggleEditing] = useState(false);
	const [editTodo, setEditTodo] = useState("");
	const [idTodo, selectIdTodo] = useState(null);

	console.log(todos.length);
	useEffect(() => {
		serialize(todos);
	}, [todos]);

	function handleSubmit(event) {
		event.preventDefault();
		setTodos(addItem(todos, inputText));
		setInput("");
		idCount++;
	}

	function handleKeyUp(e) {
		if (e.key === "Enter" || e.key === 13) {
			setTodos(modifyTodo(editTodo, todos, idTodo));
			selectIdTodo(null);
		} else if (e.key === "Escape" || e.key === 27) {
			setTodos(todos);
			selectIdTodo(null);
		}
	}

	const focusInput = () => {
		inputSel.current.focus();
	};

	const filterActive = todos.filter((elem) => !elem.completed).length;
	const todosSwitch = toggleTypeTodos(todosType, todos);

	const inputSel = useRef(null);

	const active = todos.filter((elem) => elem.completed === false).length === 0;

	const completed =
		todos.filter((elem) => elem.completed === true).length === 0;

	return (
		<div>
			<section className="todoapp">
				<header className="header">
					<h1>TodoAppMarco</h1>

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
					<input
						id="toggle-all"
						className="toggle-all"
						type="checkbox"
						checked={active}
						onClick={() => {
							setTodos(toggleTodoAll(todos, active, idCount));
						}}
					/>
					<label
						style={
							todosSwitch.length === 0 ? { display: "none" } : { display: "" }
						}
						checked={active ? true : false}
						htmlFor="toggle-all"
					>
						Mark all as complete
					</label>
					<ul className="todo-list">
						{/* <!-- These are here just to show the structure of the list items -->
					<!-- List items should get the className `editing` when editing and `completed` when marked as completed --> */}
						{todosSwitch.map((todo, index) => (
							<li
								className={`${todo.completed ? "completed" : ""} ${
									idTodo === todo.id ? "editing " : ""
								}`}
								/* className={idTodo === todo.id ? "editing " : ""} */
							>
								<div className="view">
									<input
										onChange={() => {
											setTodos(toggleTodo(todos, index, todo.id));
										}}
										className="toggle"
										type="checkbox"
										checked={todo.completed}
									/>
									<label
										onDoubleClick={() => {
											selectIdTodo(todo.id);
											/* toggleEditing(!editing); */
											setEditTodo(todo.todo);
											requestAnimationFrame(focusInput);
										}}
									>
										{todo.todo}
									</label>
									<button
										onClick={() => setTodos(deleteTodo(todos, index, todo.id))}
										className="destroy"
									></button>
								</div>
								<input
									onBlur={() => {
										setTodos(modifyTodo(editTodo, todos, idTodo));
										selectIdTodo(null);
									}}
									className="edit"
									onKeyUp={handleKeyUp}
									onInput={(e) => {
										setEditTodo(() => e.target.value);
									}}
									value={editTodo}
									ref={(element) => {
										if (idTodo === todo.id) {
											inputSel.current = element;
										}
									}}
								/>
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
								onClick={(e) => {
									setTypeToggle("all");
								}}
								className={todosType === "all" ? "selected" : ""}
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
								className={todosType === "active" ? "selected" : ""}
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
								className={todosType === "completed" ? "selected" : ""}
							>
								Completed
							</a>
						</li>
					</ul>
					{/* <!-- Hidden if no completed items are left ↓ --> */}
					<button
						onClick={() => {
							setTodos(completed);
						}}
						className="clear-completed "
						style={completed ? { display: "none" } : { display: "inline" }}
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
