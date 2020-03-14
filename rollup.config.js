import babel from 'rollup-plugin-babel';
module.exports = {
    input: 'src/js/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [ babel() ]
};