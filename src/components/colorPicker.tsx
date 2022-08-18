import React, { useState, useEffect } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import './styles.css'
import { getStoredOptions } from '../utils/storage'
import { TextField, Box } from '@mui/material/'

interface AppProps {
  changeColor: (color: string) => void
  linkColor: string
}
const ColorPicker: React.FC<AppProps> = ({ linkColor, changeColor }) => {
  // const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 0 })
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 })

  useEffect(() => {
    const objectFromRgba = () => {
      // const color = linkColor
      // const color = 'rgba(0,0,0,0.5)'
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
      // return { r: 200, g: 150, b: 35, a: 0.5 }
    }
    objectFromRgba()
  }, [])

  // const [color, setColor] = useState(objectFromRgba('rgba(0,0,0,0.5)'))
  // const [color, setColor] = useState(objectFromRgba())

  // setColor({ r: 250, g: 250, b: 35, a: 0.5 })

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <div>
          <RgbaColorPicker color={color} onChange={setColor} />
          <div className="value">{JSON.stringify(color)}</div>
          <div>{`rgba(${color.r},${color.g},${color.b},${color.a})`}</div>
          <div className="buttons">
            <button
              onClick={() =>
                changeColor(`rgba(${color.r},${color.g},${color.b},${color.a})`)
              }
            >
              Change link color
            </button>
          </div>
        </div>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              InputProps={{
                inputProps: {
                  max: 255,
                  min: 0,
                },
              }}
              label="Red"
              type="number"
              value={color.r}
              onChange={(e) =>
                setColor({ ...color, r: parseInt(e.target.value) })
              }
            />
            <TextField
              InputProps={{
                inputProps: {
                  max: 255,
                  min: 0,
                },
              }}
              label="Green"
              type="number"
              value={color.g}
              onChange={(e) =>
                setColor({ ...color, g: parseInt(e.target.value) })
              }
            />
            <TextField
              InputProps={{
                inputProps: {
                  max: 255,
                  min: 0,
                },
              }}
              label="Blue"
              type="number"
              value={color.b}
              onChange={(e) =>
                setColor({ ...color, b: parseInt(e.target.value) })
              }
            />
            <TextField
              InputProps={{
                inputProps: {
                  max: 1,
                  min: 0,
                },
              }}
              label="Opacity"
              type="number"
              value={color.r}
              onChange={(e) =>
                setColor({ ...color, r: parseFloat(e.target.value) })
              }
            />
          </div>
        </Box>
      </Box>
    </div>
  )
}

export default ColorPicker
