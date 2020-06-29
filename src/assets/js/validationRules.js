export const required = (propertyType) => {
    return v => v && v.length > 0 || `${propertyType} is required.`
}

