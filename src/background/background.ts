import { setStoredOptions } from '../utils/storage'
chrome.runtime.onInstalled.addListener(() => {
  setStoredOptions({
    where_options: 'all',
    link_color: 'rgba(117,101,0,1)',
    link_background: 'revert',
    except_sites: [],
    // only_sites: ['https://www.reddit.com/', 'https://www.youtube.com'],
    only_sites: [],
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse('response z background')
})
