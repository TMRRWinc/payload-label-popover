import { FieldLabel } from "@payloadcms/ui";
import { FieldServerComponent, TextField } from "payload";
import { Popover } from "react-tiny-popover";
import LabelPopoverClient from "./LabelPopoverClient.js";

export const LabelPopover: FieldServerComponent = ({field}) => {
  if (!('label' in field)) {
    return null
  }

  let name = ""
  if ('name' in field) {
    name = field.name
  }

  let required: boolean = false
  if ('required' in field) {
    required = Boolean(field.required)
  }
  let localized: boolean = false
  if ('localized' in field) {
    localized = Boolean(field.localized)
  }

  const {custom, admin, label} = field 
  const {labelPopover, showLabelPopover} = custom as {labelPopover: React.FC | string, showLabelPopover: boolean}

  return (
    <label>
      {showLabelPopover ? (
        // @ts-ignore
        <LabelPopoverClient 
          htmlFor={name} 
          labelPopover={labelPopover as string} 
          showLabelPopover={showLabelPopover} 
          required={required}
          label={label as string}
          localized={localized}
          />
      ) : <FieldLabel htmlFor={name} label={label as string} required={required} localized={localized} />}
    </label>
  )
}
  