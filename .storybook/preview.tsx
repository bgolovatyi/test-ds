import type { Preview } from '@storybook/react-vite'
// Pinned to Inter 3 metrics to match Figma; Inter 4 renders labels 1-2px narrower.
import '@fontsource/inter/600.css'
import '../src/tokens/tokens.css'
import './preview.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Light/Dark theme from the design tokens',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  decorators: [
    (Story, { globals }) => {
      document.documentElement.setAttribute('data-theme', globals.theme)
      return <Story />
    },
  ],

  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;