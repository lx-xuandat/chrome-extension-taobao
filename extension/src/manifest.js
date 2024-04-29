import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json' assert { type: 'json' }

const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  background: {  },
  content_scripts: [
    {
      matches: [
        // 'https://*/*',
        "https://*.1688.com/*",
        "https://*.taobao.com/*",
        "https://*.tmall.com/*",
        "https://*.tmall.hk/*",
      ],
      js: [
        'src/index.jsx',
      ],
      type: 'module',
      run_at: "document_start",
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['storage', 'webRequest', 'declarativeNetRequest', 'declarativeNetRequestFeedback'],
  host_permissions: [
    "https://*.taobao.com/*",
    "https://*.1688.com/*",
    "https://*.tmall.com/*",
    "https://*.tmall.hk/*",
  ],
  chrome_url_overrides: {
    newtab: 'index.html',
  },
})
