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
        require('gently-copy')(["./src/img", "./src/style.css"], "./dist", {overwrite: true});
        const fs = require('fs');
        fs.writeFileSync("./dist/bundle.js", result.output[0].code);
        });
}).then(null, err => console.error(err));