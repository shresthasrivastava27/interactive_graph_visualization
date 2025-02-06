import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Node {
  id: string;
  position: { x: number; y: number };
  data: { label: string; color: string; fontSize: number };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  history: {
    past: GraphState[];
    present: GraphState;
    future: GraphState[];
  };
}

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
  id: `node-${i}`,
  position: { x: i * 100, y: 50 },
  data: { label: `Node ${i}`, color: '#fff', fontSize: 14 },
}));

const initialEdges: Edge[] = Array.from({ length: 9 }, (_, i) => ({
  id: `edge-${i}`,
  source: `node-${i}`,
  target: `node-${i + 1}`,
}));

const initialState: GraphState = {
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,
  history: {
    past: [],
    present: { nodes: initialNodes, edges: initialEdges, selectedNodeId: null, history: { past: [], present: null!, future: [] } },
    future: [],
  },
};
const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    updateNodeColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.color = action.payload.color;
      }
      state.history.past.push(state.history.present);
      state.history.present = {
        nodes: [...state.nodes],
        edges: [...state.edges],
        selectedNodeId: state.selectedNodeId,
        history: { past: [...state.history.past], future: [] },
      };
      state.history.future = [];
    },
    updateNodeFontSize: (state, action: PayloadAction<{ id: string; fontSize: number }>) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.fontSize = action.payload.fontSize;
      }
      state.history.past.push(state.history.present);
      state.history.present = {
        nodes: [...state.nodes],
        edges: [...state.edges],
        selectedNodeId: state.selectedNodeId,
        history: { past: [...state.history.past], future: [] },
      };
      state.history.future = [];
    },
    updateNodePosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
      state.history.past.push(state.history.present);
      state.history.present = {
        nodes: [...state.nodes],
        edges: [...state.edges],
        selectedNodeId: state.selectedNodeId,
        history: { past: [...state.history.past], future: [] },
      };
      state.history.future = [];
    },
    selectNode: (state, action: PayloadAction<string>) => {
      state.selectedNodeId = action.payload;
    },
    undo: (state) => {
      if (state.history.past.length > 0) {
        const previousState = state.history.past[state.history.past.length - 1];
        state.history.future = [state.history.present, ...state.history.future];
        state.history.present = previousState;
        state.history.past = state.history.past.slice(0, -1);
        state.nodes = previousState.nodes;
        state.edges = previousState.edges;
        state.selectedNodeId = previousState.selectedNodeId;
      }
    },
    redo: (state) => {
      if (state.history.future.length > 0) {
        const nextState = state.history.future[0];
        state.history.past = [...state.history.past, state.history.present];
        state.history.present = nextState;
        state.history.future = state.history.future.slice(1);
        state.nodes = nextState.nodes;
        state.edges = nextState.edges;
        state.selectedNodeId = nextState.selectedNodeId;
      }
    },
  },
});

export const {
  updateNodeColor,
  updateNodeFontSize,
  updateNodePosition,
  selectNode,
  undo,
  redo,
} = graphSlice.actions;

export default graphSlice.reducer;