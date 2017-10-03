(function () {
  const form = document.querySelector('form')
  const url = form.querySelector('input[name="url"]')
  const short = form.querySelector('input[name="short"]')
  const share = form.querySelector('button.share')

  if (navigator.share) {
    share.addEventListener('click', async (e) => {
      try {
        await navigator.share({
          url: short.value
        })
      } catch (err) {
        console.error(err)
      }
    })
  } else {
    share.parentElement.removeChild(share)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    form.classList.add('loading')

    url.readOnly = true

    short.style.visibility = 'hidden'
    short.value = ''

    share.style.visibility = 'hidden'

    try {
      const response = await window.fetch('/', {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: new window.Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          url: url.value
        })
      })

      const json = await response.json()

      share.style.visibility = 'visible'

      short.style.visibility = 'visible'
      short.value = json.short
      short.select()

      url.readOnly = false
      url.value = ''
    } catch (err) {
      console.error(err)
    } finally {
      form.classList.remove('loading')
    }
  })
})()
