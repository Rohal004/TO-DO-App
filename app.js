document.addEventListener("DOMContentLoaded", () => {
    // Load tasks from localStorage
    const storedTask = JSON.parse(localStorage.getItem('task'));


    if(storedTask){
        storedTask.forEach((task) => task.push(task));
        updateTaskList();
        updateSt();
    }
});



let task = []; 

const saveTask = () => {
    localStorage.setItem('task', JSON.stringify(task));
};



const addTask = ()=> {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();


    if(text){
        task.push({text:text, completed: false});
        taskInput.value = " ";
        updateTaskList();
        updateSt();
        saveTask();
    }
    
};

const toggleTaskComplete = (index)=> {
    task[index].completed = !task[index].completed ;
    updateTaskList();
    updateSt();
    saveTask();
};

const deleteTask = (index) => {
    task.splice(index, 1);
    updateTaskList();
    updateSt(); 
    saveTask();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = task[index].text;

    task.splice(index, 1);
    updateTaskList();
    updateSt();
    saveTask();
};


const updateSt = ()=> {
    const completedTasks = task.filter((task)=>task.completed).length;
    const totalTasks = task.length;
    const progress = (completedTasks/totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;

    if(task.length && completedTasks === totalTasks){
        fireConfetti();
    }
};

const updateTaskList = ()=> {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    task.forEach((task, index) =>{
        const listItem = document.createElement("li")

        listItem.innerHTML = `
        <div class="taskItem">
                <div class="task ${task.completed ? "completed": ""}" >
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked": ""} />
                    <p> ${task.text} </p>
                </div>
                <div class="icons">
                    
                    <img src="" class="edit-icon"   >
                        <i class="bi bi-pen" style="font-size: 1.5rem; color: blue;" onClick="editTask( ${index} )"></i>
                    </img>
                    <img src="" class="delete-icon" >
                        <i class="bi bi-trash" style="font-size: 1.5rem; color: red;" onClick="deleteTask( ${index} )"></i>
                    </img>
                </div> 
        </div>
        
        `;
        listItem.addEventListener('change', ()=> toggleTaskComplete(index));
        listItem.querySelector('.delete-icon').addEventListener('click', () => deleteTask(index));
    taskList.append(listItem);
    } );
};

document.getElementById("task").addEventListener('click', function(e){
    e.preventDefault();


    addTask();
});




const  fireConfetti = ()=> {
    const duration = 10 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
};