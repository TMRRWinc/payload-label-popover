import { CollectionConfig } from 'payload'

// Example Collection - For reference only, this must be added to payload.config.ts to be used.

const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Hello World',
      localized: true,
      required: true,
      custom: {
        labelPopover: 'The quick brown fox jumps over the lazy dog.',
        showLabelPopover: true,
      },
    },
  ],
}

export default Examples
