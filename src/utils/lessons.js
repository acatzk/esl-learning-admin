let splitUrlFilename = (item) => {
    let newItem = item.url_files.split('/lessons-files%2F').pop().split('#')[0].split('?')[0]
    return newItem.length >= 30 ? newItem.slice(0, 30) + "..." : newItem
}

let convertByteSize = (item) => {
    let bytes = item.size
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes == 0) return '0 Byte'
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

let fileExtentionIcon = (item) => {
    switch (item.type) {
        case 'text/plain':
            return 'mdi-file'
            break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'mdi-file-word-box'
            break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'mdi-file-powerpoint-box'
            break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'mdi-file-excel-box'
            break;
        default:
            return 'mdi-file-pdf-box'
            break
    }
}

export {
    splitUrlFilename,
    convertByteSize,
    fileExtentionIcon
}