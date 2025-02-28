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
        return false;
    return Object(obj) instanceof classFunction;
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
 * const debouncedFunc = debouncing((message: string) => console.log(message), 1000);
 * debouncedFunc('Hello'); // 在1000毫秒后执行
 * debouncedFunc('World'); // 如果在1000毫秒内再次调用，则重置计时器
 * ```
 */
const debouncing = <T extends Function>(func: T, wait: number): ((...args: any[]) => void) => {
    let inDebouncing: ReturnType<typeof setTimeout> | undefined;
    return function (this: unknown, ...args: any[]): void {
        clearTimeout(inDebouncing);
        inDebouncing = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
};
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
 * const throttledFunc = throtting((message: string) => console.log(message), 1000);
 * throttledFunc('Hello'); // 立即执行
 * throttledFunc('World'); // 如果在1000毫秒内调用，则不会立即执行
 * ```
 */
const throtting = <T extends Function>(func: T, limit: number): ((...args: any[]) => void) => {
    let lastCallTime = 0;
    return function (this: unknown, ...args): void {
        const currentTimestamp = Date.now()
        const remainingTimeUntileNextCall = limit - (currentTimestamp - lastCallTime)
        const shouldCallNow = remainingTimeUntileNextCall <= 0 || remainingTimeUntileNextCall > limit
        if (shouldCallNow) {
            func.apply(this, args);
            lastCallTime = currentTimestamp
        }
    }
}
export {
    checkIfInstanceOf,
    debouncing,
    throtting
}