import { buildConfig } from 'payload'
import { slateEditor } from '@payloadcms/richtext-slate'
import Examples from './collections/Examples.js'
import Users from './collections/Users.js'
import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
//@ts-ignore
// import { labelPopoverPlugin } from '../../src/index'
import { labelPopoverPlugin } from "@tmrrw-labs/payload-plugin-label-popover"
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { testEmailAdapter } from './helpers/testEmailAdapter.js'
import { seed } from './seed.js'
import { devUser } from './helpers/credentials.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

export default buildConfig({
  admin: {
    autoLogin: devUser,
    // importMap: {
    //   baseDir: path.resolve(dirname),
    // },
  },
  collections: [Examples, Users],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: slateEditor({}),
  email: testEmailAdapter,
  onInit: async (payload) => {
    await seed(payload)
  },
  secret: process.env.PAYLOAD_SECRET || 'test-secret-key',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [labelPopoverPlugin({})],
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  }
})
