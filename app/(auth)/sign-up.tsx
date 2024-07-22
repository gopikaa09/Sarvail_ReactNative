import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import FormField from '@/components/FormField'
import CustomMobileField from '@/components/CustomMobileField'
const SignUp = () => {
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
  })
  0
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setisSubmitting(true);
    try {
      // const result = await createUser(form.email, form.password, form.username);
      // setUser(result);
      // setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full' >
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6 '>
          <Image source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px] mb-5'
          />
          <Text className='text-white text-2xl'>Sign up to Aora</Text>
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
          <CustomMobileField
            value={`${form.ds_batch},${form.country_code}`}
            handleChangeText={(e) => setForm({
              ...form,
              ds_res_mobile: e
            })}
            otherStyles="mt-7"
          // placeholder="Enter Batch.."
          />
          <FormField
            title="Profession"
            value={form.ds_batch}
            handleChangeText={(e) => setForm({
              ...form,
              ds_profession: e
            })}
            otherStyles="mt-7"
            placeholder="Enter your Profession.."
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form,
              password: e
            })}
            otherStyles="mt-7"
            placeholder="Enter Password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className='justify-center pt-5 flex-row gap-1 items-center'>
            <Text className='text-lg text-gray-100 font-pregular'>Already have an account ?</Text>
            <Link href="/sign-in" className='text-lg text-secondary font-pregular'>Login</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({})