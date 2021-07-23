import { useState } from "react";
import React from "react";

/**
 *
 * @param {Array<{text: string, completed: boolean}>} arr
 * @param {string} string
 * @returns {Array<{text: string, completed: boolean}>}s
 */
export function addItem(arr, string) {
	const idMax = arr.length === 0 ? 0 : Math.max(...arr.map((todo) => todo.id));

	if (string === "") {
		return arr;
	}
	return arr.concat([
		{
			id: idMax + 1,
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
/* export function deleteTodo(arr, index) {
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
} */

export function deleteTodo(arr, index, id) {
	if (index > arr.length || index < 0) {
		throw new Error("the index that you have insert is inexistent");
	}

	if (index === "" || index === undefined) {
		return arr;
	} else {
		return arr.filter((elem) => {
			return elem.id !== id;
		});
	}
}

/**
 *
 * @param {Array<{text: string, completed: boolean}>} arr
 * @param {number} index
 * @returns {Array<{text: string, completed: boolean}>
 */
/* export function toggleTodo(arr, index) {
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
} */

export function toggleTodo(arr, index, id) {
	if (index > arr.length || index < 0) {
		throw new Error("the index that you have insert is inexistent");
	}

	if (index === "" || index === undefined) {
		return arr;
	} else {
		return arr.map((elem, index2) => {
			if (elem.id !== id) {
				return elem;
			} else {
				return { id: id, todo: elem.todo, completed: !elem.completed };
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
	if (bool) {
		return arr.map((elem) => {
			return { todo: elem.todo, completed: bool };
		});
	} else {
		return arr.map((elem) => {
			return { todo: elem.todo, completed: !bool };
		});
	}
}

export const listNumber = "listNumber";

export function serialize(list) {
	localStorage.setItem(listNumber, JSON.stringify(list));
}

export function deserialize() {
	const storage = localStorage.getItem(listNumber);
	return storage !== null ? JSON.parse(storage) : undefined;
}

export function toggleTypeTodos(filter, todos) {
	switch (filter) {
		case "active":
			return todos.filter((elem) => elem.completed === false);
			break;
		case "completed":
			return todos.filter((elem) => elem.completed === true);
			break;
		case "all":
			return todos.map((elem) => elem);
			break;
		default:
			break;
	}
}

export function modifyTodo(string, arr, id) {
	return arr.filter((elem) => (elem.id === id ? (elem.todo = string) : elem));
}
