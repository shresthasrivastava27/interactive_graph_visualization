import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphState } from './graphSlice';

interface HistoryState {
  past: GraphState[];
  present: GraphState;
  future: GraphState[];
}

const initialState: HistoryState = {
  past: [],
  present: { nodes: [], edges: [] },
  future: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past[state.past.length - 1];
        state.future = [state.present, ...state.future];
        state.present = previous;
        state.past = state.past.slice(0, -1);
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future[0];
        state.past = [...state.past, state.present];
        state.present = next;
        state.future = state.future.slice(1);
      }
    },
    record: (state, action: PayloadAction<GraphState>) => {
      state.past = [...state.past, state.present];
      state.present = action.payload;
      state.future = [];
    },
  },
});

export const { undo, redo, record } = historySlice.actions;
export default historySlice.reducer;