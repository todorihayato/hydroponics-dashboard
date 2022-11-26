const inputValidator = (input) => {
  if (input !== '') {
    return true
  }
}

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the name of the component! ex) Header',
    validate: inputValidator,
  },
  {
    type: 'input',
    name: 'path',
    message: "Enter a path under 'src/component'! ex) atoms",
    validate: inputValidator,
  },
  {
    type: 'toggle',
    name: 'withProps',
    message: 'Do you want to create Props at the same time?',
    disabled: 'yes',
    enabled: 'no',
    initial: true,
  },
]
