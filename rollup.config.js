import typescript from 'rollup-plugin-typescript2'

export default [
    // ESM 输出配置
    {
        input: 'src/index.ts',  // 输入文件
        output: {
            file: 'dist-esm/index.js',  // 输出文件
            format: 'esm',  // 输出格式为 ESM
        },
        plugins: [typescript()],
    },

    // CJS 输出配置
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist-cjs',  // 输出到 dist-cjs 目录
            format: 'cjs',  // 输出格式为 CJS
            entryFileNames: '[name].cjs',  // 使用 .cjs 后缀
        },
        plugins: [typescript()],
    },
]
