import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Heart, Star, Plus, Quote, Target, Trophy, Sparkles, ChevronRight } from 'lucide-react-native';
import SafeContainer from '@/components/SafeContainer';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: 'motivation' | 'strength' | 'hope';
}

interface PersonalReason {
  id: string;
  text: string;
  important: boolean;
}

interface SuccessStory {
  id: string;
  title: string;
  excerpt: string;
  days: number;
  category: string;
}

export default function MotivationTab() {
  const [personalReasons, setPersonalReasons] = useState<PersonalReason[]>([
    { id: '1', text: 'Für meine Familie da sein', important: true },
    { id: '2', text: 'Meine Gesundheit wiederherstellen', important: true },
    { id: '3', text: 'Meine Träume verwirklichen', important: false },
    { id: '4', text: 'Ein Vorbild sein', important: false },
  ]);

  const [quotes] = useState<Quote[]>([
    {
      id: '1',
      text: 'Du bist stärker als du denkst und mutiger als du fühlst.',
      author: 'Unbekannt',
      category: 'strength',
    },
    {
      id: '2',
      text: 'Jeder neue Tag ist eine neue Chance, die Person zu werden, die du sein möchtest.',
      author: 'Unbekannt',
      category: 'motivation',
    },
    {
      id: '3',
      text: 'Heilung ist nicht linear. Aber jeder kleine Schritt zählt.',
      author: 'Recovery Community',
      category: 'hope',
    },
    {
      id: '4',
      text: 'Du hast schon so viele schwere Tage überstanden. Du schaffst auch diesen.',
      author: 'Unbekannt',
      category: 'strength',
    },
  ]);

  const [successStories] = useState<SuccessStory[]>([
    {
      id: '1',
      title: 'Markus - 180 Tage Clean',
      excerpt: 'Nach drei Rückfällen habe ich endlich den Weg gefunden, der für mich funktioniert...',
      days: 180,
      category: 'Langzeiterfolg',
    },
    {
      id: '2',
      title: 'Anna - Zurück ins Leben',
      excerpt: 'Die ersten 30 Tage waren die härtesten meines Lebens, aber es hat sich gelohnt...',
      days: 95,
      category: 'Neuanfang',
    },
    {
      id: '3',
      title: 'Tom - Karriere und Familie',
      excerpt: 'Heute kann ich sagen: Ich habe mein Leben zurück und bin glücklicher denn je...',
      days: 365,
      category: 'Lebenswandel',
    },
  ]);

  const [newReason, setNewReason] = useState('');
  const [showAddReason, setShowAddReason] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const addPersonalReason = () => {
    if (newReason.trim()) {
      const reason: PersonalReason = {
        id: Date.now().toString(),
        text: newReason.trim(),
        important: false,
      };
      setPersonalReasons([...personalReasons, reason]);
      setNewReason('');
      setShowAddReason(false);
      Alert.alert('Erfolg', 'Dein persönlicher Grund wurde hinzugefügt!');
    }
  };

  const toggleImportant = (reasonId: string) => {
    setPersonalReasons(personalReasons.map(reason => 
      reason.id === reasonId ? { ...reason, important: !reason.important } : reason
    ));
  };

  const getNextQuote = () => {
    setCurrentQuoteIndex((currentQuoteIndex + 1) % quotes.length);
  };

  const currentQuote = quotes[currentQuoteIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'motivation': return '#3B82F6';
      case 'strength': return '#10B981';
      case 'hope': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <SafeContainer backgroundColor="#FEF7ED">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Motivation</Text>
          <Text style={styles.subtitle}>Finde Kraft für deinen Weg</Text>
        </View>

        {/* Daily Quote */}
        <View style={styles.quoteCard}>
          <View style={styles.quoteHeader}>
            <Quote size={20} color={getCategoryColor(currentQuote.category)} />
            <Text style={styles.quoteCategory}>Tägliche Inspiration</Text>
            <TouchableOpacity onPress={getNextQuote}>
              <Sparkles size={20} color="#F59E0B" />
            </TouchableOpacity>
          </View>
          <Text style={styles.quoteText}>"{currentQuote.text}"</Text>
          <Text style={styles.quoteAuthor}>— {currentQuote.author}</Text>
        </View>

        {/* Personal Reasons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meine Gründe</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddReason(true)}
            >
              <Plus size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>Warum ist dein Ausstieg wichtig?</Text>

          {personalReasons.map(reason => (
            <TouchableOpacity 
              key={reason.id} 
              style={styles.reasonCard}
              onPress={() => toggleImportant(reason.id)}
            >
              <View style={styles.reasonContent}>
                <Text style={[
                  styles.reasonText,
                  reason.important && styles.reasonTextImportant
                ]}>
                  {reason.text}
                </Text>
                <TouchableOpacity onPress={() => toggleImportant(reason.id)}>
                  <Star 
                    size={20} 
                    color={reason.important ? '#F59E0B' : '#D1D5DB'}
                    fill={reason.important ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {showAddReason && (
            <View style={styles.addReasonContainer}>
              <TextInput
                style={styles.reasonInput}
                placeholder="Was motiviert dich am meisten?"
                value={newReason}
                onChangeText={setNewReason}
                multiline
              />
              <View style={styles.addReasonActions}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setShowAddReason(false)}
                >
                  <Text style={styles.cancelButtonText}>Abbrechen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={addPersonalReason}>
                  <Text style={styles.saveButtonText}>Hinzufügen</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Success Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Erfolgsgeschichten</Text>
          <Text style={styles.sectionSubtitle}>Inspiration von anderen</Text>

          {successStories.map(story => (
            <TouchableOpacity key={story.id} style={styles.storyCard}>
              <View style={styles.storyHeader}>
                <View style={styles.storyMeta}>
                  <Trophy size={16} color="#F59E0B" />
                  <Text style={styles.storyDays}>{story.days} Tage</Text>
                  <Text style={styles.storyCategory}>{story.category}</Text>
                </View>
                <ChevronRight size={16} color="#6B7280" />
              </View>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storyExcerpt}>{story.excerpt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Milestone Rewards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meilenstein-Belohnungen</Text>
          <Text style={styles.sectionSubtitle}>Plane deine Belohnungen</Text>

          <View style={styles.milestoneCard}>
            <View style={styles.milestoneHeader}>
              <Target size={20} color="#8B5CF6" />
              <Text style={styles.milestoneTitle}>30 Tage Clean</Text>
            </View>
            <Text style={styles.milestoneReward}>🎯 Neues Hobby beginnen</Text>
            <View style={styles.milestoneProgress}>
              <View style={[styles.progressBar, { width: '76%' }]} />
            </View>
            <Text style={styles.milestoneText}>23 von 30 Tagen (76%)</Text>
          </View>

          <View style={styles.milestoneCard}>
            <View style={styles.milestoneHeader}>
              <Target size={20} color="#10B981" />
              <Text style={styles.milestoneTitle}>90 Tage Clean</Text>
            </View>
            <Text style={styles.milestoneReward}>🌟 Wellness-Wochenende</Text>
            <View style={styles.milestoneProgress}>
              <View style={[styles.progressBar, { width: '26%' }]} />
            </View>
            <Text style={styles.milestoneText}>23 von 90 Tagen (26%)</Text>
          </View>

          <View style={styles.milestoneCard}>
            <View style={styles.milestoneHeader}>
              <Target size={20} color="#F59E0B" />
              <Text style={styles.milestoneTitle}>1 Jahr Clean</Text>
            </View>
            <Text style={styles.milestoneReward}>🏆 Traumreise verwirklichen</Text>
            <View style={styles.milestoneProgress}>
              <View style={[styles.progressBar, { width: '6%' }]} />
            </View>
            <Text style={styles.milestoneText}>23 von 365 Tagen (6%)</Text>
          </View>
        </View>

        {/* Weekly Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wochenziele</Text>
          <Text style={styles.sectionSubtitle}>Kleine Schritte, große Wirkung</Text>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Heart size={16} color="#10B981" />
              <Text style={styles.goalTitle}>Selbstfürsorge</Text>
              <Text style={styles.goalStatus}>4/7 Tage</Text>
            </View>
            <Text style={styles.goalDescription}>Täglich 10 Minuten Meditation</Text>
          </View>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Heart size={16} color="#3B82F6" />
              <Text style={styles.goalTitle}>Soziale Kontakte</Text>
              <Text style={styles.goalStatus}>2/3 mal</Text>
            </View>
            <Text style={styles.goalDescription}>Freunde oder Familie kontaktieren</Text>
          </View>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <Heart size={16} color="#8B5CF6" />
              <Text style={styles.goalTitle}>Kreativität</Text>
              <Text style={styles.goalStatus}>1/2 Stunden</Text>
            </View>
            <Text style={styles.goalDescription}>Zeit für ein Hobby einplanen</Text>
          </View>
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
  quoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteCategory: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  quoteText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'right',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    flex: 1,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  addButton: {
    padding: 4,
  },
  reasonCard: {
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
  reasonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reasonText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    flex: 1,
    marginRight: 12,
  },
  reasonTextImportant: {
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  addReasonContainer: {
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
  reasonInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginBottom: 12,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  addReasonActions: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  storyCard: {
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
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyDays: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
    marginLeft: 4,
    marginRight: 8,
  },
  storyCategory: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  storyTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  storyExcerpt: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 16,
  },
  milestoneCard: {
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
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  milestoneReward: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
    marginBottom: 8,
  },
  milestoneProgress: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  milestoneText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  goalCard: {
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
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  goalStatus: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#10B981',
  },
  goalDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 24,
  },
});