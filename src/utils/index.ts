import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { CacheOptions } from './type'
/**
 * 检查给定的对象是否是指定构造函数的实例。
 *
 * @param {any} obj - 要检查的对象。可以是任何类型。
 * @param {Function} classFunction - 用来检查对象是否为其构造函数的类或函数。
 * 
 * @returns {boolean} 如果对象是提供的构造函数的实例，则返回true；否则返回false。
 * 
 * @throws {TypeError} 如果classFunction不是一个函数，则返回false而不是抛出错误。
 */
const checkIfInstanceOf = function (obj: any, classFunction: any) {
    if (obj === null || obj === undefined || !(classFunction instanceof Function))
        return false
    return Object(obj) instanceof classFunction
}
/**
 * 创建一个防抖函数，该函数在指定的时间间隔内仅执行一次 `func`。
 *
 * 防抖是一种技术，用于限制某个函数在短时间内频繁调用的情况。即使函数被频繁触发，
 * 它也只会按照最后一次触发后经过指定时间间隔才执行一次。
 *
 * @template T - 泛型参数，表示传入的函数类型，必须是 `Function` 或其子类型。
 *
 * @param {T} func - 需要进行防抖处理的函数。
 * @param {number} wait - 等待的时间间隔（毫秒），在此期间如果没有新的触发，则执行 `func`。
 *
 * @returns {(this: unknown, ...args: any[]) => void} 返回一个新的函数，该函数实现了防抖逻辑。
 *   - `this: unknown` 表示调用时的上下文对象，具体类型取决于实际调用情况。
 *   - `...args: any[]` 表示传递给原始函数的所有参数。
 *
 * @example
 * ```typescript
 * const debouncedFunc = debouncing((message: string) => console.log(message), 1000)
 * debouncedFunc('Hello') // 在1000毫秒后执行
 * debouncedFunc('World') // 如果在1000毫秒内再次调用，则重置计时器
 * ```
 */
const debouncing = <T extends Function>(func: T, wait: number): ((...args: any[]) => void) => {
    let inDebouncing: ReturnType<typeof setTimeout> | undefined
    return function (this: unknown, ...args: any[]): void {
        clearTimeout(inDebouncing)
        inDebouncing = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
/**
 * 创建一个节流函数，该函数确保在给定的时间间隔内最多执行一次 `func`。
 *
 * 节流是一种技术，用于限制某个函数在一定时间内的调用频率。即使函数被频繁调用，
 * 它也只会按照指定的时间间隔执行一次。
 *
 * @template T - 泛型参数，表示传入的函数类型，必须是 `Function` 或其子类型。
 *
 * @param {T} func - 需要进行节流处理的函数。
 * @param {number} limit - 时间间隔（毫秒），在此期间内最多执行一次 `func`。
 *
 * @returns {(this: unknown, ...args: any[]) => void} 返回一个新的函数，该函数实现了节流逻辑。
 *   - `this: unknown` 表示调用时的上下文对象，具体类型取决于实际调用情况。
 *   - `...args: any[]` 表示传递给原始函数的所有参数。
 *
 * @example
 * ```typescript
 * const throttledFunc = throtting((message: string) => console.log(message), 1000)
 * throttledFunc('Hello') // 立即执行
 * throttledFunc('World') // 如果在1000毫秒内调用，则不会立即执行
 * ```
 */
const throtting = <T extends Function>(func: T, limit: number): ((...args: any[]) => void) => {
    let lastCallTime = 0
    return function (this: unknown, ...args): void {
        const currentTimestamp = Date.now()
        const remainingTimeUntileNextCall = limit - (currentTimestamp - lastCallTime)
        const shouldCallNow = remainingTimeUntileNextCall <= 0 || remainingTimeUntileNextCall > limit
        if (shouldCallNow) {
            func.apply(this, args)
            lastCallTime = currentTimestamp
        }
    }
}
/**
 * 为 Axios 实例添加缓存功能，支持请求缓存、定时清理缓存、最大缓存条数限制和一键清除缓存。
 *
 * @param {AxiosInstance} instance - 需要添加缓存功能的 Axios 实例。
 * @param {CacheOptions} [options={}] - 缓存配置选项。
 * @param {number} [options.cacheTTL=60000] - 缓存有效时间（毫秒），默认 60 秒。
 * @param {(config: AxiosRequestConfig) => string} [options.getCacheKey] - 自定义缓存键生成函数。
 * @param {boolean} [options.useCache=true] - 全局是否启用缓存（可被请求级配置覆盖），默认 true。
 * @param {boolean} [options.enableCacheCleanup=false] - 是否启用定时清理过期缓存，默认 false。
 * @param {number} [options.cleanupInterval=300000] - 定时清理间隔（毫秒），默认 5 分钟。
 * @param {number} [options.maxCacheSize] - 最大缓存条数（超过时删除最旧条目），默认无限制。
 * @returns {AxiosInstance} - 返回添加了缓存功能的 Axios 实例。
 *
 * @example
 * const api = axios.create({ baseURL: 'http://example.com' })
 * addCacheToAxios(api, {
 *   cacheTTL: 30000,       // 缓存 30 秒
 *   enableCacheCleanup: true,  // 启用定时清理
 *   cleanupInterval: 60000,    // 每分钟清理一次
 *   maxCacheSize: 100          // 最多保留 100 条缓存
 * })
 *
 * api.get('/data', { useCache: true })
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error(error))
 *
 * // 一键清除缓存
 * api.clearCache()
 */
const addCacheToAxios = (instance: AxiosInstance, options: CacheOptions = {}): AxiosInstance => {
    const {
        cacheTTL = 60 * 1000,
        getCacheKey,
        useCache: globalUseCache = true,
        enableCacheCleanup = false,
        cleanupInterval = 5 * 60 * 1000,
        maxCacheSize,
    } = options

    const cacheMap = new Map<string, { data: any, timestamp: number }>()

    // 默认缓存键生成逻辑（保持不变）
    const defaultGetCacheKey = (config: AxiosRequestConfig): string => {
        const url = config.url || ''
        const params = config.params ? JSON.stringify(config.params) : ''
        const data = config.data ? JSON.stringify(config.data) : ''
        return `${url}?${params}&${data}`
    }

    // 清理过期缓存函数（保持不变）
    const cleanupExpiredCache = () => {
        const now = Date.now()
        cacheMap.forEach(({ timestamp }, key) => {
            if (now - timestamp > cacheTTL) {
                cacheMap.delete(key)
            }
        })
    }

    // 启用定时清理（保持不变）
    let cleanupTimer: number | null = null
    if (enableCacheCleanup) {
        cleanupTimer = window.setInterval(cleanupExpiredCache, cleanupInterval)
    }

    // 一键清除缓存函数（保持不变）
    const clearCache = () => {
        cacheMap.clear()
        if (cleanupTimer !== null) {
            window.clearInterval(cleanupTimer)
            cleanupTimer = null
        }
        if (enableCacheCleanup) {
            cleanupTimer = window.setInterval(cleanupExpiredCache, cleanupInterval)
        }
    }

    // 请求拦截器（保持不变）
    instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const useCache = typeof config.useCache !== 'undefined' ? config.useCache : globalUseCache
        if (useCache) {
            const key = (getCacheKey || defaultGetCacheKey)(config)
            const cached = cacheMap.get(key);
            if (cached && Date.now() - cached.timestamp < cacheTTL) {
                throw {
                    __isCache: true,
                    data: cached.data,
                    config,
                    toJSON: () => ({ message: 'Request canceled due to existing cache' })
                }
            }
        }
        return config
    })

    // 响应拦截器（保持不变）
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            const useCache = typeof response.config.useCache !== 'undefined' ? response.config.useCache : globalUseCache
            if (useCache) {
                const key = (getCacheKey || defaultGetCacheKey)(response.config)
                cacheMap.set(key, { data: response.data, timestamp: Date.now() })
                if (maxCacheSize && cacheMap.size > maxCacheSize) {
                    const oldestKey = cacheMap.keys().next().value
                    if (typeof oldestKey === 'string') {
                        cacheMap.delete(oldestKey)
                    }
                }
            }
            return response
        },
        (error) => {
            if (error.__isCache) {
                return Promise.resolve({ data: error.data, status: 200, statusText: 'OK', headers: {}, config: error.config, request: {} })
            }
            return Promise.reject(error)
        }
    );

    // 挂载 clearCache 方法
    instance.clearCache = clearCache

    return instance
}

export {
    checkIfInstanceOf,
    debouncing,
    throtting,
    addCacheToAxios,
}