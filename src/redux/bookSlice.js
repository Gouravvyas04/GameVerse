import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarkedGames: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark(state, action) {
      const alreadyBookmarked = state.bookmarkedGames.find(
        (item) => item.id === action.payload.id
      );
      if (!alreadyBookmarked) {
        state.bookmarkedGames.push(action.payload);
      }
    },
    removeBookmark(state, action) {
      state.bookmarkedGames = state.bookmarkedGames.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
