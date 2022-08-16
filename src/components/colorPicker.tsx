import React, { useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import './styles.css'

interface AppProps {
  setLinkColor: (color: string) => void
  changeColor: (color: string) => void
  linkColor: string
}
const ColorPicker: React.FC<AppProps> = ({
  linkColor,
  setLinkColor,
  changeColor,
}) => {
  const [color, setColor] = useState<any>((linkColor) => {
    // rgbToObj('rgba(193,22,22,0.5)')
    let colors = ['r', 'g', 'b', 'a']
    console.log('rgb: ', linkColor)
    let colorArr = linkColor
      .slice(linkColor.indexOf('(') + 1, linkColor.indexOf(')'))
      .split(',')

    let obj = new Object()

    colorArr.forEach((k, i) => {
      obj[colors[i]] = parseInt(k)
    })

    return linkColor
  })

  // function rgbToObj(rgb) {
  //   let colors = ['r', 'g', 'b', 'a']

  //   let colorArr = rgb.slice(rgb.indexOf('(') + 1, rgb.indexOf(')')).split(',')

  //   let obj = new Object()

  //   colorArr.forEach((k, i) => {
  //     obj[colors[i]] = parseInt(k)
  //   })

  //   return obj
  // }
  // console.log(rgbToObj('rgba(193,22,22,0.5)'))

  return (
    <div className="App">
      <RgbaColorPicker color={color} onChange={setColor} />

      <div>{`rgba(${color.r},${color.g},${color.b},${color.a})`}</div>

      {/* <label htmlFor="colorInput"></label>
      <input
        type="text"
        id="colorInput"
        value={`rgba(${color.r},${color.g},${color.b},${color.a})`}
      /> */}

      <div className="buttons">
        {/* {<button onClick={() => setColor({ r: 75, g: 75, b: 150, a: 1 })}>
          Choose blue
        </button>}*/}

        <button
          onClick={() =>
            changeColor(`rgba(${color.r},${color.g},${color.b},${color.a})`)
          }
        >
          Choose color
        </button>
      </div>
    </div>
  )
}

export default ColorPicker
