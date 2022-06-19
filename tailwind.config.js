module.exports = {
  content: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true
    }
  }
  // plugins: [require('tw-elements/dist/plugin')]
  // corePlugins: {
  //   preflight: false
  // }
  // important: '#root'
  // content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
};
