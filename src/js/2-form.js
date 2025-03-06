// selecting the elements
const refs = {
  form: document.querySelector('.feedback-form'),
  labels: document.querySelectorAll('.feedback-form label'),
};
const LOCAL_STORAGE_KEY = 'feedback-form-state';
// styling the form

refs.labels.forEach(el => el.classList.add('input-label'));

document
  .querySelector('.feedback-form label input')
  .classList.add('input-field');

document
  .querySelector('.feedback-form label textarea')
  .classList.add('textarea');
document.querySelector('button').classList.add('submit-btn');

// receiving the data from the local storage

let formData = {
  email: '',
  message: '',
};

const fillFieldsOnLoad = function (feedbackForm) {
  try {
    const formDataFromLS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (formDataFromLS === null) {
      return;
    }
    formData.email = formDataFromLS.email || '';
    formData.message = formDataFromLS.message || '';

    const formDataKeys = Object.keys(formDataFromLS);

    formDataKeys.forEach(key => {
      feedbackForm.elements[key].value = formDataFromLS[key];
    });
  } catch (err) {
    console.log(err);
  }
};

fillFieldsOnLoad(refs.form);

// save to local storage

const inputEventHandler = function ({ target: formField }) {
  try {
    const fieldName = formField.name;
    const fieldValue = formField.value.trim();

    if (fieldValue) {
      formData[fieldName] = fieldValue;
    } else {
      delete formData[fieldName];
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  } catch (err) {
    console.log(err);
  }
};
// submit
const formSubmit = function (event) {
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  event.preventDefault();

  localStorage.removeItem(LOCAL_STORAGE_KEY);
  event.currentTarget.reset();
  console.log(formData);
};
refs.form.addEventListener('input', inputEventHandler);
refs.form.addEventListener('submit', formSubmit);
