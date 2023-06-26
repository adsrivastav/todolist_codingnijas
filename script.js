document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');
    const totalTasks = document.getElementById('totalTasks');
    const filterButtons = document.querySelectorAll('.filterButton');
  
    addButton.addEventListener('click', addTask);
  
    todoList.addEventListener('change', function(event) {
      if (event.target.type === 'checkbox') {
        const listItem = event.target.parentNode;
        const span = listItem.querySelector('span');
        if (event.target.checked) {
          listItem.classList.add('checked');
          span.classList.add('completed');
        } else {
          listItem.classList.remove('checked');
          span.classList.remove('completed');
        }
        updateTotalTasks();
      }
    });
  
    todoList.addEventListener('click', function(event) {
      if (event.target.classList.contains('deleteButton')) {
        const listItem = event.target.parentNode;
        listItem.remove();
        updateTotalTasks();
      }
    });
  
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const filter = this.dataset.filter;
        filterItems(filter);
      });
    });
  
    function addTask() {
      const task = todoInput.value.trim();
      if (task !== '') {
        const listItem = createListItem(task);
        todoList.appendChild(listItem);
        todoInput.value = '';
        updateTotalTasks();
      }
    }
  
    function createListItem(task) {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      const span = document.createElement('span');
      const deleteButton = document.createElement('button');
  
      checkbox.type = 'checkbox';
      span.innerText = task;
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.className = 'deleteButton';
  
      listItem.appendChild(checkbox);
      listItem.appendChild(span);
      listItem.appendChild(deleteButton);
  
      return listItem;
    }
  
    function updateTotalTasks() {
      const taskCount = todoList.childElementCount;
      totalTasks.innerText = taskCount === 1 ? '1 task' : `${taskCount} tasks`;
    }
  
    function filterItems(filter) {
      const items = todoList.children;
      Array.from(items).forEach(function(item) {
        item.style.display = 'flex';
        if (filter === 'active' && item.classList.contains('checked')) {
          item.style.display = 'none';
        } else if (filter === 'completed' && !item.classList.contains('checked')) {
          item.style.display = 'none';
        }
      });
    }
  });
  