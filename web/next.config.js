const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
    '@dfds-ui/react-components',
    '@dfds-ui/colors',
    '@dfds-ui/icons',
    '@dfds-ui/forms',
    '@dfds-ui/modal'
])

module.exports = withPlugins([[withTranspileModules]].filter(Boolean))
