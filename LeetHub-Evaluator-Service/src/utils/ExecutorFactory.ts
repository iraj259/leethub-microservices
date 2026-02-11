import CppExecuter from "../containers/cppExecutor.js";
import JavaExecutor from "../containers/javaExecutor.js";
import PythonExecutor from "../containers/pythonExecuter.js";
import CodeExecutorStrategy from "../types/codeExecuterStrategy.js";

export default function createExecutor(
  codeLanguage: string
): CodeExecutorStrategy | null {
  const lang = codeLanguage.toLowerCase();

  if (lang === "python") {
    return new PythonExecutor();
  } else if (lang === "java") {
    return new JavaExecutor();
  } else if (lang === "cpp" || lang === "c++") {
    return new CppExecuter();
  } else {
    return null;
  }
}