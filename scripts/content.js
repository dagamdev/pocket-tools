'use strict'

console.log('Pocket tools')

for (const key in features) {
  featureStates[key] = false
}

window.addEventListener("load", loadEvent)
document.addEventListener('visibilitychange', visibilitychange)
window.addEventListener('resize', resizeEvent)
document.addEventListener('click', clickEvent)
document.addEventListener('change', changeEvent)

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'UPDATE_FEATURE') {
    toggleFeature(msg.featureName, msg.newState)
  }

  if (msg.type === 'UPDATE_COMPACTMODE') {    
    compactMode = msg.newState

    const compactButton = document.querySelector('.compact-btn-exp')
    if (compactButton) {
      compactButton.textContent = compactMode ? 'Expandir' : 'Compactar'
    }

    const modalPanel = document.querySelector('.modal-panel-exp')
    if (!modalPanel) return

    if (compactMode) {
      modalPanel.classList.add('compact-exp')
    } else {
      modalPanel.classList.remove('compact-exp')
    }
  }
})
