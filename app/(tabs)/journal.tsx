import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { BookOpen, Plus, Edit3, Smile, Meh, Frown, Heart, Star, Calendar } from 'lucide-react-native';
import SafeContainer from '@/components/SafeContainer';

interface JournalEntry {
  id: string;
  date: string;
  mood: number; // 1-10
  title: string;
  content: string;
  gratitude: string[];
  challenges: string;
  improvements: string;
}

export default function JournalTab() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      mood: 7,
      title: 'Ein guter Tag',
      content: 'Heute war ein stabiler Tag. Habe meine Morgenroutine eingehalten und mich produktiv gefühlt.',
      gratitude: ['Sonnenschein', 'Unterstützung der Familie', 'Gesunde Mahlzeit'],
      challenges: 'Kurzer Moment von Unruhe am Nachmittag',
      improvements: 'Mehr Zeit für Entspannung einplanen',
    },
    {
      id: '2',
      date: '2024-01-14',
      mood: 5,
      title: 'Herausfordernder Tag',
      content: 'Hatte heute mit einigen schwierigen Gefühlen zu kämpfen, aber ich habe es geschafft.',
      gratitude: ['Therapiegespräch', 'Freund hat angerufen'],
      challenges: 'Starkes Verlangen am Vormittag',
      improvements: 'Ablenkungsstrategien früher anwenden',
    },
  ]);

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood: 5,
    title: '',
    content: '',
    gratitude: '',
    challenges: '',
    improvements: '',
  });

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return { icon: Smile, color: '#10B981' };
    if (mood >= 6) return { icon: Meh, color: '#F59E0B' };
    return { icon: Frown, color: '#EF4444' };
  };

  const getMoodText = (mood: number) => {
    if (mood >= 9) return 'Ausgezeichnet';
    if (mood >= 7) return 'Gut';
    if (mood >= 5) return 'Okay';
    if (mood >= 3) return 'Schwierig';
    return 'Sehr schwer';
  };

  const saveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      Alert.alert('Fehler', 'Bitte fülle Titel und Inhalt aus.');
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: newEntry.mood,
      title: newEntry.title.trim(),
      content: newEntry.content.trim(),
      gratitude: newEntry.gratitude.split(',').map(item => item.trim()).filter(item => item),
      challenges: newEntry.challenges.trim(),
      improvements: newEntry.improvements.trim(),
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      mood: 5,
      title: '',
      content: '',
      gratitude: '',
      challenges: '',
      improvements: '',
    });
    setShowNewEntry(false);
    Alert.alert('Erfolg', 'Tagebucheintrag wurde gespeichert!');
  };

  const renderMoodSelector = () => (
    <View style={styles.moodSelector}>
      <Text style={styles.inputLabel}>Wie fühlst du dich heute? ({newEntry.mood}/10)</Text>
      <View style={styles.moodScale}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
          <TouchableOpacity
            key={value}
            style={[
              styles.moodButton,
              newEntry.mood === value && styles.moodButtonSelected
            ]}
            onPress={() => setNewEntry({ ...newEntry, mood: value })}
          >
            <Text style={[
              styles.moodButtonText,
              newEntry.mood === value && styles.moodButtonTextSelected
            ]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.moodDescription}>{getMoodText(newEntry.mood)}</Text>
    </View>
  );

  if (showNewEntry) {
    return (
      <SafeContainer>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Neuer Tagebucheintrag</Text>
            <Text style={styles.subtitle}>
              {new Date().toLocaleDateString('de-DE', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>

          <View style={styles.entryForm}>
            {renderMoodSelector()}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titel</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Wie würdest du diesen Tag beschreiben?"
                value={newEntry.title}
                onChangeText={(text) => setNewEntry({ ...newEntry, title: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Deine Gedanken</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Was ist heute passiert? Wie hast du dich gefühlt?"
                value={newEntry.content}
                onChangeText={(text) => setNewEntry({ ...newEntry, content: text })}
                multiline
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dankbarkeit</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Wofür bist du heute dankbar? (mit Komma trennen)"
                value={newEntry.gratitude}
                onChangeText={(text) => setNewEntry({ ...newEntry, gratitude: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Herausforderungen</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Was war heute schwierig?"
                value={newEntry.challenges}
                onChangeText={(text) => setNewEntry({ ...newEntry, challenges: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Verbesserungen</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Was könntest du morgen anders machen?"
                value={newEntry.improvements}
                onChangeText={(text) => setNewEntry({ ...newEntry, improvements: text })}
              />
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowNewEntry(false)}
              >
                <Text style={styles.cancelButtonText}>Abbrechen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
                <Text style={styles.saveButtonText}>Speichern</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeContainer>
    );
  }

  return (
    <SafeContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Tagebuch</Text>
          <Text style={styles.subtitle}>Deine persönlichen Reflexionen</Text>
        </View>

        {/* Quick Mood Check */}
        <View style={styles.quickMoodCard}>
          <Text style={styles.quickMoodTitle}>Wie geht es dir gerade?</Text>
          <View style={styles.quickMoodButtons}>
            {[
              { mood: 8, icon: Smile, color: '#10B981', label: 'Gut' },
              { mood: 5, icon: Meh, color: '#F59E0B', label: 'Okay' },
              { mood: 2, icon: Frown, color: '#EF4444', label: 'Schwer' }
            ].map(({ mood, icon: Icon, color, label }) => (
              <TouchableOpacity key={mood} style={styles.quickMoodButton}>
                <Icon size={24} color={color} />
                <Text style={[styles.quickMoodLabel, { color }]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Journal Entries */}
        <View style={styles.entriesHeader}>
          <Text style={styles.entriesTitle}>Meine Einträge</Text>
          <TouchableOpacity 
            style={styles.addEntryButton}
            onPress={() => setShowNewEntry(true)}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addEntryText}>Schreiben</Text>
          </TouchableOpacity>
        </View>

        {entries.map(entry => {
          const moodInfo = getMoodIcon(entry.mood);
          const MoodIcon = moodInfo.icon;
          return (
            <View key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <View style={styles.entryMeta}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.entryDate}>
                    {new Date(entry.date).toLocaleDateString('de-DE', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </Text>
                </View>
                <View style={styles.entryMoodContainer}>
                  <MoodIcon size={16} color={moodInfo.color} />
                  <Text style={[styles.entryMood, { color: moodInfo.color }]}>
                    {entry.mood}/10
                  </Text>
                </View>
              </View>

              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryContent} numberOfLines={3}>
                {entry.content}
              </Text>

              {entry.gratitude.length > 0 && (
                <View style={styles.gratitudeSection}>
                  <Heart size={14} color="#F472B6" />
                  <Text style={styles.gratitudeText}>
                    {entry.gratitude.slice(0, 2).join(', ')}
                    {entry.gratitude.length > 2 && '...'}
                  </Text>
                </View>
              )}

              <TouchableOpacity style={styles.readMoreButton}>
                <Edit3 size={16} color="#3B82F6" />
                <Text style={styles.readMoreText}>Vollständig lesen</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Statistics */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Deine Statistiken</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{entries.length}</Text>
              <Text style={styles.statLabel}>Einträge</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.round(entries.reduce((sum, e) => sum + e.mood, 0) / entries.length)}
              </Text>
              <Text style={styles.statLabel}>Ø Stimmung</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Tage Streak</Text>
            </View>
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
  quickMoodCard: {
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
  quickMoodTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickMoodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickMoodButton: {
    alignItems: 'center',
    padding: 12,
  },
  quickMoodLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 4,
  },
  entriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  entriesTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  addEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addEntryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 6,
  },
  entryMoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryMood: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  entryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  entryContent: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  gratitudeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gratitudeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#F472B6',
    marginLeft: 6,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    marginLeft: 4,
  },
  statsCard: {
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
  statsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  entryForm: {
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
  moodSelector: {
    marginBottom: 24,
  },
  moodScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  moodButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  moodButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  moodButtonTextSelected: {
    color: '#FFFFFF',
  },
  moodDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
});