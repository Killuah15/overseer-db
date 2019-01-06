//See if password has a length between [8,16] chars
const isValidPassword = password => password.length >= 8 && password.length <= 16

//See if Email has the @ Symbol inside
const isValidEmail = email => email.includes('@')

const validateArg = arg => arg ? arg : null 

export { isValidPassword, isValidEmail, validateArg }