import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import SimpleStore from 'react-native-simple-store';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userLoggedIn = await SimpleStore.get('loggedIn');
        if (userLoggedIn) {
          router.replace('/home');
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to fetch login status', error);
      }
    };

    checkLoginStatus();
  }, [router]);

  const handlePress = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView className='bg-primary'>
      <View className='items-center justify-center h-full'>
        <Image source={images.sarvailLogo} className='w-44 h-56' />
        <CustomButton
          title="Continue With email"
          handlePress={handlePress}
          containerStyles="w-[240px] mt-12"
        />
      </View>
    </SafeAreaView>
  );
}
