console.log('插件开始执行');

let blockCount = 0;
let $ = chrome

chrome.storage.sync.get('blockCount', (item) => {
  if (item.blockCount > 0) {
    blockCount = item.blockCount
  }
})

let timeLock = false;

function checkTabUrlAndJump(tab) {
  console.log('处理开始')
  let curTabId = tab.id
  let curUrl = tab.url
  if (curUrl.indexOf('hao123') >= 0) {
    $.tabs.update(curTabId, {url: 'chrome://newtab'}, function () {
      console.log('更新完毕');
      if (!timeLock) {
        timeLock = true
        blockCount += 1
        chrome.storage.sync.set({'blockCount': blockCount} , function () {
          console.log('保存更新完毕')
        })
        chrome.browserAction.setBadgeText({
          text: ''+blockCount
        })
        setTimeout(()=>{
          timeLock = false
        }, 3000)
      }
    })
  }
}


chrome.tabs.onCreated.addListener(checkTabUrlAndJump)

chrome.tabs.onUpdated.addListener(function (curTabId) {
  
  chrome.tabs.get(curTabId ,function (tab) {
      console.log('onUpdate'+JSON.stringify(tab));
      checkTabUrlAndJump(tab)
  })
})

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   console.log('onActivated');
//   let curTabId = activeInfo.tabId
//   chrome.tabs.get(curTabId ,function (tab) {
//     checkTabUrlAndJump(tab)
//   })
// })



chrome.browserAction.setBadgeBackgroundColor({
  color: '#dd2727'
})

