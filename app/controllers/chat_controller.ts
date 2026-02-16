import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'
import { DateTime } from 'luxon'

export default class ChatController {
  index({ inertia }: HttpContext) {
    return inertia.render('index')
  }

  send({ request, response }: HttpContext) {
    const { fullName, text } = request.only(['fullName', 'text'])

    if (!text) {
      return response.redirect().back()
    }

    transmit.broadcast('chats/1', {
      message: `[${DateTime.now().toFormat('DD H:mm:ss')}] ${fullName ?? 'Guest'}: ${text}`,
    })

    return response.redirect().back()
  }
}
