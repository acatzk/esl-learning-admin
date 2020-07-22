let required = (propertyType) => {
    return v => v && v.length > 0 || `${propertyType} is required.`
}

let emailRules = (propertyType) => {
    return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
}

let minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters.`
}

let maxLength = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters.`
}

export {
    required,
    emailRules,
    minLength,
    maxLength
}