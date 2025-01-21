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