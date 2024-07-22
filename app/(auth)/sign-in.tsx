import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import FormField from '@/components/FormField'

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setisSubmitting(true);

    try {
      // await signIn(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
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
          <Text className='text-slate-100 text-4xl italic font-semibold'>Sarvail</Text>
          <Text className='text-white text-xl italic'>Log in to Sarvail</Text>
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
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form,
              password: e
            })}
            otherStyles="mt-7"
            keyboardType='email-address'
            placeholder="Enter Password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className='justify-center pt-5 flex-row gap-1'>
            <Text className='text-lg text-gray-100 font-pregular'>Don't have account?</Text>
            <Link href="/sign-up" className='text-lg text-secondary font-pregular'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})