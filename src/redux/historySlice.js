import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    addToHistory: (state, action) => {
      const movie = action.payload;
      // Remove duplicate if exists
      const filtered = state.filter(m => m.id !== movie.id);
      // Prepend the new entry, keep max 10
      return [movie, ...filtered].slice(0, 10);
    },
    clearHistory: () => [],
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
