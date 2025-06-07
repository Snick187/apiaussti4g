import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Star } from 'lucide-react-native';

interface DayCounterProps {
  cleanDays: number;
}

export default function DayCounter({ cleanDays }: DayCounterProps) {
  const getMilestoneInfo = (days: number) => {
    if (days >= 365) return { text: 'Ein ganzes Jahr!', color: '#8B5CF6', icon: Trophy };
    if (days >= 90) return { text: '3 Monate geschafft!', color: '#F59E0B', icon: Trophy };
    if (days >= 30) return { text: '1 Monat stark!', color: '#10B981', icon: Star };
    if (days >= 7) return { text: '1 Woche!', color: '#3B82F6', icon: Star };
    return { text: 'Jeden Tag zählt', color: '#6366F1', icon: Star };
  };

  const milestone = getMilestoneInfo(cleanDays);
  const IconComponent = milestone.icon;

  return (
    <View style={[styles.container, { borderColor: milestone.color }]}>
      <View style={styles.iconContainer}>
        <IconComponent size={32} color={milestone.color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.dayNumber}>{cleanDays}</Text>
        <Text style={styles.dayLabel}>Clean Days</Text>
        <Text style={[styles.milestone, { color: milestone.color }]}>
          {milestone.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 12,
  },
  content: {
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    lineHeight: 56,
  },
  dayLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  milestone: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});