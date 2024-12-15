import { checkIfInstanceOf } from "./utils/index.js"
import axios from 'axios'
interface UploadConfig {
    folderName?: string
    fileName?: string
    url?: string
    useDate?: 'yes' | 'no'
    ext?: string
}
interface UploadResult {
    message: string
    error?: any
    filePath: string | null
    code: number
}
const uploadResource = async (file: File | Blob, config: UploadConfig = {}):Promise<UploadResult> => {
    if (!file) {
        return {
            message: 'file is required',
            error: 'file is required',
            filePath: null,
            code: 400
        }
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
        return {
            message: 'file type is not supported',
            error: 'file type is not supported',
            filePath: null,
            code: 400
        }
    }
    formData.append('folderName', folderName)
    formData.append('fileName', fileName)
    formData.append('useDate', useDate)
    formData.append('ext', ext)
    try{
        const response = await axios.post(wholeUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }catch(err){
        return {
            message: 'An error occurred during the request',
            error: err,
            filePath: null,
            code: 400
        }
    }
   
}
export {
    uploadResource,
}