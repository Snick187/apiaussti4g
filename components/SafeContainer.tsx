import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export default function SafeContainer({ children, backgroundColor = '#F8FAFC' }: SafeContainerProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});