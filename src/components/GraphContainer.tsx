import React, { useEffect } from 'react';
import { ReactFlow, Controls, useNodesState, useEdgesState } from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateNodePosition, selectNode } from '../store/slices/graphSlice';
import NodeCustomizationPanel from './NodeCustomizationPanel';
import UndoRedoControls from './UndoRedoControls';
import 'reactflow/dist/style.css';

const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes: reduxNodes, edges: reduxEdges } = useSelector(
    (state: RootState) => state.graph
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(reduxEdges);

  useEffect(() => {
    setNodes(reduxNodes);
  }, [reduxNodes, setNodes]);

  useEffect(() => {
    setEdges(reduxEdges);
  }, [reduxEdges, setEdges]);

  const handleNodesChange = (changes: any[]) => {
    onNodesChange(changes);
    changes.forEach((change) => {
      if (change.type === 'position' && !change.dragging && change.position) {
        dispatch(
          updateNodePosition({
            id: change.id,
            position: { x: change.position.x, y: change.position.y },
          })
        );
      }
    });
  };

  const onNodeClick = (event: React.MouseEvent, node: any) => {
    dispatch(selectNode(node.id));
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
      </ReactFlow>
      <NodeCustomizationPanel />
      <UndoRedoControls />
    </div>
  );
};

export default GraphContainer;