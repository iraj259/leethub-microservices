import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'

import sampleQueue from '../queues/sampleQueue.js'
import submissionQueue from '../queues/submissionQueue.js'
import evaluationQueue from '../queues/evaluationQueue.js'
const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

createBullBoard({
  queues: [
    new BullMQAdapter(sampleQueue),
     new BullMQAdapter(submissionQueue),
     new BullMQAdapter(evaluationQueue)
  ],
  serverAdapter,
})

export { serverAdapter }
