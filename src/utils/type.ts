import { AxiosRequestConfig } from 'axios'
// 声明扩展Axios类型
declare module 'axios' {
    interface AxiosRequestConfig {
        /**
         * 是否启用缓存功能（可覆盖全局设置）
         * @default true
         */
        useCache?: boolean
    }
    // 扩展 AxiosInstance 类型，添加 clearCache 方法
    interface AxiosInstance {
        clearCache: () => void
    }
}

// 缓存选项接口
interface CacheOptions {
    cacheTTL?: number
    getCacheKey?: (config: AxiosRequestConfig) => string
    useCache?: boolean
    enableCacheCleanup?: boolean
    cleanupInterval?: number
    maxCacheSize?: number
}
export {
    CacheOptions
}