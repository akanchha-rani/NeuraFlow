import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { ApiCallNode } from "./nodes/apiCallNode";
import { ConditionNode } from "./nodes/conditionNode";
import { TransformNode } from "./nodes/transformNode";
import { MergeNode } from "./nodes/mergeNode";
import { NoteNode } from "./nodes/noteNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  apiCall: ApiCallNode,
  condition: ConditionNode,
  transform: TransformNode,
  merge: MergeNode,
  note: NoteNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      const data = event.dataTransfer?.getData("application/reactflow");
      if (!data) return;
      const { nodeType: type } = JSON.parse(data);
      if (!type) return;

      if (reactFlowInstance && bounds) {
        const position = reactFlowInstance.project({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });
        const nodeID = getNodeID(type);
        addNode({
          id: nodeID,
          type,
          position,
          data: { id: nodeID, nodeType: type },
        });
      }
    },
    [reactFlowInstance, getNodeID, addNode],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className="w-full h-full relative bg-background"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{ type: "smoothstep", animated: true }}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="#312e81"
        />

        <Controls position="bottom-left" showInteractive={false} />

        <MiniMap
          nodeColor={() => "rgba(30, 41, 59, 0.7)"}
          maskColor="rgba(11, 15, 25, 0.6)"
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
};
