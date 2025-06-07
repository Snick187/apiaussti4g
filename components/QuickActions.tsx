import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, CheckCircle, BookOpen, AlertTriangle } from 'lucide-react-native';

interface QuickActionsProps {
  onAddTask: () => void;
  onAddJournalEntry: () => void;
  onCheckMood: () => void;
  onEmergencyHelp: () => void;
}

export default function QuickActions({ 
  onAddTask, 
  onAddJournalEntry, 
  onCheckMood, 
  onEmergencyHelp 
}: QuickActionsProps) {
  const actions = [
    {
      title: 'Aufgabe hinzufügen',
      icon: Plus,
      color: '#3B82F6',
      onPress: onAddTask,
    },
    {
      title: 'Tagebuch',
      icon: BookOpen,
      color: '#10B981',
      onPress: onAddJournalEntry,
    },
    {
      title: 'Stimmung',
      icon: CheckCircle,
      color: '#8B5CF6',
      onPress: onCheckMood,
    },
    {
      title: 'Notfallhilfe',
      icon: AlertTriangle,
      color: '#EF4444',
      onPress: onEmergencyHelp,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schnellzugriff</Text>
      <View style={styles.grid}>
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.actionButton, { borderColor: action.color }]}
              onPress={action.onPress}
            >
              <IconComponent size={24} color={action.color} />
              <Text style={[styles.actionText, { color: action.color }]}>
                {action.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
    textAlign: 'center',
  },
});