import Docker from 'dockerode'

async function createContainer(imageName:string, cmdExecutable:string[]){
    const docker = new Docker()

    const container = await docker.createContainer({
        Image:imageName,
        Cmd:cmdExecutable,
        // to enable input streams
        AttachStdin:true, 
        // to enable output streams
        AttachStdout:true,
        // to enable error streams
        AttachStderr:true,
        Tty:false,
        // memory limit
        HostConfig:{
            Memory: 1024 * 1024  * 512
        },
        // keep the input stream open even if no interaction is there
        OpenStdin:true
    })
    return container
}
export default createContainer