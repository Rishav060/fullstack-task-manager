let input = document.querySelector("input");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");

const BASE_URL = "http://localhost:3000/tasks";

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

    } catch (err) {
        console.log("Load error:", err);
    }
}

// ADD TASK
btn.addEventListener("click", async () => {
    let text = input.value.trim();
    if (!text) return;

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