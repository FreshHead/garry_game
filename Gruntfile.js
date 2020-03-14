module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-rollup");
    grunt.initConfig({
        "rollup": {
            "options": {
                "input": "src/js/main.js",
                "format": "iife",
                "plugins": [
                    require("rollup-plugin-babel")({
                        "presets": [["es2015", { "modules": false }]],
                        "plugins": ["external-helpers"]
                    })
                ]
            },
            "dist": {
                "files": {
                    "./dist/bundle.js": ["./src/main.js"]
                }
            }
        }
    });
    grunt.registerTask('default', ['rollup']);
}