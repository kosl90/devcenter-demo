var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var isProd = config.isProd

exports.assetsPath = function (_path) {
  var assetsSubDirectory = isProd
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProd,
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('postcss'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

/**
 * htmlPluginConfig(entryname)
 * htmlPluginConfig(entryName, name)
 * htmlPluginConfig(entryName, chunks)
 * htmlPluginConfig(entryName, name, chunks)
 */
exports.htmlPluginConfig = function htmlPluginConfig(entryName, name, chunks) {
  var filename = entryName + '.html';

  if (typeof name === 'string') {
    filename = name;
  } else {
    // not string, means this is chunks.
    chunks = name;
  }

  // chunks is optional too
  chunks = chunks || [];

  var option = {
    chunks: [entryName].concat(chunks),
    filename: filename,
    template: path.join(config.viewDirectory, filename),
    inject: true,
  }

  // https://github.com/kangax/html-minifier#options-quick-reference
  if (isProd) {
    option = Object.assign(option, {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  }

  return option;
}
