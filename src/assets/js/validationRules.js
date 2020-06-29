export const required = (propertyType) => {
    return v => v && v.length > 0 || `${propertyType} is required.`
}

export const emailRules = (propertyType) => {
    return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
}

