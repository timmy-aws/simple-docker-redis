import express from 'express'
import { createClient } from 'redis'

const app = express()

// Connect to Redis (the hostname = service name in Docker Compose)
const redis = createClient({
    url: 'redis://redis:6379'
})

redis.on('error', err => console.error('Redis error:', err))

await redis.connect()

app.get('/set', async (req, res) => {
    await redis.set('greeting', 'Hello from Redis!')
    res.send('Value set in Redis!')
})

app.get('/get', async (req, res) => {
    const value = await redis.get('greeting')
    res.send(`Redis says: ${value}`)
})

app.listen(3000, () => console.log('API running on :3000'))
