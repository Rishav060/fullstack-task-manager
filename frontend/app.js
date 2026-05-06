let input = document.querySelector("#taskInput");
let btn = document.querySelector("#addBtn");
let ul = document.querySelector("#taskList");

// UI elements added in the new design
const taskMeta = document.getElementById("taskMeta");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");

const BASE_URL = "http://localhost:3000/tasks";

// Update the task counter and empty state visibility
function updateUI(count) {
    if (count === 0) {
        taskMeta.style.display = "none";
        emptyState.style.display = "block";
    } else {
        taskMeta.style.display = "block";
        emptyState.style.display = "none";
        taskCount.textContent = count === 1 ? "1 task" : `${count} tasks`;
    }
}

// LOAD TASKS
async function loadTasks() {
    try {
        let res = await fetch(BASE_URL);
        let data = await res.json();

        ul.innerHTML = "";

        data.forEach(task => {
            let li = document.createElement("li");

            let span = document.createElement("span");
            span.innerText = task.text;

            let delBtn = document.createElement("button");
            delBtn.innerText = "Delete";

            delBtn.addEventListener("click", async () => {
                await deleteTask(task.id);
            });

            li.appendChild(span);
            li.appendChild(delBtn);
            ul.appendChild(li);
        });

        updateUI(data.length);

    } catch (err) {
        console.log("Load error:", err);
        updateUI(0);
    }
}

// ADD TASK
btn.addEventListener("click", async () => {
    let text = input.value.trim();
    if (!text) {
        // Shake the input if empty
        input.classList.add("shake");
        setTimeout(() => input.classList.remove("shake"), 400);
        return;
    }

    try {
        await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        input.value = "";
        loadTasks();

    } catch (err) {
        console.log("Add error:", err);
    }
});

// Allow pressing Enter to add a task
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

// DELETE TASK
async function deleteTask(id) {
    try {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });

        loadTasks();

    } catch (err) {
        console.log("Delete error:", err);
    }
}

// INITIAL LOAD
loadTasks();
