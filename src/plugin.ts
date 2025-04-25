import type { Plugin } from 'payload'
import { CollectionConfig, Field, GlobalConfig } from 'payload'

const addCustomLabelToFields = <T extends GlobalConfig | CollectionConfig>(collection: T) => {
  const traverseFields = (fields: Field[]) => {
    fields.forEach(field => {
      if (!['array', 'blocks', 'collapsible', 'group', 'point', 'row', 'ui'].includes(field.type)) {
        field.admin = field.admin ?? {}
        field.admin.components = {
          ...(field.admin?.components ?? {}),
          //@ts-ignore
          // Label: props =>
          //   LabelPopover({
          //     ...props,
          //     showLabelPopover: field.custom?.showLabelPopover,
          //     labelPopover: field.custom?.labelPopover,
          //   }),
          Label: {path: '/src/LabelPopover#LabelPopover'}
        }
      }

      if ('fields' in field) {
        traverseFields(field.fields)
      }

      if ('blocks' in field) {
        field.blocks.forEach(block => traverseFields(block.fields))
      }

      if ('tabs' in field) {
        field.tabs.forEach(tab => traverseFields(tab.fields))
      }
    })
  }

  traverseFields(collection.fields)
}

export const labelPopoverPlugin =
  (pluginOptions: {}): Plugin =>
  incomingConfig => {
    let config = { ...incomingConfig }

    config.admin = {
      ...(config.admin || {}),
      components: {
        ...(config.admin?.components || {}),
      },
    }

    config.collections = [...(config.collections || [])]

    if (config.collections !== undefined) {
      config.collections.forEach(collection => {
        addCustomLabelToFields(collection)
      })
    }

    if (config.globals !== undefined) {
      config.globals.forEach(global => {
        addCustomLabelToFields(global)
      })
    }

    const incomingOnInit = config.onInit

    config.onInit = async payload => {
      if (incomingOnInit) await incomingOnInit(payload)
      
    }

    return config
  }
