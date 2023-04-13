
export default  function validateForm(formValue, setErrors, formFilled){
  if (!formFilled) return;
  const errors = {};

  if (formValue.name && !/^[A-Za-z ]{1,32}$/i.test(formValue.name)) {
    errors.name = 'Please use only letters';
  }

  if (formValue.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValue.email)) {
    errors.email = 'Invalid email address';
  }

  if (formValue.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(formValue.phone)) {
    errors.phone = 'Invalid phone format';
  }

  const formValueKeys = Object.keys(formValue);

  formValueKeys.forEach(key => {
    if (key !== 'callBack' && key !== 'text' && key !== 'phone' && !formValue[key]) {
      errors[key] = 'Required';
    } 
  })

  setErrors(errors);
}
