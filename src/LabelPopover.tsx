import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowContainer, Popover, BoundaryViolations } from 'react-tiny-popover'

import { getTranslation } from 'payload/utilities'

type Props = {
  htmlFor?: string
  label?: Record<string, string> | false | string
  required?: boolean
  labelPopover: React.FC | string
  showLabelPopover: boolean
}

export const LabelPopover: React.FC<Props> = props => {
  const { label, required = false, labelPopover, showLabelPopover, htmlFor, children } = props
  const { t, i18n } = useTranslation()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const ref = useRef<HTMLLabelElement>(null)
  if (label) {
    return (
      <label
        className="field-label"
        style={{ display: 'flex', width: 'fit-content', maxWidth: '100%' }}
        ref={ref}
        htmlFor={htmlFor}
      >
        {getTranslation(label, i18n)}
        {required && <span className="required">*</span>}
        {showLabelPopover && (
          <Popover
            parentElement={ref.current || undefined} // This is not the correct usage of parentElement. But it is fixing the issue of the popover not positioning correctly for fields rendered off page
            containerStyle={{ zIndex: '9999' }}
            isOpen={isPopoverOpen}
            positions={['top', 'right', 'bottom', 'left']}
            padding={10}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'var(--color-base-800)'}
                arrowSize={10}
                className="popover-arrow-container"
                arrowClassName="popover-arrow"
              >
                <div
                  style={{
                    backgroundColor: 'var(--color-base-800)',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '6px 10px',
                    maxWidth: '20rem',
                  }}
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                  {labelPopover}
                </div>
              </ArrowContainer>
            )}
          >
            <button
              type="button"
              onMouseLeave={() => setIsPopoverOpen(!isPopoverOpen)}
              onMouseEnter={() => setIsPopoverOpen(!isPopoverOpen)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              aria-label={t('More info')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-help"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </button>
          </Popover>
        )}
      </label>
    )
  }

  return null
}
