(function () {
  const form = document.querySelector('form')
  const url = form.querySelector('input[name="url"]')
  const short = form.querySelector('input[name="short"]')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    url.readOnly = true;

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
        url: url.value
      })
    })

    const json = await response.json()

    url.readOnly = false;
    url.value = ''

    short.style.visibility = 'visible'
    short.value = json.short
    short.select()
  })
})()
