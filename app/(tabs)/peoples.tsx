import SearchInput from '@/components/SearchInput';
import UsersCard from '@/components/UsersCard';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Peoples() {
  const users = [
    {
      id: 1,
      name: 'Gopika',
      batch: '2016-2017',
      proffesion: 'developer',
      mobile: '9876543210'
    },
    {
      id: 2,
      name: 'Lucky',
      batch: '2016-2017',
      proffesion: 'developer',
      mobile: '9876543210'
    }
  ]
  return (
    <SafeAreaView className='bg-primary flex-1'>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()} // Convert ID to string
        renderItem={({ item }) => <UsersCard user={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className="font-semibold text-3xl text-gray-100">Sarvail</Text>
            <Text className="font-semibold text-gray-100 text-lg mb-3">Peoples</Text>
            <SearchInput />
          </View>
        )}
      >

      </FlatList>
    </SafeAreaView>
  );
}
