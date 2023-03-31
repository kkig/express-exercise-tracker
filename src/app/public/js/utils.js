/* Add exercise to user's log */
const exerciseForm = document.getElementById('exercise-form');

exerciseForm.addEventListener('submit', () => {
  const userId = document.getElementById('uid').value;
  exerciseForm.action = `/api/users/${userId}/exercises`;

  exerciseForm.submit();
});

/* Form to delete user */
const deleteForm = document.getElementById('delete-form');

deleteForm.addEventListener('submit', () => {
  const userId = document.getElementById('uid-to-delete').value;
  deleteForm.action = `/api/users/${userId}/delete`;

  deleteForm.submit();
});

/* Btn to list all usrs */
const userListBtn = document.getElementById('user-list-btn');

userListBtn.addEventListener('click', () => {
  const url =
    window.location.protocol + '//' + window.location.host + '/api/users';

  window.location.href = url;
});
