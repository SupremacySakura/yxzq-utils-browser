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
interface GetFilePathConfig {
    url?: string
    extNameConfig?: 'all' | 'no' | Array<string>
}
interface GetFilePathResult {
    message: string
    files: Array<string>
    code: number
    err?: any
}
export {
    UploadConfig,
    UploadResult,
    GetFilePathConfig,
    GetFilePathResult
}