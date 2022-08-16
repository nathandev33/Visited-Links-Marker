import React, { useState, useEffect } from 'react'
import { TextareaAutosize } from '@mui/material'
import './TextArea.css'

interface AppProps {}

const TextArea: React.FC<AppProps> = ({}) => {
  return (
    <TextareaAutosize
      className={'TextArea'}
      maxRows={12}
      minRows={3}
      aria-label="maximum height"
      placeholder="https://www.facebook.com/,https://mail.google.com/"
      defaultValue=""
      style={{ width: 300 }}
    />
  )
}

export default TextArea
