// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1PxDHHemwCt2sNCv_j81ZmdJWRIQ7D1g",
    authDomain: "todo-app-45705.firebaseapp.com",
    databaseURL: "https://todo-app-45705-default-rtdb.firebaseio.com",
    projectId: "todo-app-45705",
    storageBucket: "todo-app-45705.firebasestorage.app",
    messagingSenderId: "620434066144",
    appId: "1:620434066144:web:b486e20bcd51a0ad8a1e85"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM Elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

const userId = "user123"; // Change this to a dynamic user ID in real apps.

// Load tasks
firebase.database().ref(`tasks/${userId}`).on("value", snapshot => {
    todoList.innerHTML = ""; // Clear the list
    const tasks = snapshot.val();
    if (tasks) {
        Object.entries(tasks).forEach(([key, taskText]) => addTaskToUI(taskText, key));
    }
});

// Add Task
addBtn.onclick = () => {
    console.print("being clikced")
    const taskText = todoInput.value.trim();
    if (taskText) {
        const newTaskRef = firebase.database().ref(`tasks/${userId}`).push();
        newTaskRef.set(taskText);
        todoInput.value = "";
    }
};

// Add Task to UI
const addTaskToUI = (taskText, key) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        firebase.database().ref(`tasks/${userId}/${key}`).remove();
        taskDiv.remove();
    };

    taskDiv.appendChild(deleteBtn);
    todoList.appendChild(taskDiv);
};
