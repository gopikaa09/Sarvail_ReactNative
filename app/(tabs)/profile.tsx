import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleStore from 'react-native-simple-store';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import editIcon from '../../assets/icons/edit.png';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    ds_batch: '',
    email: '',
    ds_res_mobile: '',
    country_code: '',
    password: '',
    ds_profession: ''
  });
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await SimpleStore.get('user');
        if (storedUser) {
          setUser(storedUser);
          setForm({
            username: storedUser.user.user_nicename || '',
            first_name: storedUser.user_meta?.first_name || '',
            last_name: storedUser.user_meta?.last_name || '',
            ds_batch: storedUser.user.ds_batch || '',
            email: storedUser.user.user_email || '',
            ds_res_mobile: storedUser.ds_res_mobile || '',
            country_code: storedUser.country_code || '',
            password: '',
            ds_profession: storedUser.user.ds_profession || ''
          });
          setToken(storedUser.token); // Set token for API requests
        } else {
          console.warn('No user data found in SimpleStore');
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImagePick = (imageType) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const { uri, fileName, type } = response.assets[0];
        const formData = new FormData();
        formData.append('file', {
          uri,
          name: fileName,
          type,
        });

        try {
          await axios.post('http://sarvail.net/wp-json/ds-custom_endpoints/v1/me', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          Alert.alert('Success', `${imageType === 'profile' ? 'Profile' : 'Background'} picture updated successfully`);
          // Optionally, refresh user data to reflect changes
        } catch (error) {
          console.error('Failed to update picture', error);
          Alert.alert('Error', 'Failed to update picture');
        }
      }
    });
  };

  const defaultImage = 'https://via.placeholder.com/150';

  if (loading) {
    return (
      <SafeAreaView className='bg-primary flex-1'>
        <View className='flex-1 justify-center items-center'>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}>
        <View>
          <Image
            source={{ uri: user?.user?.ds_profile_pic || defaultImage }}
            style={{ width: 80, height: 80 }}
            className="rounded-full mt-5 relative"
            resizeMode="cover"
          />
          <Image
            source={editIcon}
            style={{ width: 20, height: 20 }}
            resizeMode="cover"
            className='absolute top-20 bg-white left-16'
            onTouchEnd={() => handleImagePick('profile')}
          />
        </View>
        <Text className='text-white font-semibold text-lg my-2'>{form.first_name} {form.last_name}</Text>
        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({
            ...form,
            username: e
          })}
          otherStyles="mt-7"
          placeholder="Your unique username"
        />
        <FormField
          title="First Name"
          value={form.first_name}
          handleChangeText={(e) => setForm({
            ...form,
            first_name: e
          })}
          otherStyles="mt-7"
          placeholder="First Name"
        />
        <FormField
          title="Last Name"
          value={form.last_name}
          handleChangeText={(e) => setForm({
            ...form,
            last_name: e
          })}
          otherStyles="mt-7"
          placeholder="Last Name"
        />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({
            ...form,
            email: e
          })}
          otherStyles="mt-7"
          keyboardType='email-address'
          placeholder="Enter Email.."
        />
        <FormField
          title="Batch"
          value={form.ds_batch}
          handleChangeText={(e) => setForm({
            ...form,
            ds_batch: e
          })}
          otherStyles="mt-7"
          placeholder="Enter Batch.."
        />
        <FormField
          title="Profession"
          value={form.ds_profession}
          handleChangeText={(e) => setForm({
            ...form,
            ds_profession: e
          })}
          otherStyles="mt-7"
          placeholder="Enter your Profession.."
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }} className='mb-4'>
          <CustomButton
            title="Update"
            containerStyles="mt-7 px-5 min-h-[50px]"
          />
          <CustomButton
            title="Log Out"
            containerStyles="bg-white mt-7 px-5 py-2 min-h-[50px]"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
