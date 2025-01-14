// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
