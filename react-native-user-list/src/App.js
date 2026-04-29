import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import "../global.css";
import UserCard from "./components/UserCard";
import { store } from "./redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";
import { getUsers, searchByName } from "./redux/slices/userSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";

function Main() {
  const dispatch = useDispatch();
  const {
    filterName,
    loading,
    error,
    searchName,
    currentPage,
    continueFetching,
  } = useSelector((state) => state.user);

    { /* Function responsible for loading button it works if the api not finished its data */ }
  const handleLoadMore = () => {
    if (!loading && continueFetching) {
      dispatch(getUsers(currentPage + 1));
    }
  };

    { /* fetch the user api and call the first page only limited to 5 per page */ }
    useEffect(() => {
    // Clear the cache if you want
    //   AsyncStorage.clear();
    dispatch(getUsers(1));
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-10">
      <StatusBar barStyle="dark-content" />
      <Text className="text-3xl font-extrabold text-gray-900 m-4">
        Fekra React Native Users
      </Text>
      <TextInput
        placeholder="Search by name here.."
        value={searchName}
        onChangeText={(value) => dispatch(searchByName(value))}
      />

        { /* If only an error appears */ }
      {error && (
        <View className="bg-red-100 p-3 rounded-lg my-4">
          <Text className="text-red-600 text-center">{error}</Text>
        </View>
      )}

      <FlatList
        data={filterName}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />} // The user card component for each user
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={4}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View className="text-center">
            <Text className="text-gray-500 text-lg">No users found.</Text>
          </View>
        }
            /* The load more button */
        ListFooterComponent={
          filterName.length > 0 ? (
            <View className="items-center py-6 pb-10">
              {continueFetching ? (
                <Text
                  onPress={handleLoadMore}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold overflow-hidden"
                >
                  {loading ? "Loading..." : "Load More Users"}
                </Text>
              ) : (
                <Text className="text-gray-400 font-medium">
                  No more users to load
                </Text>
              )}
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
