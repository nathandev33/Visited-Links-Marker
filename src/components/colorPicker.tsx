import React, { useState, useEffect } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import './styles.css'
import { getStoredOptions } from '../utils/storage'
import {
  TextField,
  Box,
  styled,
  Button,
  Grid,
  Typography,
} from '@mui/material/'

interface AppProps {
  changeColor: (color: string) => void
  linkColor: string
}
const ColorPicker: React.FC<AppProps> = ({ linkColor, changeColor }) => {
  // const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 0 })
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 })

  const InputNumberStyles = {
    width: '70px',
    padding: '3px',
    size: 'small',
  }

  useEffect(() => {
    const objectFromRgba = () => {
      getStoredOptions().then((data) => {
        let rgbaObject = { r: 0, g: 0, b: 0, a: 0 }
        let colorX = data.link_color
        const rgbaArray = colorX
          .slice(colorX.indexOf('(') + 1, colorX.indexOf(')'))
          .split(',')
        console.log(rgbaArray)
        const rgbaKeysArray = ['r', 'g', 'b', 'a']
        rgbaKeysArray.forEach((key, index) => {
          rgbaObject[key] = parseFloat(rgbaArray[index])
        })
        setColor(rgbaObject)
      })
      return
    }
    objectFromRgba()
  }, [])

  const inputProps = {
    max: 255,
    min: 0,
    backgroundColor: 'red',
  }
  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <RgbaColorPicker
                className="ColorPicker"
                color={color}
                onChange={setColor}
              />
            </Grid>
            <Grid item>
              <div className="buttons">
                <Button
                  variant="outlined"
                  onClick={() =>
                    changeColor(
                      `rgba(${color.r},${color.g},${color.b},${color.a})`
                    )
                  }
                >
                  Save
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {
                m: 0,
                mt: 1.2,
                mb: 0.7,
                width: '100px',
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                sx={InputNumberStyles}
                inputProps={{ inputProps }}
                size="small"
                fullWidth
                label="Red"
                type="number"
                value={color.r}
                onChange={(e) =>
                  setColor({ ...color, r: parseInt(e.target.value) })
                }
              />
              <TextField
                sx={InputNumberStyles}
                InputProps={{
                  inputProps: {
                    max: 255,
                    min: 0,
                  },
                }}
                size="small"
                fullWidth
                label="Green"
                type="number"
                value={color.g}
                onChange={(e) =>
                  setColor({ ...color, g: parseInt(e.target.value) })
                }
              />
              <TextField
                sx={InputNumberStyles}
                InputProps={{
                  inputProps: {
                    max: 255,
                    min: 0,
                  },
                }}
                size="small"
                fullWidth
                label="Blue"
                type="number"
                value={color.b}
                onChange={(e) =>
                  setColor({ ...color, b: parseFloat(e.target.value) })
                }
              />
              <TextField
                sx={InputNumberStyles}
                InputProps={{
                  inputProps: {
                    max: 1,
                    min: 0,
                    step: '0.1',
                  },
                }}
                size="small"
                fullWidth
                label="Opacity"
                type="number"
                value={color.a}
                onChange={(e) =>
                  setColor({ ...color, a: parseFloat(e.target.value) })
                }
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default ColorPicker
