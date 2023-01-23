
export default  function serialize(form) {
  // Setup our serialized data
  const serialized = [];
  // Loop through each field in the form
  for (let i = 0; i < form.elements.length; i += 1) {
    const field = form.elements[i];
    // eslint-disable-next-line no-continue
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      for (let n = 0; n < field.options.length; n += 1) {
        // eslint-disable-next-line no-continue
        if (!field.options[n].selected) continue;
        serialized.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.options[n].value)}`);
      }
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push(`${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`);
    }
  }
  return serialized.join('&');
}
