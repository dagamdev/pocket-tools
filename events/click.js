/**
 * 
 * @param {PointerEvent} ev
 */
function clickEvent (ev) {
  // Eventos para modal panel
  if (!ev.target instanceof HTMLInputElement) return
  const modalPanel = document.querySelector('.modal-panel-exp')

  if (modalPanel && modalPanel.classList.contains('show-exp') && !modalPanel.contains(ev.target)) {
    modalPanel.classList.remove('show-exp')
  }

  const { id } = ev.target

  if (id === 'toggleCompactMode') {
    compactMode = !compactMode

    chrome.runtime.sendMessage({ action: 'updateData', data: {compactMode} }, (response) => {
      ev.target.textContent = compactMode ? 'Expandir' : 'Compactar'
      if (!modalPanel) return

      if (compactMode) {
        modalPanel.classList.add('compact-exp')
      } else {
        modalPanel.classList.remove('compact-exp')
      }
    })
  }
}
