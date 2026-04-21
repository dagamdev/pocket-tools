/**
 * @type {Record<FeatureKeys, (newState: boolean, oldState: boolean) => void | Promise<void>>}
 */
const handlers = {
  async expirationByCandle (newState, oldState = false) {
    if (!newState) return

    await findAndClick('.section-deal__time .input-control__label__switch')
    await findAndClick('.input-control__dropdown-option')
  },
  async deepDarkMode (newState, oldState) {
    if (newState === false && oldState === false) return
    
    const bgMountains = document.body.classList.contains('wallpaper-mountains')
    if (newState && bgMountains) {
      const bg = chrome.runtime.getURL('../scripts/background-dark.png')
      document.body.style.backgroundImage = `url(${bg})`
    } else if (bgMountains) {
      document.body.style.backgroundImage = ''
    }

    const includeDarkClass = document.documentElement.className.includes('dark-blue')
      
    if (newState && !includeDarkClass) {
      const result = await findAndClick(querys.deepDarkMode.themeOptions, 1, 1)

      if (result) {
        manageBrokerThemes()
      } else {
        await findAndClick(querys.deepDarkMode.configButton)
        // await findAndClick(querys.deepDarkMode.themeButton, undefined, 3)
      }
    }
    
    if (!newState) {
      const position = theme === 'light' ? 0 : 1
      if (position === 1) return
      const result = await findAndClick(querys.deepDarkMode.themeOptions, 1, position)

      if (!result) {
        await findAndClick(querys.deepDarkMode.configButton)
        // await findAndClick(querys.deepDarkMode.themeButton, undefined, 3)
        await findAndClick(querys.deepDarkMode.themeOptions, undefined, position)
        await findAndClick(querys.deepDarkMode.closeButton)
      }
    }
  }
}

/**
 * 
 * @param {keyof typeof features} featureName
 * @param {boolean} newState
 * @param {boolean} oldState
 */
async function toggleClasses (featureName, newState, oldState = false) {  
  if (newState === oldState) return
  const feature = features[featureName]
  if (!feature.requireClass) return

  if (newState) {
    document.body.classList.add(featureName)
  } else {
    document.body.classList.remove(featureName)
  }
}
