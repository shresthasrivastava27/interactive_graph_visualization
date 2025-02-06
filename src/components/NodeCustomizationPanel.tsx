import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateNodeColor, updateNodeFontSize } from '../store/slices/graphSlice';

const NodeCustomizationPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes, selectedNodeId } = useSelector((state: RootState) => state.graph);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNodeId) {
      dispatch(updateNodeColor({ id: selectedNodeId, color: event.target.value }));
    }
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNodeId) {
      const fontSize = Math.min(Math.max(Number(event.target.value), 12), 24);
      dispatch(updateNodeFontSize({ id: selectedNodeId, fontSize }));
    }
  };

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, padding: 10, background: '#fff', zIndex: 10 }}>
      {selectedNode ? (
        <>
          <div>
  <label>Node Color: </label>
  <input
    type="color"
    value={selectedNode.data.color}
    onChange={handleColorChange}
  />
</div>
<div>
  <label>Font Size: </label>
  <input
    type="number"
    min="12"
    max="24"
    value={selectedNode.data.fontSize}
    onChange={handleFontSizeChange}
  />
</div>

        </>
      ) : (
        <p>Select a node to customize.</p>
      )}
    </div>
  );
};

export default NodeCustomizationPanel;