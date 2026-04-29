import React from "react";
import "../../global.css";
import { View, Text } from "react-native";

export default function UserCard({ user }) {
  return (
    <View className="bg-white p-5 mx-4 mb-4 rounded-xl shadow-sm border border-gray-100 flex-row items-center">
      <View className="h-12 w-12 rounded-full bg-blue-100 items-center justify-center mr-4">
        <Text className="text-blue-700 font-bold text-lg">
          {user.name.charAt(0)}
        </Text>
      </View>

      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900 mb-1">
          {user.name}
        </Text>
        <Text className="text-sm text-gray-600 mb-1 font-medium">
          {user.email}
        </Text>
        <Text className="text-xs text-gray-400 leading-tight">
          {user.addressString}
        </Text>
      </View>
    </View>
  );
}
