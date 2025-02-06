import React from 'react';
import { useDispatch } from 'react-redux';
import { undo, redo } from '../store/slices/graphSlice';

const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ position: 'absolute', bottom: 10, left: 10, padding: 10, background: '#fff', zIndex: 10 }}>
      <button onClick={() => dispatch(undo())}>Undo</button>
      <button onClick={() => dispatch(redo())}>Redo</button>
    </div>
  );
};

export default UndoRedoControls;