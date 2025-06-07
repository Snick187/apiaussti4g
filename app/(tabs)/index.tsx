import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar, Clock, Heart, TrendingUp } from 'lucide-react-native';
import SafeContainer from '@/components/SafeContainer';
import DayCounter from '@/components/DayCounter';
import QuickActions from '@/components/QuickActions';

export default function HomeTab() {
  const [cleanDays] = useState(23); // This would come from AsyncStorage or a state management solution
  const [currentTime] = useState(new Date().toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }));

  const todayStats = {
    tasksCompleted: 4,
    totalTasks: 6,
    moodRating: 7,
    journalEntries: 1,
  };

  const handleAddTask = () => {
    Alert.alert('Aufgabe hinzufügen', 'Neue Aufgabe wird hinzugefügt...');
  };

  const handleAddJournalEntry = () => {
    Alert.alert('Tagebuch', 'Neuer Tagebucheintrag wird erstellt...');
  };

  const handleCheckMood = () => {
    Alert.alert('Stimmung tracken', 'Stimmungstracker wird geöffnet...');
  };

  const handleEmergencyHelp = () => {
    Alert.alert('Notfallhilfe', 'Sofortige Hilfe wird bereitgestellt...');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  };

  return (
    <SafeContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>Du schaffst das! Ein Tag nach dem anderen.</Text>
          <View style={styles.timeContainer}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.time}>{currentTime}</Text>
          </View>
        </View>

        {/* Clean Days Counter */}
        <DayCounter cleanDays={cleanDays} />

        {/* Today's Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Heute's Fortschritt</Text>
          <View style={styles.progressGrid}>
            <View style={styles.progressItem}>
              <View style={[styles.progressIcon, { backgroundColor: '#EBF8FF' }]}>
                <Calendar size={20} color="#3B82F6" />
              </View>
              <Text style={styles.progressValue}>{todayStats.tasksCompleted}/{todayStats.totalTasks}</Text>
              <Text style={styles.progressLabel}>Aufgaben</Text>
            </View>
            <View style={styles.progressItem}>
              <View style={[styles.progressIcon, { backgroundColor: '#F0FDF4' }]}>
                <Heart size={20} color="#10B981" />
              </View>
              <Text style={styles.progressValue}>{todayStats.moodRating}/10</Text>
              <Text style={styles.progressLabel}>Stimmung</Text>
            </View>
            <View style={styles.progressItem}>
              <View style={[styles.progressIcon, { backgroundColor: '#FEF3E2' }]}>
                <TrendingUp size={20} color="#F59E0B" />
              </View>
              <Text style={styles.progressValue}>{todayStats.journalEntries}</Text>
              <Text style={styles.progressLabel}>Einträge</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <QuickActions
          onAddTask={handleAddTask}
          onAddJournalEntry={handleAddJournalEntry}
          onCheckMood={handleCheckMood}
          onEmergencyHelp={handleEmergencyHelp}
        />

        {/* Daily Motivation */}
        <View style={styles.motivationCard}>
          <Text style={styles.cardTitle}>Tägliche Motivation</Text>
          <Text style={styles.quote}>
            "Jeder neue Tag ist eine neue Chance, die Person zu werden, die du sein möchtest."
          </Text>
          <Text style={styles.quoteAuthor}>— Unbekannt</Text>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsCard}>
          <Text style={styles.cardTitle}>Nächste Schritte</Text>
          <TouchableOpacity style={styles.nextStepItem}>
            <Text style={styles.nextStepText}>Abendroutine vervollständigen</Text>
            <Text style={styles.nextStepTime}>20:00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextStepItem}>
            <Text style={styles.nextStepText}>Tagebucheintrag schreiben</Text>
            <Text style={styles.nextStepTime}>21:00</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  time: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  motivationCard: {
    backgroundColor: '#FEF3E2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  quote: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'right',
  },
  nextStepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  nextStepItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  nextStepText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    flex: 1,
  },
  nextStepTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});