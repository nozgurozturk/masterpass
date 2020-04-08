const errorContainer = document.querySelector('.error-message')
const errorMessage = document.querySelector('.error-message p')
const errorCloseButton = document.querySelector('.error-message button')

errorCloseButton.addEventListener('click', () => {
  errorMessage.innerHTML = ''
  errorContainer.classList.add('hidden')
})

export function showErrorMessage (message: string) {
  errorMessage.innerHTML = ''
  errorMessage.innerHTML = message
  errorContainer.classList.remove('hidden')
}
