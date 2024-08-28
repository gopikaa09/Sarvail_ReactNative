import React from 'react';
import { View, Text } from 'react-native';

export default function UsersCard({ user }) {
  return (
    <View className="flex-row items-center bg-white p-4 rounded-2xl my-2 mx-4">
      {/* Avatar with Initial */}
      <View className="w-12 h-12 rounded-full bg-slate-200 justify-center items-center">
        <Text className="text-lg font-bold text-black">
          {user?.name?.[0]?.toUpperCase()} {/* Display the first letter of the user's name */}
        </Text>
      </View>

      {/* User Details */}
      <View className="ml-4">
        <Text className="text-base font-semibold text-slate-900">{user?.name}</Text>
        <Text className="text-sm text-slate-400">{user?.mobile}</Text>
        <Text className="text-sm text-slate-400">{user?.batch}</Text>

      </View>
    </View>
  );
}
