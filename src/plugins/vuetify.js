import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      options: {
        themeCache: {
          get: key => localStorage.getItem(key),
          set: (key, value) => localStorage.setItem(key, value)
        }
      },
      light: {
        primary: colors.blue.accent3,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
      },
      dark: {
        primary: colors.orange.accent4,
        secondary: colors.blueGrey.darken3
      }
    }
  }
});
