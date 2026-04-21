function loadEvent () {
  initialice()

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return

        // deepDarkMode
        if (featureStates.deepDarkMode) {
          const query = querys.deepDarkMode.themeOptions
          const themeOption = node.matches(query) ? node : node.querySelector(query)

          if (themeOption) {
            console.log(query)
            findAndClick(querys.deepDarkMode.themeOptions, undefined, 1)

            // manageBrokerThemes()
          }
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  document.addEventListener("keydown", async (e) => {
    if (featureStates.keyboardShortcuts) {
      if ( e.key !== '0' && e.ctrlKey && !isNaN(+e.key)) {
        e.preventDefault()
  
        const chart = document.querySelector(querys.keyboardShortcuts.chartsOpen + `[tabindex="${e.key}"]`)
  
        if (chart) chart.click()
      }
    }

    if (featureStates.timeframeHotkeys) {
      if ( e.key !== '0' && e.altKey && !isNaN(+e.key)) {
        e.preventDefault()

        const index = +e.key - 1
        const timeFrame = await findAndClick(querys.timeframeHotkeys.timeFrameOptions, 1, index)

        if (!timeFrame) {
          await findAndClick(querys.timeframeHotkeys.chartTypeButton)
          await findAndClick(querys.timeframeHotkeys.timeFrameOptions, 30, index)
        }
      }
    }
  })


  // Themes
  const observerHTMLClass = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        updateBrokerTheme(mutation.target.className)
      }
    })
  })

  observerHTMLClass.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"]
  })

  // Theme bg
  const observerBodyClass = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {

        if (featureStates.deepDarkMode && mutation.target.classList.contains('wallpaper-mountains')) {
          const bg = chrome.runtime.getURL('../scripts/background-dark.png')
          document.body.style.backgroundImage = `url(${bg})`
        }
      }
    })
  })

  observerBodyClass.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  })
}
