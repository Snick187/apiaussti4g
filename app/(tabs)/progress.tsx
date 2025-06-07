import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { TrendingUp, Calendar, BarChart3, Award, AlertTriangle, Target, ChevronRight } from 'lucide-react-native';
import SafeContainer from '@/components/SafeContainer';

interface ProgressData {
  date: string;
  mood: number;
  cravings: number;
  activities: number;
}

interface RelapseTrigger {
  id: string;
  name: string;
  frequency: number;
  lastOccurrence: string;
  risk: 'low' | 'medium' | 'high';
}

export default function ProgressTab() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  
  const [progressData] = useState<ProgressData[]>([
    { date: '2024-01-01', mood: 6, cravings: 3, activities: 4 },
    { date: '2024-01-02', mood: 7, cravings: 2, activities: 5 },
    { date: '2024-01-03', mood: 5, cravings: 4, activities: 3 },
    { date: '2024-01-04', mood: 8, cravings: 1, activities: 6 },
    { date: '2024-01-05', mood: 7, cravings: 2, activities: 5 },
    { date: '2024-01-06', mood: 6, cravings: 3, activities: 4 },
    { date: '2024-01-07', mood: 9, cravings: 1, activities: 7 },
  ]);

  const [relapseTriggers] = useState<RelapseTrigger[]>([
    {
      id: '1',
      name: 'Stress bei der Arbeit',
      frequency: 15,
      lastOccurrence: '2024-01-10',
      risk: 'high',
    },
    {
      id: '2',
      name: 'Soziale Isolation',
      frequency: 8,
      lastOccurrence: '2024-01-08',
      risk: 'medium',
    },
    {
      id: '3',
      name: 'Müdigkeit/Schlafmangel',
      frequency: 12,
      lastOccurrence: '2024-01-12',
      risk: 'high',
    },
    {
      id: '4',
      name: 'Bestimmte Orte',
      frequency: 3,
      lastOccurrence: '2024-01-05',
      risk: 'low',
    },
  ]);

  const achievements = [
    { title: 'Erste Woche', description: '7 Tage clean', completed: true, date: '2024-01-08' },
    { title: 'Erster Monat', description: '30 Tage clean', completed: false, progress: 76 },
    { title: 'Routine-Meister', description: '14 Tage Morgenroutine', completed: true, date: '2024-01-14' },
    { title: 'Tagebuch-Held', description: '20 Einträge geschrieben', completed: true, date: '2024-01-12' },
    { title: 'Fitness-Starter', description: '10 Workout-Sessions', completed: false, progress: 60 },
  ];

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 80;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getAverageMood = () => {
    const total = progressData.reduce((sum, data) => sum + data.mood, 0);
    return (total / progressData.length).toFixed(1);
  };

  const getAverageCravings = () => {
    const total = progressData.reduce((sum, data) => sum + data.cravings, 0);
    return (total / progressData.length).toFixed(1);
  };

  const renderMoodChart = () => {
    const maxMood = 10;
    const chartHeight = 120;
    const barWidth = chartWidth / progressData.length - 8;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Stimmungsverlauf (letzte 7 Tage)</Text>
        <View style={[styles.chart, { height: chartHeight, width: chartWidth }]}>
          {progressData.map((data, index) => {
            const barHeight = (data.mood / maxMood) * (chartHeight - 20);
            return (
              <View key={index} style={styles.barContainer}>
                <View 
                  style={[
                    styles.moodBar,
                    {
                      height: barHeight,
                      width: barWidth,
                      backgroundColor: data.mood >= 7 ? '#10B981' : data.mood >= 5 ? '#F59E0B' : '#EF4444'
                    }
                  ]}
                />
                <Text style={styles.barLabel}>
                  {new Date(data.date).getDate()}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Fortschritt</Text>
          <Text style={styles.subtitle}>Verfolge deine Entwicklung</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {[
            { key: '7d', label: '7 Tage' },
            { key: '30d', label: '30 Tage' },
            { key: '90d', label: '90 Tage' },
          ].map(period => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.key as any)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.periodButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <TrendingUp size={20} color="#10B981" />
            </View>
            <Text style={styles.metricValue}>{getAverageMood()}</Text>
            <Text style={styles.metricLabel}>Ø Stimmung</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <AlertTriangle size={20} color="#F59E0B" />
            </View>
            <Text style={styles.metricValue}>{getAverageCravings()}</Text>
            <Text style={styles.metricLabel}>Ø Verlangen</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Target size={20} color="#3B82F6" />
            </View>
            <Text style={styles.metricValue}>85%</Text>
            <Text style={styles.metricLabel}>Ziel-Rate</Text>
          </View>
        </View>

        {/* Mood Chart */}
        {renderMoodChart()}

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Erfolge</Text>
          <Text style={styles.sectionSubtitle}>Deine erreichten Meilensteine</Text>

          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <View style={styles.achievementContent}>
                <View style={styles.achievementIcon}>
                  <Award 
                    size={20} 
                    color={achievement.completed ? '#F59E0B' : '#D1D5DB'} 
                    fill={achievement.completed ? '#F59E0B' : 'transparent'}
                  />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  {achievement.completed ? (
                    <Text style={styles.achievementDate}>
                      Erreicht am {new Date(achievement.date!).toLocaleDateString('de-DE')}
                    </Text>
                  ) : (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBarContainer}>
                        <View 
                          style={[
                            styles.progressBarFill,
                            { width: `${achievement.progress}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>{achievement.progress}%</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Relapse Risk Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rückfall-Risiko Analyse</Text>
          <Text style={styles.sectionSubtitle}>Erkenne deine Trigger-Muster</Text>

          {relapseTriggers.map(trigger => (
            <TouchableOpacity key={trigger.id} style={styles.triggerCard}>
              <View style={styles.triggerContent}>
                <View style={styles.triggerInfo}>
                  <Text style={styles.triggerName}>{trigger.name}</Text>
                  <Text style={styles.triggerFrequency}>
                    {trigger.frequency}x in letzten 30 Tagen
                  </Text>
                  <Text style={styles.triggerLastSeen}>
                    Zuletzt: {new Date(trigger.lastOccurrence).toLocaleDateString('de-DE')}
                  </Text>
                </View>
                <View style={styles.triggerRisk}>
                  <View style={[
                    styles.riskIndicator,
                    { backgroundColor: getRiskColor(trigger.risk) }
                  ]} />
                  <Text style={[
                    styles.riskText,
                    { color: getRiskColor(trigger.risk) }
                  ]}>
                    {trigger.risk === 'high' ? 'Hoch' : trigger.risk === 'medium' ? 'Mittel' : 'Niedrig'}
                  </Text>
                </View>
              </View>
              <ChevronRight size={16} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Weekly Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wöchentliche Zusammenfassung</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tagebucheinträge</Text>
              <Text style={styles.summaryValue}>6/7</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Aufgaben erledigt</Text>
              <Text style={styles.summaryValue}>18/21</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Notfall-Strategien</Text>
              <Text style={styles.summaryValue}>3x</Text>
            </View>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>💡 Erkenntnisse</Text>
          <Text style={styles.insightsText}>
            Deine Stimmung ist am stabilsten, wenn du deine Morgenroutine einhältst. 
            Versuche auch an schweren Tagen mindestens die ersten 3 Schritte zu machen.
          </Text>
          <Text style={styles.insightsText}>
            Stress bei der Arbeit ist dein häufigster Trigger. Plane bewusst Pausen 
            und Entspannungsübungen in deinen Arbeitsalltag ein.
          </Text>
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
    paddingTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#1F2937',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barContainer: {
    alignItems: 'center',
  },
  moodBar: {
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginRight: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    width: 30,
  },
  triggerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  triggerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  triggerInfo: {
    flex: 1,
  },
  triggerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  triggerFrequency: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 1,
  },
  triggerLastSeen: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  triggerRisk: {
    alignItems: 'center',
    marginRight: 8,
  },
  riskIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  riskText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  insightsCard: {
    backgroundColor: '#FEF3E2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  insightsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 12,
  },
  insightsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
});