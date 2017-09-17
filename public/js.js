(function () {
  const form = document.querySelector('form')
  const input = form.querySelector('input[name="url"]')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    short.style.visibility = 'hidden'
    short.value = ''

    const response = await window.fetch('/', {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      headers: new window.Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        url: input.value
      })
    })

    const json = await response.json()
    const short = form.querySelector('input[name="short"]')

    input.value = ''

    short.style.visibility = 'visible'
    short.value = json.short
    short.select()
  })
})()
