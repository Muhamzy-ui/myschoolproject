/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: MAHMUD BASHIR OLASUNKANMI
 * Matric No: 2025/C/CYB/1339 | Degree: B.Sc. Cybersecurity
 * File: js/planner.js - Interactive Academic Task Planner System
 */

(function() {
  'use strict';

  // Storage Key
  const STORAGE_KEY = 'miva_academic_tasks_mahmud';

  // Initial Sample Tasks (Preloaded for Demonstration)
  const DEFAULT_TASKS = [
    {
      id: 'task-1',
      title: 'Submit COS 106 Practical Term Project (Website & PDF Report)',
      course: 'COS 106',
      dueDate: '2026-11-15',
      priority: 'high',
      completed: true,
      createdAt: Date.now() - 86400000
    },
    {
      id: 'task-2',
      title: 'Analyze Wireshark Network Packet Traces for CYB 101 Lab',
      course: 'CYB 101',
      dueDate: '2026-11-18',
      priority: 'high',
      completed: false,
      createdAt: Date.now() - 43200000
    },
    {
      id: 'task-3',
      title: 'Solve MTH 101 Quadratic Equations & Polynomials Exercises',
      course: 'MTH 101',
      dueDate: '2026-11-20',
      priority: 'medium',
      completed: false,
      createdAt: Date.now() - 21600000
    },
    {
      id: 'task-4',
      title: 'Read GST 101 Technical Communication & Essay Writing Guide',
      course: 'GST 101',
      dueDate: '2026-11-22',
      priority: 'low',
      completed: false,
      createdAt: Date.now()
    }
  ];

  // State
  let tasks = [];
  let currentFilter = 'all'; // 'all', 'pending', 'completed'

  // DOM Elements
  let taskForm;
  let taskTitleInput;
  let taskCourseSelect;
  let taskDueDateInput;
  let taskPrioritySelect;
  let taskListContainer;
  let totalTasksEl;
  let completedTasksEl;
  let pendingTasksEl;
  let progressFillEl;
  let progressPercentEl;
  let filterButtons;
  let resetTasksBtn;
  let clearCompletedBtn;

  document.addEventListener('DOMContentLoaded', initPlanner);

  function initPlanner() {
    // Cache DOM Elements
    taskForm = document.getElementById('taskForm');
    taskTitleInput = document.getElementById('taskTitle');
    taskCourseSelect = document.getElementById('taskCourse');
    taskDueDateInput = document.getElementById('taskDueDate');
    taskPrioritySelect = document.getElementById('taskPriority');
    taskListContainer = document.getElementById('taskList');
    totalTasksEl = document.getElementById('totalTasksCount');
    completedTasksEl = document.getElementById('completedTasksCount');
    pendingTasksEl = document.getElementById('pendingTasksCount');
    progressFillEl = document.getElementById('progressFill');
    progressPercentEl = document.getElementById('progressPercent');
    filterButtons = document.querySelectorAll('.planner-filter-btn');
    resetTasksBtn = document.getElementById('resetTasksBtn');
    clearCompletedBtn = document.getElementById('clearCompletedBtn');

    if (!taskListContainer) return; // Exit if not on planner page

    // Load Tasks from LocalStorage or initialize with defaults
    loadTasks();

    // Event Listeners
    if (taskForm) {
      taskForm.addEventListener('submit', handleAddTask);
    }

    if (filterButtons) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentFilter = btn.dataset.filter;
          renderTasks();
        });
      });
    }

    if (resetTasksBtn) {
      resetTasksBtn.addEventListener('click', resetToDefaultTasks);
    }

    if (clearCompletedBtn) {
      clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    }

    // Set default min date for due date input to today
    if (taskDueDateInput) {
      const today = new Date().toISOString().split('T')[0];
      taskDueDateInput.value = today;
    }

    renderTasks();
  }

  /**
   * Load Tasks from localStorage
   */
  function loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        tasks = JSON.parse(stored);
      } else {
        tasks = [...DEFAULT_TASKS];
        saveTasks();
      }
    } catch (e) {
      console.error('Error loading tasks from localStorage', e);
      tasks = [...DEFAULT_TASKS];
    }
  }

  /**
   * Save Tasks to localStorage
   */
  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks to localStorage', e);
    }
  }

  /**
   * Handle Adding a New Task
   */
  function handleAddTask(e) {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const course = taskCourseSelect.value;
    const dueDate = taskDueDateInput.value;
    const priority = taskPrioritySelect.value;

    // Form Validation
    let isValid = true;

    if (!title) {
      showInputError(taskTitleInput, 'Please enter a task title');
      isValid = false;
    } else {
      clearInputError(taskTitleInput);
    }

    if (!course) {
      showInputError(taskCourseSelect, 'Please select a course code');
      isValid = false;
    } else {
      clearInputError(taskCourseSelect);
    }

    if (!dueDate) {
      showInputError(taskDueDateInput, 'Please select a valid due date');
      isValid = false;
    } else {
      clearInputError(taskDueDateInput);
    }

    if (!isValid) return;

    // Create New Task Object
    const newTask = {
      id: 'task-' + Date.now(),
      title: title,
      course: course,
      dueDate: dueDate,
      priority: priority,
      completed: false,
      createdAt: Date.now()
    };

    // Add to beginning of array
    tasks.unshift(newTask);
    saveTasks();
    renderTasks();

    // Reset Form
    taskForm.reset();
    if (taskDueDateInput) {
      const today = new Date().toISOString().split('T')[0];
      taskDueDateInput.value = today;
    }

    if (window.showToast) {
      window.showToast('Academic task added successfully!', 'success');
    }
  }

  /**
   * Toggle Task Completion Status
   */
  function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();

      if (window.showToast) {
        const msg = task.completed ? 'Task marked as completed! 🎉' : 'Task reopened';
        window.showToast(msg, 'info');
      }
    }
  }

  /**
   * Delete Task
   */
  function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this academic task?')) {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      renderTasks();

      if (window.showToast) {
        window.showToast('Task removed from academic planner', 'danger');
      }
    }
  }

  /**
   * Clear all completed tasks
   */
  function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      alert('There are no completed tasks to clear.');
      return;
    }

    if (confirm(`Remove all ${completedCount} completed task(s)?`)) {
      tasks = tasks.filter(t => !t.completed);
      saveTasks();
      renderTasks();
      if (window.showToast) {
        window.showToast(`Cleared ${completedCount} completed tasks`, 'info');
      }
    }
  }

  /**
   * Reset to initial sample tasks
   */
  function resetToDefaultTasks() {
    if (confirm('Reset planner with default MIVA Open University academic tasks?')) {
      tasks = [...DEFAULT_TASKS];
      saveTasks();
      renderTasks();
      if (window.showToast) {
        window.showToast('Planner restored to sample tasks', 'success');
      }
    }
  }

  /**
   * Render Tasks to DOM and update statistics
   */
  function renderTasks() {
    if (!taskListContainer) return;

    // Filter tasks
    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
      filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
      filteredTasks = tasks.filter(t => t.completed);
    }

    // Update Metrics
    updateMetrics();

    // Render List
    taskListContainer.innerHTML = '';

    if (filteredTasks.length === 0) {
      taskListContainer.innerHTML = `
        <div class="empty-task-state">
          <div class="empty-task-icon">📋</div>
          <h4>No tasks found</h4>
          <p>You have no ${currentFilter === 'all' ? '' : currentFilter} tasks scheduled. Add a new task using the form above!</p>
        </div>
      `;
      return;
    }

    filteredTasks.forEach(task => {
      const taskEl = document.createElement('div');
      taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
      taskEl.id = task.id;

      // Priority Label Class
      const priorityClass = `task-priority-${task.priority.toLowerCase()}`;
      const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

      // Format Date
      const dateFormatted = formatDate(task.dueDate);

      taskEl.innerHTML = `
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task as completed">
          <div class="task-details">
            <span class="task-title">${escapeHTML(task.title)}</span>
            <div class="task-meta">
              <span class="task-course-badge">${escapeHTML(task.course)}</span>
              <span>📅 Due: ${dateFormatted}</span>
              <span class="task-priority-badge ${priorityClass}">● ${priorityLabel} Priority</span>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button type="button" class="task-delete-btn" title="Delete Task" aria-label="Delete Task">
            🗑️
          </button>
        </div>
      `;

      // Event listener for checkbox
      const checkbox = taskEl.querySelector('.task-checkbox');
      checkbox.addEventListener('change', () => toggleTaskComplete(task.id));

      // Event listener for delete button
      const deleteBtn = taskEl.querySelector('.task-delete-btn');
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      taskListContainer.appendChild(taskEl);
    });
  }

  /**
   * Update Progress and Metric Counters
   */
  function updateMetrics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (totalTasksEl) totalTasksEl.textContent = total;
    if (completedTasksEl) completedTasksEl.textContent = completed;
    if (pendingTasksEl) pendingTasksEl.textContent = pending;
    if (progressPercentEl) progressPercentEl.textContent = `${percentage}%`;
    if (progressFillEl) progressFillEl.style.width = `${percentage}%`;
  }

  // Helpers
  function showInputError(input, msg) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.textContent = msg;
      feedback.style.display = 'block';
    }
  }

  function clearInputError(input) {
    input.classList.remove('is-invalid');
    const feedback = input.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const parts = dateStr.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

})();
