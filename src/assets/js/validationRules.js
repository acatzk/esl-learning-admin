export const required = (propertyType) => {
    return v => v && v.length > 0 || `${propertyType} is required.`
}

export const emailRules = (propertyType) => {
    return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
}

export const minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters.`
}

