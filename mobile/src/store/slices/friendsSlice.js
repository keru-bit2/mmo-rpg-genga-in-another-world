import { createSlice } from '@reduxjs/toolkit';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    friendRequests: [],
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
  },
});

export const { setFriends, addFriend } = friendsSlice.actions;
export default friendsSlice.reducer;
