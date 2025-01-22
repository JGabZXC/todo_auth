'use strict';

const listEl = document.querySelector('.new-list');
const listForm = document.querySelector('.new-list-form');
const listFormClose = document.querySelector('.new-list-form-close');
const listInp = document.querySelector('.new-list-inp');

listEl.addEventListener('click', function() {
  listEl.classList.add('hidden');
  listForm.classList.remove('hidden');
  listInp.focus();
})

listFormClose.addEventListener('click', function() {
  listEl.classList.remove('hidden');
  listForm.classList.add('hidden');
  listInp.value = '';
})

const taskEl = document.querySelector('.new-task');
const taskForm = document.querySelector('.new-task-form');
const taskFormClose = document.querySelector('.new-task-form-close');
const taskInp = document.querySelector('.new-task-inp');

taskEl.addEventListener('click', function() {
  taskEl.classList.add('hidden');
  taskForm.classList.remove('hidden');
  taskInp.focus();
})

taskFormClose.addEventListener('click', function() {
  taskEl.classList.remove('hidden');
  taskForm.classList.add('hidden');
  taskInp.value = '';
})