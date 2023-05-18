import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js' // this line is a workaround for this issue: https://github.com/intlify/bundle-tools/issues/23
        // it's fixed now by the VueI18nPlugin
      }
    },
    plugins: [
      vue(),
      VueI18nPlugin({
        include: resolve(__dirname, './src/renderer/src/locales/**'),
      }),
      Components({
        resolvers: [
          PrimeVueResolver(),
          IconsResolver({
            prefix: false,
            alias: {

            },
          }),
        ],
      }),
      Icons({
        compiler: 'vue3',
      }),
      AutoImport({
        // dirs: ['./src/renderer/src/composables', './src/renderer/src/locales', './src/renderer/src/routers', './src/renderer/src/stores'],
        imports: [
          'vue',
          'vue-router',
        ],
        eslintrc: {
          enabled: true,
        },
      }),
    ]
  }
})
