// Import bulma base Sass for all components. Individual components should still import required Bulma Sass modules.
import 'bulma/sass/base/_all.sass';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}