import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Initialy one page */
export const getUsers = createAsyncThunk(
  "users/getUser",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=4`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      const newData = data.map((user) => ({
        ...user,
        addressString: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
        company: `${user.company.name}`,
      }));
      return {
        data: newData,
        page
      };
    } catch (err) {
      // console.log(err);
      const availableData = await AsyncStorage.getItem("user");

      /* if available data only in storage and no network */
      if (availableData) {
        return {
          data: JSON.parse(availableData),
          page: 1,
          offline: true
        };
      }

      /* Appears if no internet and no already data before in the storage */
      return rejectWithValue(
        "No internet connection and no cached data found.",
      );
    }
  },
);

const initialState = {
  items: [],
  searchName: "",
  filterName: [],
  currentPage: 1,
  continueFetching: true, // for button of load more
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    /* Responsible for searching by name */
    searchByName: (state, action) => {
      state.searchName = action.payload;
      state.filterName = state.items.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    },
    extraReducers: (builder) => {
      builder
            /* if still fetching for users only turn loading to yes */
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
        
            /* if the api is fetched and we get the user data */
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                const newUsers = action.payload.data;
                const page = action.payload.page;

              /* If no users from the api so exit the case */
                if (newUsers.length === 0) {
                    state.continueFetching = false;
                    return
                }

              /* if we get users in the first page then view it otherwise view the old users with new user
                 came from pagination */
                if (page === 1) {
                    state.items = newUsers;
                } else {
                    state.items = [...state.items, ...newUsers]
                }

              /* here we filter the users according to the search name and save it in the new array filterName */
                state.filterName = state.items.filter((user) => user.name.toLowerCase().includes(state.searchName.toLowerCase()))
                state.currentPage = page;

                if (!action.payload.offline) {
                    AsyncStorage.setItem('user', JSON.stringify(state.items))
                }
            })
        
            /* if api rejected to get data for any reason return the error */
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
        })
  }
});

export const { searchByName } = userSlice.actions;
export default userSlice.reducer;