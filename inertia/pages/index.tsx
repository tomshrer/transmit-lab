import { useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Transmit } from '@adonisjs/transmit-client'

export default function Index() {
  const [messages, setMessages] = useState<{ message: string }[]>([])
  const { data, setData, post, reset } = useForm({
    fullName: '',
    text: '',
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/send', {
      onSuccess: () => reset('text'),
    })
  }

  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: window.location.origin,
    })

    const subscription = transmit.subscription('chats/1')

    async function init() {
      await subscription.create()

      subscription.onMessage((data: { message: string }) => {
        setMessages((prev) => [...prev, data])
      })
    }

    init()

    return () => {
      subscription.delete()
    }
  }, [])

  return (
    <section className="max-w-7xl m-auto p-4 flex gap-4 flex-col">
      <h2 className="text-3xl">Chat en temps réel avec Transmit</h2>

      <div className="font-mono bg-gray-100 border border-gray-200 rounded w-full h-96 p-6 flex gap-2 flex-col overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i}>{m.message}</div>
        ))}
      </div>

      <form onSubmit={submit} className="flex gap-4">
        <input
          type="text"
          placeholder="Pseudo"
          value={data.fullName}
          onChange={(e) => setData('fullName', e.target.value)}
          className="bg-gray-100 border border-gray-200 rounded w-1/5 px-4 py-1"
        />
        <input
          type="text"
          placeholder="Message"
          value={data.text}
          onChange={(e) => setData('text', e.target.value)}
          className="bg-gray-100 border border-gray-200 rounded w-1/3 px-4 py-1"
        />
        <button
          className="bg-blue-500 border border-blue-400 rounded px-4 py-1 text-white"
          type="submit"
        >
          Envoyer
        </button>
      </form>
    </section>
  )
}
