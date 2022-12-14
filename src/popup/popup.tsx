import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import ColorPicker from '../components/ColorPicker'
import WhereOptions from '../components/WhereOptions'
import { getStoredOptions } from '../utils/storage'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider } from '@mui/material/styles'
import { Typography, Grid, AppBar, CssBaseline } from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import SettingsIcon from '@mui/icons-material/Settings'

const App: React.FC<{}> = () => {
  const [whereOption, setWhereOption] = useState<string>()
  const [linkColor, setLinkColor] = useState<string>()
  const [exceptSites, setExceptSites] = useState<string[]>()
  const [onlySites, setOnlySites] = useState<string[]>()

  useEffect(() => {
    getStoredOptions().then((data) => {
      setWhereOption(data.where_options)
      setLinkColor(data.link_color)
      setExceptSites(data.except_sites)
      setOnlySites(data.only_sites)
    })
  }, [])

  function changeColor(color: string) {
    // send message to content-script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { colorChanged: true, color })
    })
  }

  return (
    <div>
      <CssBaseline />

      <AppBar position="relative" sx={{ borderRadius: '15px' }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography variant="h6">
              Pick a color
              <ColorLensIcon sx={{ verticalAlign: 'middle', ml: '7px' }} />
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
      <ColorPicker
        linkColor={linkColor}
        changeColor={changeColor}
      ></ColorPicker>

      <AppBar position="relative" sx={{ borderRadius: '15px' }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography variant="h6">
              Running conditions
              <SettingsIcon sx={{ verticalAlign: 'middle', ml: '7px' }} />
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
      <WhereOptions
        whereOption={whereOption}
        setWhereOption={setWhereOption}
        exceptSites={exceptSites}
        setExceptSites={setExceptSites}
        onlySites={onlySites}
        setOnlySites={setOnlySites}
      ></WhereOptions>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)

root.render(<App />)
