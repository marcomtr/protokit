const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {

    eleventyConfig.addWatchTarget('./src/styles/tailwind.config.js')
    eleventyConfig.addWatchTarget('./src/styles/tailwind.css')

    eleventyConfig.addPassthroughCopy({ './_tmp/style.css': './style.css' })

    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
      if (
        process.env.ELEVENTY_PRODUCTION &&
        outputPath &&
        outputPath.endsWith('.html')
      ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        })
        return minified
      }

      return content
    });



    return {
      dir: {
        input: "src",
        output: "docs",
      },
    };

  };