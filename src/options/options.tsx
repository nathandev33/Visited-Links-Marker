import * as React from 'react'
import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import AppBar from '@mui/material/AppBar'

import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import WhereOptions from '../components/WhereOptions'
import { getStoredOptions, setStoredOptions } from '../utils/storage'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Ideas or bugs?  '}
      <Link color="inherit" href="mailto:nateadamec@gmail.com">
        nateadamec@gmail.com
      </Link>{' '}
      <Typography paragraph></Typography>
      {'Like the extension? '}
      <Link
        color="inherit"
        href="https://www.buymeacoffee.com/nathanadamec"
        target="_blank"
      >
        BuyMeACoffee
      </Link>{' '}
      <Typography paragraph></Typography>
      <Typography>{new Date().getFullYear()}</Typography>
    </Typography>
  )
}

const theme = createTheme()
import './options.css'

const App: React.FC<{}> = () => {
  const [whereOption, setWhereOption] = useState<string>()
  const [exceptSites, setExceptSites] = useState<string[]>()
  const [onlySites, setOnlySites] = useState<string[]>()

  useEffect(() => {
    getStoredOptions().then((data) => {
      setWhereOption(data.where_options)
      setExceptSites(data.except_sites)
      setOnlySites(data.only_sites)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BorderColorIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Visited Links Marker
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              URL rules guide
            </Typography>

            <ul>
              <li>Use a new line for each rule and do not add spaces.</li>
              <li>
                If the URL of the visited page contains the specified substring,
                the rule will apply.
              </li>
            </ul>
            <Typography variant="h5">Examples:</Typography>
            <ul>
              <li>
                <em>https://www.google.com</em>
                <ul>
                  <li>
                    The rule will apply to all URLs that contain{' '}
                    <span>
                      {' '}
                      <strong>https://www.google.com</strong>
                    </span>{' '}
                    substring - for example:
                    <ul>
                      <li>
                        <span>
                          <strong>https://www.google.com</strong>
                        </span>
                        /search?q=hello
                      </li>
                      <li>
                        <strong>https://www.google.com</strong>/account/about/
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <em>reddit</em>
                <ul>
                  <li>
                    The rule will apply to all URLs that contain{' '}
                    <span>
                      {' '}
                      <strong>reddit</strong>
                    </span>{' '}
                    substring - for example:
                    <ul>
                      <li>
                        https://www.
                        <span>
                          <strong>reddit</strong>
                        </span>
                        .com/
                      </li>
                      <li>
                        https://www.google.com/search?q=
                        <span>
                          <strong>reddit</strong>
                        </span>
                      </li>
                      <li>
                        https://www.XXX.
                        <span>
                          <strong>reddit</strong>
                        </span>
                        .com
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ mt: '2rem' }}
            >
              Set URL rules
            </Typography>
            <Grid container justifyContent="center">
              <Grid item>
                <WhereOptions
                  whereOption={whereOption}
                  setWhereOption={setWhereOption}
                  exceptSites={exceptSites}
                  setExceptSites={setExceptSites}
                  onlySites={onlySites}
                  setOnlySites={setOnlySites}
                ></WhereOptions>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Visited Links Marker
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
