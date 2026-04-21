let modalPanel

function resizeEvent () {
  if (window.innerHeight >= screen.height) {
    const toogleButton = document.querySelector('.toggle-modal-exp')
    const modalPanel = document.querySelector('.modal-panel-exp')

    if (toogleButton && modalPanel) {
      toogleButton.classList.add('show-exp')

      return
    }

    const button = document.createElement('div')
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>'
    button.className = 'toggle-modal-exp show-exp'

    document.body.appendChild(button)

    const panel = document.createElement('div')
    panel.className = 'modal-panel-exp'

    if (compactMode) {
      panel.classList.add('compact-exp')
    }

    const activeFeatures = Object.values(featureStates).filter(fv => fv).length

    panel.innerHTML = `
      <div class="header-footer-exp">
        <div id="activeFeaturesCount" class="feature-count-exp">${activeFeatures} / ${featureKeys.length} funciones activas</div>
        <button id="toggleCompactMode" class="compact-btn-exp">
          ${compactMode ? 'Expandir' : 'Compactar'}
        </button>
      </div>
      <section class="container-exp">
        ${featureKeys.map(fk => {
          const feature = features[fk]
          const value = featureStates[fk]

          return `<article class="feature-exp${feature.inDevelopment ? ' disabled-exp' : ''}"${feature.inDevelopment ? ` title="En desarrollo"` : ''}>
            <div class="feature-info-exp">
              <div class="feature-title-exp">${feature.name}</div>
              <div class="feature-desc-exp">
                ${feature.description}
              </div>
            </div>

            <label class="switch-exp">
              <input type="checkbox" id="${fk}"${value ? ` checked="true"` : ''}>
              <span class="slider-exp"></span>
            </label>
          </article>`
        }).join('')}
      </section>
    `

    document.body.appendChild(panel)

    // Toggle panel
    button.onclick = (ev) => {
      panel.classList.toggle('show-exp')
      ev.stopPropagation()
    }
  } else {
    const toogleButton = document.querySelector('.toggle-modal-exp')
    const modalPanel = document.querySelector('.modal-panel-exp')

    if (toogleButton && toogleButton.classList.contains('show-exp')) {
      toogleButton.classList.remove('show-exp')
    }

    if (modalPanel && modalPanel.classList.contains('show-exp')) {
      modalPanel.classList.remove('show-exp')
    }
  }
}
