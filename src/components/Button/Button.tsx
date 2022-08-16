import React from 'react'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import { styled } from '@mui/system'
import Stack from '@mui/material/Stack'
import TextArea from '../TextArea'

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
}

const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
interface AppProps {
  textAreaContent: string
}

const App: React.FC<AppProps> = ({ textAreaContent }) => {
  const savePreferences = () => {
    const arr = textAreaContent.split('\n')
    chrome.storage.sync.set({ excludedWebsites: arr })
  }
  return (
    <Stack spacing={2} direction="row">
      <CustomButton
        onClick={() => {
          savePreferences
        }}
      >
        Save
      </CustomButton>
      {/* <CustomButton disabled>Disabled</CustomButton> */}
    </Stack>
  )
}

export default App