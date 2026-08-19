'use client';

import * as icons from '@codecademy/gamut-icons';
import { type ComponentType, useId, useState } from 'react';

import { GamutSandbox } from './GamutSandbox';

const variants = ['primary', 'secondary', 'danger', 'interface'] as const;
const sizes = ['small', 'normal', 'large'] as const;
const iconOptions = {
  None: undefined,
  MiniArrowRightIcon: icons.MiniArrowRightIcon,
  MiniAddIcon: icons.MiniAddIcon,
  MiniStarIcon: icons.MiniStarIcon,
  MiniCheckCircleIcon: icons.MiniCheckCircleIcon,
  MiniCalendarIcon: icons.MiniCalendarIcon,
} as const;
type IconOptionName = keyof typeof iconOptions;

export interface ButtonPlaygroundProps {
  button: ComponentType<any>;
  componentName: string;
}

/**
 * The Playground section (ADR 0001 §3): a live, editable example —
 * equivalent to Storybook's Canvas + Controls.
 */
export const ButtonPlayground = ({
  button: Button,
  componentName,
}: ButtonPlaygroundProps) => {
  const formId = useId();
  const [label, setLabel] = useState('Click me');
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary');
  const [size, setSize] = useState<(typeof sizes)[number]>('normal');
  const [disabled, setDisabled] = useState(false);
  const [iconName, setIconName] = useState<IconOptionName>('None');
  const [iconPosition, setIconPosition] = useState<'left' | 'right'>('left');

  const icon = iconOptions[iconName];

  const codeLines = [
    `<${componentName}`,
    `  variant="${variant}"`,
    `  size="${size}"`,
    ...(disabled ? ['  disabled'] : []),
    ...(icon
      ? [`  icon={${iconName}}`, `  iconPosition="${iconPosition}"`]
      : []),
    `>`,
    `  ${label}`,
    `</${componentName}>`,
  ].join('\n');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      <GamutSandbox>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 240,
            minHeight: 120,
            border: '1px dashed #d1d5db',
            borderRadius: 8,
            padding: '1.5rem',
          }}
        >
          <Button
            variant={variant}
            size={size}
            disabled={disabled}
            icon={icon}
            iconPosition={iconPosition}
          >
            {label}
          </Button>
        </div>
      </GamutSandbox>

      <div style={{ flex: 1, minWidth: 240 }}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor={`${formId}-label`}>children</label>
              </td>
              <td>
                <input
                  id={`${formId}-label`}
                  type="text"
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={`${formId}-variant`}>variant</label>
              </td>
              <td>
                <select
                  id={`${formId}-variant`}
                  value={variant}
                  onChange={(event) =>
                    setVariant(event.target.value as (typeof variants)[number])
                  }
                >
                  {variants.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={`${formId}-size`}>size</label>
              </td>
              <td>
                <select
                  id={`${formId}-size`}
                  value={size}
                  onChange={(event) =>
                    setSize(event.target.value as (typeof sizes)[number])
                  }
                >
                  {sizes.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={`${formId}-icon`}>icon</label>
              </td>
              <td>
                <select
                  id={`${formId}-icon`}
                  value={iconName}
                  onChange={(event) =>
                    setIconName(event.target.value as IconOptionName)
                  }
                >
                  {Object.keys(iconOptions).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={`${formId}-iconPosition`}>iconPosition</label>
              </td>
              <td>
                <select
                  id={`${formId}-iconPosition`}
                  value={iconPosition}
                  disabled={!icon}
                  onChange={(event) =>
                    setIconPosition(event.target.value as 'left' | 'right')
                  }
                >
                  <option value="left">left</option>
                  <option value="right">right</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor={`${formId}-disabled`}>disabled</label>
              </td>
              <td>
                <input
                  id={`${formId}-disabled`}
                  type="checkbox"
                  checked={disabled}
                  onChange={(event) => setDisabled(event.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <pre>
          <code>{codeLines}</code>
        </pre>
      </div>
    </div>
  );
};
