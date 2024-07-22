import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView className='bg-primary'>
      <View className='items-center justify-center h-full'>
        <Image source={images.sarvailLogo} className='w-44 h-56' />
        {/* <Text className='font-semibold text-red-700'>Sarvail</Text> */}
        {/* <Link href="/home">Go to app</Link> */}
        <CustomButton
          title="Continue With email"
          handlePress={handlePress}
          containerStyles="w-[240px] mt-12"
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
