import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageCard from '@/components/ImageCard';
import SearchInput from '@/components/SearchInput';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://sarvail.net/wp-json/ds-custom_endpoints/v1/posts?per_page=200');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (query) {
      const filtered = data.filter((item) =>
        item.post_title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">Error: {error.message}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({ item }) => <ImageCard item={item} />}
          ListHeaderComponent={() => (
            <View className="my-6 px-4">
              <Text className="font-semibold text-3xl text-gray-100">Sarvail</Text>
              <Text className="font-semibold text-gray-100 text-lg">Recent News</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-100 text-lg">No data available</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
