console.log('321')


document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('blockCount', (item) => {
    let blockCount = 0
    if (item.blockCount > 0) {
      blockCount = item.blockCount
    }
    document.querySelector('#J_PopupCon').innerHTML = `已屏蔽hao123 <span class="number">${blockCount}</span>次`
  })
  
})