/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { events } from 'fetch-event-stream'

type Message = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const messages: Message[] = []
const messagesEl = document.getElementById('messages')!
const form = document.getElementById('chat-form') as HTMLFormElement
const input = document.getElementById('input') as HTMLTextAreaElement

function addMessageEl(role: 'user' | 'assistant'): HTMLDivElement {
  const div = document.createElement('div')
  div.className = `message ${role}`
  messagesEl.appendChild(div)
  return div
}

form.addEventListener('submit', async (e: SubmitEvent) => {
  e.preventDefault()

  const content = input.value.trim()
  if (!content) return

  input.value = ''
  input.disabled = true
  const button = form.querySelector('button')!
  button.disabled = true

  messages.push({ role: 'user', content })
  const userEl = addMessageEl('user')
  userEl.textContent = content
  messagesEl.scrollTop = messagesEl.scrollHeight

  const assistantEl = addMessageEl('assistant')
  messages.push({ role: 'assistant', content: '' })

  try {
    const stream = await fetch('/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.slice(0, -1) })
    })

    for await (const event of events(stream)) {
      if (event.data === '[DONE]') break
      const data = JSON.parse(event.data!)
      if (data.response) {
        messages[messages.length - 1].content += data.response
        assistantEl.textContent += data.response
        messagesEl.scrollTop = messagesEl.scrollHeight
      }
    }
  } catch (err) {
    console.error(err)
    assistantEl.textContent = 'Error occurred'
  }

  input.disabled = false
  button.disabled = false
  input.focus()
  messagesEl.scrollTop = messagesEl.scrollHeight
})

input.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    form.requestSubmit()
  }
})
