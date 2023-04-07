import * as React from 'react';
import {
  defaultDarkModeOverride,
  ThemeProvider,
  Card,
  Text,
  ToggleButton,
  ToggleButtonGroup,
  useColorMode
} from '@aws-amplify/ui-react';

export const DarkMode = () => {
  const [colorMode, setColorMode] = React.useState('system');
  const theme = {
    name: 'my-theme',
    overrides: [
      {
        type: 'Button',
        styles: {
          backgroundColor: {
            light: '#f1f1f1',
            dark: '#292929',
          },
          color: {
            light: '#000',
            dark: '#fff',
          },
        },
      },
      {
        type: 'Card',
        styles: {
          backgroundColor: {
            light: '#fff',
            dark: '#1c1c1c',
          },
          color: {
            light: '#000',
            dark: '#fff',
          },
        },
      },
      {
        type: 'Text',
        styles: {
          color: {
            light: '#000',
            dark: '#fff',
          },
        },
      },
      defaultDarkModeOverride,
    ],
  };

  const style = {
    backgroundColor: colorMode === 'dark' ? '#1c1c1c' : '#fff',
    color: colorMode === 'dark' ? '#fff' : '#000',
  };

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <div style={style}>
        <Card>
          <ToggleButtonGroup
            value={colorMode}
            isExclusive
            onChange={(value) => setColorMode(value)}
          >
            <ToggleButton value="light">Light</ToggleButton>
            <ToggleButton value="dark">Dark</ToggleButton>
            <ToggleButton value="system">System</ToggleButton>
          </ToggleButtonGroup>
          <Text>Current color mode: {colorMode}</Text>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default DarkMode;