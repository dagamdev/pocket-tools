function initialice () {
  chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
    if (response.featureStates) featureStates = response.featureStates
    if (response.theme) theme = response.theme
    if (response.compactMode) compactMode = response.compactMode
    
    featureKeys.forEach(featureKey => {
      const state = featureStates[featureKey]
      toggleClasses(featureKey, state)
      
      const handler = handlers[featureKey]
      if (handler) handler(state, false)
    })
  })

  updateBrokerTheme(document.documentElement.className)
}

function updateData () {
  chrome.runtime.sendMessage({ action: 'getData' }, (response) => {
    if (response.theme) theme = response.theme
    if (response.compactMode) compactMode = response.compactMode
    
    if (response.featureStates) {
      featureKeys.forEach(featureKey => {
        const newState = response.featureStates[featureKey]
        toggleFeature(featureKey, newState)
      })
    }
  })

  updateBrokerTheme(document.documentElement.className)
}

function manageBrokerThemes () {
  document.querySelectorAll(querys.deepDarkMode.themeOptions).forEach((element, i) => {
    if (i === 2) return
    element.addEventListener('click', e => {
      if (featureStates.deepDarkMode) {
        e.preventDefault()
      }
    })
    element.title = `Desactiva la función "${features.deepDarkMode.name}" para poder cambiar entré los temas del Broker`
  })
}

/**
 * @param {keyof typeof features} featureName
 * @param {Boolean} newState
 */
function toggleFeature (featureName, newState) {
  const oldState = featureStates[featureName]
  if (oldState === newState) return

  toggleClasses(featureName, newState, oldState)
  featureStates[featureName] = newState

  const handler = handlers[featureName]
  if (handler) handler(newState, oldState)
}

/**
 * 
 * @param {string} className 
 */
function updateBrokerTheme (className) {
  if (!featureStates.deepDarkMode) {
    theme = className.split(' ').find(f => f.includes('theme'))?.replace('theme-', '') || 'dark-blue'
    chrome.runtime.sendMessage({ action: 'updateTheme', theme })
  }
}
