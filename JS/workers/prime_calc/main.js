const worker = new Worker("./generate.js")

// primes generator, send message to worker
document.querySelector('#generate').addEventListener('click', () => {
    const quota = document.querySelector('#quota').value
    worker.postMessage({
        command: "generate",
        quota,
    })
})

// receives message back from the worker, updates page
worker.addEventListener('message', (message) => {
    document.querySelector(
        '#output'
    ).textContent = `Finished generating ${message.data} primes!`
})

document.querySelector('#reload').addEventListener('click', () => {
    document.querySelector('#user-input').value = 
        'Try typing in here immediately after pressing "Generate Primes"'
    document.location.reload()
})