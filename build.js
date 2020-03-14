require("rollup").rollup({
    input: "./src/js/main.js",
    plugins: [
        require("rollup-plugin-babel")()
    ]
}).then(bundle => {
    bundle.generate({
        // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
        format: 'iife'
    }).then((result) => {
        const fs = require('fs');
        fs.writeFileSync("./dist/bundle.js", result.output[0].code);
        const gentlyCopy = require('gently-copy');
        gentlyCopy(["./src/img", "./src/style.css"], "./dist", {overwrite: true});
    });
}).then(null, err => console.error(err));