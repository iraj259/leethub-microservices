import createContainer from "./containerFactory.js";
import { CPP_IMAGE } from "../utils/contants.js";
import pullImage from "./pullImage.js";
import decodeDockerStream from "./dockerHelper.js";
import CodeExecutorStrategy, {
  ExecutionResponse,
} from "../types/codeExecuterStrategy.js";

class CppExecuter implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputCase: string
  ): Promise<ExecutionResponse> {
    const rawLogBuffer: Buffer[] = [];

    await pullImage(CPP_IMAGE);

    const safeCode = code.replace(/'/g, `'\\''`);
    const safeInput = inputTestCase.replace(/'/g, `'\\''`);

    const runCommand = `
      echo '${safeCode}' > main.cpp &&
      g++ main.cpp -o main &&
      echo '${safeInput}' | ./main
    `;

    const cppDockerContainer = await createContainer(CPP_IMAGE, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);

    await cppDockerContainer.start();

    const loggerStream = await cppDockerContainer.logs({
      stdout: true,
      stderr: true,
      timestamps: false,
      follow: true,
    });

    loggerStream.on("data", (chunk) => {
      rawLogBuffer.push(chunk);
    });

    try {
      const output = await this.fetchDecodedStream(
        loggerStream,
        rawLogBuffer
      );

      if (output.trim() === outputCase.trim()) {
        return { output, status: "SUCCESS" };
      } else {
        return { output, status: "WA" };
      }
    } catch (error) {
      return { output: String(error), status: "ERROR" };
    } finally {
      await cppDockerContainer.remove();
    }
  }

  fetchDecodedStream(
    loggerStream: NodeJS.ReadableStream,
    rawLogBuffer: Buffer[]
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      loggerStream.on("end", () => {
        const buffer = Buffer.concat(rawLogBuffer);
        const decoded = decodeDockerStream(buffer);

        if (decoded.stderr) reject(decoded.stderr);
        else resolve(decoded.stdout);
      });
    });
  }
}

export default CppExecuter;
