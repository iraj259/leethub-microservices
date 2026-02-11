import express from 'express'
import type { Express } from 'express'
import bodyParser from 'body-parser'
import serverConfig from './config/serverConfig.js'
// import sampleQueueProducer from './producers/sampleQueueProducer.js'
import SampleWorker from './workers/SampleWorker.js'

// 👉 Bull Board
import { serverAdapter } from './config/bullBoard.js'
import v1Router from './routes/v1/index.js'
// import runPython from './containers/runPythonDocker.js'
// import runJava from './containers/runJavaDocker.js'
// import runCpp from './containers/cppExecutor.js'
import SubmissionWorker from './workers/SubmissionWorker.js'
import { submission_queue } from './utils/contants.js'
import submissionQueueProducer from './producers/submissionQueueProducer.js'

const app: Express = express()
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(bodyParser.text())
// 👉 Bull Board route
app.use('/admin/queues', serverAdapter.getRouter())
app.use('/api/v1', v1Router)

app.listen(serverConfig.PORT, () => {
  console.log(`server started at port ${serverConfig.PORT}`)
  console.log(
    `Bull Board running at http://localhost:${serverConfig.PORT}/admin/queues`
  )



  
const code = `
#include <iostream>
using namespace std;

int main() {
    int input;
    cin >> input;
    cout << "Input value given by user: " << input << endl;
    for (int i = 1; i < input; i++) {
        cout << i << endl;
    }
    return 0;
}
`
// runCpp(code, "5")

  // start worker
  SampleWorker('SampleQueue')
SubmissionWorker(submission_queue)
submissionQueueProducer({
  "1234": {
    language: "CPP",
    code,
    inputCase: "5" // match the runCpp input
  }
})
  // produce jobs
  // sampleQueueProducer(
  //   'SampleJob',
  //   {
  //     name: 'Sarah',
  //     company: 'Razorpay',
  //     position: 'PM 2',
  //     location: 'BLR',
  //   },
  //   2
  // )

  // sampleQueueProducer(
  //   'SampleJob',
  //   {
  //     name: 'Iraj',
  //     company: 'Microsoft',
  //     position: 'SDE 2 L61',
  //     location: 'Remote | BLR | Noida',
  //   },
  //   1
  // )




})
 