'use strict';

//selecting elements
const input = document.getElementById('form-input');

const form = document.querySelector('.list-form');
const shoppingList = document.querySelector('.shopping-list');
const container = document.querySelector('.list-container');
const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-btn');
const message = document.querySelector('.message');

//console.log(form);
//console.log(shoppingList);
//console.log(container);
//console.log(submitBtn);
//console.log(clearBtn);
//console.log(message);

let editFlag = false;
let editElement;
let editID = "";

// submit form
form.addEventListener("submit", addItem);

// clear list
clearBtn.addEventListener("click", clearListItems);

// display items
window.addEventListener("DOMContentLoaded", setupItems);

// add item
function addItem(e) {
	e.preventDefault(); // clear default behavior
	const value = input.value;
	const id = new Date().getTime().toString();

	if (value !== "" && !editFlag) {
		// create a new element
		const element = document.createElement("article");
		let attr = document.createAttribute("data-id");
		attr.value = id;

		element.setAttributeNode(attr);
		element.classList.add("list-item"); // add new list item
		element.innerHTML = `
			<p class="title">${value}</p>
			<div class="btn-container">
				<!-- edit btn -->
				<button type="button" class="edit-btn">
					<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
				</button>
				<!-- delete btn -->
				<button type="button" class="delete-btn">
					<i class="fa fa-trash" aria-hidden="true"></i>
				</button>
			</div>
		`;

		const editBtn = element.querySelector(".edit-btn");
		editBtn.addEventListener("click", editItem); // add editItem function

		const deleteBtn = element.querySelector(".delete-btn");
		deleteBtn.addEventListener("click", deleteItem); // add deleteItem function

		shoppingList.appendChild(element);
		displayMessage("item added to list", "success");

		container.classList.add("show-container") ;

		setLocalStorage(id, value);

		setBackDefault();
	} else if (value !== "" && editFlag) {
		editElement.innerHTML = value;
		displayMessage("value changed", "success");

		// edit local storage
		editLocalStorage(editID, value);
		setBackDefault();
	} else {
		displayMessage("please enter value", "danger");
	}
}

// display message
function displayMessage(text, textType){
	message.textContent = text;
	message.classList.add(`message-${textType}`);

	// remove message
	setTimeout(function(){
		message.textContent = "";
		message.classList.remove(`message-${textType}`);
	}, 1000);
}

// clear shopping list
function clearListItems(){
	const items = document.querySelectorAll('.list-item'); // select all list items
	
	if (items.length > 0) {
		items.forEach(function(item) {
			shoppingList.removeChild(item);
		});
	}

	container.classList.remove('show-container');
	displayMessage("list is empty", "danger");
	setBackDefault();

	localStorage.removeItem("list"); // delete items from local storage
}

// delete item
function deleteItem(e) {
	const element = e.currentTarget.parentElement.parentElement; 
	const id = element.dataset.id;

	shoppingList.removeChild(element);

	if (shoppingList.children.length === 0) {
		container.classList.remove("show-container");
	}

	displayMessage("item removed", "danger");

	setBackDefault();

	deleteLocalStorage(id); // delete item from local storage
}

// edit item
function editItem(e) {
	const element = e.currentTarget.parentElement.parentElement; 
	
  	editElement = e.currentTarget.parentElement.previousElementSibling;

	input.value  =editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;

	submitBtn.textContent = "edit"; // change submit button text

}

// set back default
function setBackDefault() {
	input.value = "";
	editFlag = false;
	editID = "";
	submitBtn.textContent = "submit";
}

/////////////////////////////
/////////// local storage

// add to local storage
function setLocalStorage(id, value) {
	const grocery = { id, value };
	let items = getLocalStorage();
	items.push(grocery);
	localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
	return localStorage.getItem("list")
		? JSON.parse(localStorage.getItem("list")) // parse JSON 
		: [];
}

function deleteLocalStorage(id) {
	let items = getLocalStorage();

	items = items.filter(function (item) {
		if (item.id !== id) {
		return item;
		}
	});

	localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
	let items = getLocalStorage();

	items = items.map(function (item) {
		if (item.id === id) {
		item.value = value;
		}
		return item;
	});
	localStorage.setItem("list", JSON.stringify(items));
}

/////////////////////////////
/////////// get items from local storage

function setupItems() {
	let items = getLocalStorage();

	if (items.length > 0) {
		items.forEach(function (item) {
		createListItem(item.id, item.value);
		});
		container.classList.add("show-container");
	}
}

function createListItem(id, value) {
	const element = document.createElement("article");
	let attr = document.createAttribute("data-id");
	attr.value = id;
	element.setAttributeNode(attr);
	element.classList.add("list-item");
	element.innerHTML = `
		<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
				<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
				<i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
        `;

	// add event listeners to buttons;
	const editBtn = element.querySelector(".edit-btn");
	editBtn.addEventListener("click", editItem);

	const deleteBtn = element.querySelector(".delete-btn");
	deleteBtn.addEventListener("click", deleteItem);

	// append child
 	shoppingList.appendChild(element);
}