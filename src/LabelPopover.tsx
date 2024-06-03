import React from 'react'
import { useTranslation } from 'react-i18next'
import Popup from 'reactjs-popup'

import { getTranslation } from 'payload/utilities'

type Props = {
  htmlFor?: string
  label?: Record<string, string> | false | string
  required?: boolean
  labelPopover: React.FC | string
  showLabelPopover: boolean
}

export const LabelPopover: React.FC<Props> = props => {
  const { label, required = false, labelPopover, showLabelPopover } = props
  const { t, i18n } = useTranslation()

  if (label) {
    return (
      <label
        className="field-label"
        style={{ display: 'flex', width: 'fit-content', maxWidth: '100%' }}
      >
        {getTranslation(label, i18n)}
        {required && <span className="required">*</span>}
        {showLabelPopover && (
          <Popup
            position={['top center', 'bottom center', 'right center', 'left center']}
            arrowStyle={{ color: 'var(--color-base-800)' }}
            mouseEnterDelay={50}
            mouseLeaveDelay={200}
            on={['hover', 'click']}
            trigger={
              <button
                type="button"
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
            }
          >
            <div
              style={{
                backgroundColor: 'var(--color-base-800)',
                color: 'white',
                borderRadius: '4px',
                padding: '6px 10px',
                maxWidth: '20rem',
              }}
            >
              {labelPopover}
            </div>
          </Popup>
        )}
      </label>
    )
  }

  return null
}
