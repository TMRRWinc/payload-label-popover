import { GlobalConfig } from 'payload/types'

export const Example: GlobalConfig = {
  slug: 'exampleGlobal',
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Hello World',
      custom: {
        labelPopover: 'The quick brown fox jumps over the lazy dog.',
        showLabelPopover: true,
      },
    },
  ],
}
