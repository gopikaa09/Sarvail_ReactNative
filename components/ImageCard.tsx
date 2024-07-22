import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { truncateHtml } from '@/hooks/useTruncate';

const ImageCard = ({ item }) => {
  const truncatedContent = truncateHtml(item?.post_content, 150);
  const avatar = item?.post_author === '1' ? 'https://media.licdn.com/dms/image/C5603AQGPN1Fj6eXLWQ/profile-displayphoto-shrink_400_400/0/1581546724198?e=2147483647&v=beta&t=ndNnjK31VXbZNDhy-EaxJZd55nt6FTu_ShrEq-Z9_Io' : ''; // Set to a proper URL or local path
  const navigate = useRouter();

  const handlePress = () => {
    navigate.push(`/details/${item.ID}`); // Adjust to your details page route
  }

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          {/* <View className="w-11 h-11 rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View> */}

          <View className="flex justify-center flex-1 ml-0 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {item?.post_title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {item?.post_author ? "Admin" : ''}
            </Text>
          </View>
        </View>

        {/* <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View> */}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress} // Corrected function call
        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
      >
        <Image
          source={{ uri: item?.featured_image?.medium_large }}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const tagsStyles = {
  p: {
    marginVertical: 8,
    fontSize: 16,
    color: '#F0F0F0',
    lineHeight: 24,
  },
};

export default ImageCard;
