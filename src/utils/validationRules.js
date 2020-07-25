const required = (propertyType) => {
    return v => v && v.length > 0 || `${propertyType} is required.`
}

const emailRules = (propertyType) => {
    return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
}

const minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters.`
}

const maxLength = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters.`
}

export {
    required,
    emailRules,
    minLength,
    maxLength
}