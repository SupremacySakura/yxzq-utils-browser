import typescript from 'rollup-plugin-typescript2'
export default [
    // ESM 输出配置
    {
        input: 'src/index.ts',  // 输入文件
        output: {
            file: 'dist/dist-esm/index.js',  // 输出文件
            format: 'esm',  // 输出格式为 ESM
        },
        plugins: [
            typescript({
                useTsconfigDeclarationDir: true
            })
        ],
    },

    // CJS 输出配置
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist/dist-cjs',  // 输出到 dist-cjs 目录
            format: 'cjs',  // 输出格式为 CJS
            entryFileNames: '[name].cjs',  // 使用 .cjs 后缀
        },
        plugins: [
            typescript({
                useTsconfigDeclarationDir: true
            })
        ],
    },
    // UMD 输出配置
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/dist-umd/index.js',
            format: 'umd',
            name: 'yxzqUtils',
        },
        plugins: [
            typescript({
                useTsconfigDeclarationDir: true
            })
        ],
    },
]
