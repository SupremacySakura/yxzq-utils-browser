import { checkIfInstanceOf } from "./utils/index.js"
import axios from 'axios'
interface UploadConfig {
    folderName?: string
    fileName?: string
    url?: string
    useDate?: string
    ext?: string
}
const uploadResource = async (file: File | Blob, config: UploadConfig = {}) => {
    if (!file) {
        return
    }
    const {
        folderName = 'default',
        fileName = 'default_name',
        url = 'http://localhost:3100',
        useDate = 'yes',
        ext = 'jpg'
    } = config
    const wholeUrl = url + '/upload'
    const formData = new FormData()
    if (checkIfInstanceOf(file, File) || checkIfInstanceOf(file, Blob)) {
        formData.append('file', file)
    } else {
        throw new Error('The type of the parameter file is incorrect.')
    }
    formData.append('folderName', folderName)
    formData.append('fileName', fileName)
    formData.append('useDate', useDate)
    formData.append('ext', ext)
    const response = await axios.post(wholeUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}
export {
    uploadResource,
}