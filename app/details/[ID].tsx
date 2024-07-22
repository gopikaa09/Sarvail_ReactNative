import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { truncateHtml } from '@/hooks/useTruncate';

const Details = () => {
  const { ID } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://sarvail.net/wp-json/ds-custom_endpoints/v1/posts/${ID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ID]);
  // console.log(data);
  const truncatedContent = truncateHtml(data?.post_content, 150);



  return (
    <SafeAreaView className='flex-1 bg-primary items-center justify-center'>
      <ScrollView>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-500 text-lg">Error: {error.message}</Text>
          </View>
        ) : (
          data && (
            <View className='items-center w-8'>
              <Image
                source={{ uri: data?.featured_image?.medium }}
                className="w-full h-60 rounded-xl mt-5"
                resizeMode="cover"
              />
              <Text className='font-semibold text-lg text-slate-100'>{data?.post_title}</Text>
              <RenderHTML
                contentWidth={350}
                source={{ html: truncatedContent }}
                tagsStyles={tagsStyles}
              >

              </RenderHTML>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const tagsStyles = {
  p: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#E2E8F0', // slate-100 color
  },
  ul: {
    marginVertical: 1,
    paddingLeft: 20,
    color: '#E2E8F0', // slate-100 color
  },
  li: {
    marginTop: -3,
    fontSize: 16,
    marginLeft: 2,
    lineHeight: 26,
    color: '#E2E8F0', // slate-100 color
  },
  a: {
    color: 'blue',
  },
  img: {
    width: 250,
    height: 250
  }
};





export default Details;
