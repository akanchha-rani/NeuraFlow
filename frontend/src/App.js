import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import "./index.css";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <PipelineToolbar />
      <main className="flex-1 relative overflow-hidden">
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
