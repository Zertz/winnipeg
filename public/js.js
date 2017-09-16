(function () {
  const form = document.querySelector('form')
  const input = form.querySelector('input[name="url"]')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const response = await fetch('/', {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        url: input.value
      })
    })

    const json = await response.json()

    console.info(json)
  })
})()
