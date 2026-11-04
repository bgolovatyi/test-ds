import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Button } from './Button'
import type { ButtonSize, ButtonVariant } from './Button'

const icon = (path: ReactNode) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.33333"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
)

// Paths exported from the Figma "Icons" page; stroke is currentColor so they follow the label.
const PlaceholderIcon = icon(
  <path
    d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
    strokeDasharray="2 2"
  />,
)
const PlusIcon = icon(<path d="M8.00001 3.33334V12.6667M3.33334 8H12.6667" />)
const ChevronRightIcon = icon(<path d="M6 4L10 8L6 12" />)

const iconOptions = {
  none: undefined,
  placeholder: PlaceholderIcon,
  plus: PlusIcon,
  'chevron-right': ChevronRightIcon,
}
const iconControl = {
  options: Object.keys(iconOptions),
  mapping: iconOptions,
  control: { type: 'select' as const },
}

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Triggers actions. Hugs its content, never a fixed width. Hierarchy via `variant`, scale via `size`; hover, pressed, focused and disabled come from the element state. [Figma](https://www.figma.com/design/AWui8CP8WkztWRBJQbFbFh?node-id=1-4289)',
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'sm',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    iconLeft: iconControl,
    iconRight: iconControl,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Danger: Story = {
  args: { variant: 'danger' },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
      <Button {...args} size="lg" />
    </div>
  ),
}

export const IconLeft: Story = {
  args: { iconLeft: PlusIcon },
}

export const IconRight: Story = {
  args: { iconRight: ChevronRightIcon },
}

export const BothIcons: Story = {
  args: { iconLeft: PlaceholderIcon, iconRight: PlaceholderIcon },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button')
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const Clickable: Story = {
  tags: ['!autodocs'],
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button')
    await expect(button).toHaveAttribute('type', 'button')
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const KeyboardFocus: Story = {
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button')
    await userEvent.tab()
    await expect(button).toHaveFocus()
    await expect(getComputedStyle(button).boxShadow).toContain('0px 0px 0px 4px')
  },
}

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']
const sizes: ButtonSize[] = ['sm', 'md', 'lg']
const states = [
  { name: 'Default' },
  { name: 'Hover', pseudoClass: 'pseudo-hover-all' },
  { name: 'Pressed', pseudoClass: 'pseudo-active-all' },
  { name: 'Focused', pseudoClass: 'pseudo-focus-visible-all' },
  { name: 'Disabled', disabled: true },
]
const headerStyle = {
  padding: 'var(--space-8) var(--space-12)',
  color: 'var(--text-muted)',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'left',
} as const

/** Every Type × Size × State combination, in the same order as the Figma component set. */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-32)' }}>
      {sizes.map((size) => (
        <table key={size} style={{ borderCollapse: 'separate', borderSpacing: 'var(--space-8)' }}>
          <thead>
            <tr>
              <th style={headerStyle} scope="col">
                {size.toUpperCase()}
              </th>
              {variants.map((variant) => (
                <th key={variant} style={headerStyle} scope="col">
                  {variant}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {states.map(({ name, pseudoClass, disabled }) => (
              <tr key={name}>
                <th style={headerStyle} scope="row">
                  {name}
                </th>
                {variants.map((variant) => (
                  <td key={variant} className={pseudoClass} style={{ padding: 'var(--space-8)' }}>
                    <Button variant={variant} size={size} disabled={disabled}>
                      Button
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  ),
}
