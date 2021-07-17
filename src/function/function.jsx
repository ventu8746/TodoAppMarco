import React from "react";
/**
 *
 * @param {Array<{text: string, completed: boolean}>} arr
 * @param {string} string
 * @returns {Array<{text: string, completed: boolean}>}s
 */
export function addItem(arr, string) {
	if (string === "") {
		return arr;
	}
	return arr.concat([
		{
			todo: string,
			completed: false,
		},
	]);
}

/**
 *
 * @param {Array<{text: string, completed: boolean}>} arr
 * @param {number} index
 * @returns {Array<{text: string, completed: boolean}>
 */
export function deleteTodo(arr, index) {
	if (index > arr.length || index < 0) {
		throw new Error("the index that you have insert is inexistent");
	}

	if (index === "" || index === undefined) {
		return arr;
	} else {
		return arr.filter((elem) => {
			return elem !== arr[index];
		});
	}
}

/**
 *
 * @param {Array<{text: string, completed: boolean}>} arr
 * @param {number} index
 * @returns {Array<{text: string, completed: boolean}>
 */
export function toggleTodo(arr, index) {
	if (index > arr.length || index < 0) {
		throw new Error("the index that you have insert is inexistent");
	}

	if (index === "" || index === undefined) {
		return arr;
	} else {
		return arr.map((elem, index2) => {
			if (index !== index2) {
				return elem;
			} else {
				return { todo: elem.todo, completed: !elem.completed };
			}
		});
	}
}

/**
 *
 * @param {Array<{text: string, completed: boolean}>} arr
 * @param {number} index
 * @returns {Array<{text: string, completed: boolean}>
 */
export function toggleTodoAll(arr, bool) {
	return arr.map((elem) => {
		return { todo: elem.todo, completed: bool };
	});
}

export const listNumber = "listNumber";

export function serialize(list) {
	localStorage.setItem(listNumber, JSON.stringify(list));
}

export function deserialize() {
	const storage = localStorage.getItem(listNumber);
	return storage !== null ? JSON.parse(storage) : undefined;
}

export function toggleTypeTodos(type, todos, todosActive, todosCompleted) {
	let typeTodos;

	switch (type) {
		case "active":
			typeTodos = todosActive;
			break;
		case "completed":
			typeTodos = todosCompleted;
			break;
		case "all":
			typeTodos = todos;
			break;
		default:
			break;
	}

	return typeTodos;
}
