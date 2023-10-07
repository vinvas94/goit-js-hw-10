import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const formElement = evt.target.elements;
  const email = formElement.email.value;
  const message = formElement.message.value;
  const data = {
    email,
    message,
  };
  if (email === '' || message === '') {
    return alert('Please fill in all the fields!');
  }
  formData = {};
  evt.currentTarget.reset();
  console.log(data);
  localStorage.removeItem(STORAGE_KEY);
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    formData = JSON.parse(savedData);
    for (let key in formData) {
      refs.form[key].value = formData[key];
    }
  }
}
loadFormData();
