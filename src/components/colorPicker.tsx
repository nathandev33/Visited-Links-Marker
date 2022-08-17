import React, { useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import './styles.css'

interface AppProps {
  changeColor: (color: string) => void
  linkColor: string
}
const ColorPicker: React.FC<AppProps> = ({ linkColor, changeColor }) => {
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 })

  return (
    <div className="App">
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
  )
}

export default ColorPicker
