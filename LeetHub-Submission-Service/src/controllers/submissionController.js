
async function pingRequest(req,res){
     const response = await req.server.testService.pingCheck()
    return res.send({ data: response })
}
// add validation layer here
async function createSubmission(req, res){
    console.log(req.body);
    
    const response = await this.submissionService.addSubmission(req.body)
    return res.status(201).send({
        error:{},
        data:response,
        success:true,
        message:'created submission successfully'
    })

}

module.exports= {pingRequest, createSubmission}