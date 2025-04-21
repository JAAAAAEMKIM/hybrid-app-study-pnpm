import React from 'react';

import WebView from 'react-native-webview';

export default function TabLayout() {
  return (
    <WebView source={{ uri: 'http://192.168.0.8:3000' }} style={{ flex: 1 }} />
  );

  // return (
  //   <Tabs
  //     screenOptions={{
  //       tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
  //       headerShown: false,
  //       tabBarButton: HapticTab,
  //       tabBarBackground: TabBarBackground,
  //       tabBarStyle: Platform.select({
  //         ios: {
  //           // Use a transparent background on iOS to show the blur effect
  //           position: 'absolute',
  //         },
  //         default: {},
  //       }),
  //     }}
  //   >
  //     <Tabs.Screen
  //       name="index"
  //       options={{
  //         title: 'Home',
  //         tabBarIcon: ({ color }) => (
  //           <IconSymbol size={28} name="house.fill" color={color} />
  //         ),
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="explore"
  //       options={{
  //         title: 'Explore',
  //         tabBarIcon: ({ color }) => (
  //           <IconSymbol size={28} name="paperplane.fill" color={color} />
  //         ),
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="web"
  //       options={{
  //         title: 'Web',
  //         tabBarIcon: ({ color }) => (
  //           <IconSymbol size={28} name="paperplane.fill" color={color} />
  //         ),
  //       }}
  //     />
  //   </Tabs>
  // );
}
