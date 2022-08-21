import React from 'react'

interface AppProps {
  text: string
}

const MouseHoverSpan: React.FC<AppProps> = ({ text }) => {
  const WhereOptionInfo = () => {
    // chrome.tabs.create({ active: true, url: 'https://bobbyhadz.com/' })
    chrome.tabs.create({ active: true, url: 'options.html' })
  }
  return <span onClick={WhereOptionInfo}>{text}</span>
}

export default MouseHoverSpan
