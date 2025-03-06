import {
    AxiosRequestConfig,
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosError,
} from 'axios'
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
    interface InternalAxiosRequestConfig<D = any> {
        /**
         * 请求级重试配置
         */
        retryOptions?: RetryOptions;
        /**
         * 内部重试计数器
         * @internal
         */
        __retryCount?: number;
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
interface RetryOptions {
    maxRetries?: number;
    retryCondition?: (error: AxiosError) => boolean | Promise<boolean>;
    getDelay?: (retryCount: number) => number;
}

export {
    CacheOptions,
    RetryOptions,
}