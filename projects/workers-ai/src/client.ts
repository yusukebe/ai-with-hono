import { stream } from 'fetch-event-stream'
import { stdout } from 'node:process'

const events = await stream('http://localhost:8787')

for await (let event of events) {
  if (event.data) {
    try {
      const data = JSON.parse(event.data)
      stdout.write(data.response)
    } catch {}
  }
}
