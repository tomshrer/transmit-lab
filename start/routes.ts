/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'
const ChatController = () => import('#controllers/chat_controller')

transmit.registerRoutes()

router.get('/', [ChatController, 'index'])
router.post('/send', [ChatController, 'send'])
