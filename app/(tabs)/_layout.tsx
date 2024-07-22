import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from "../../constants"

const TabLayout = () => {
  const TabIcon = ({ icon, color, name, focused, }) => {
    return (
      <View className='items-center justify-center gap-1'>
        <Image source={icon}
          resizeMode='contain'
          tintColor={color}
          className='w-6 h-6'
        />
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>{name}</Text>
      </View >
    )
  }
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#e6398a',
          tabBarInactiveTintColor: '#565756',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#050005',
            height: 84
          },
          headerShown: false
        }}


      >
        <Tabs.Screen name='home' options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='profile' options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          )
        }} />


      </Tabs>
    </>
  )
}

export default TabLayout
