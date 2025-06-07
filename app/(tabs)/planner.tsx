import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Plus, Check, X, Sun, Moon, Target } from 'lucide-react-native';
import SafeContainer from '@/components/SafeContainer';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: 'morning' | 'day' | 'evening';
}

export default function PlannerTab() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Meditation (10 Min)', completed: true, category: 'morning' },
    { id: '2', text: 'Gesundes Frühstück', completed: true, category: 'morning' },
    { id: '3', text: 'Spaziergang im Park', completed: false, category: 'day' },
    { id: '4', text: 'Freund anrufen', completed: false, category: 'day' },
    { id: '5', text: 'Tagebuch schreiben', completed: false, category: 'evening' },
    { id: '6', text: 'Entspannungsübung', completed: false, category: 'evening' },
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'morning' | 'day' | 'evening'>('day');
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        category: selectedCategory,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setShowAddTask(false);
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByCategory = (category: string) => 
    tasks.filter(task => task.category === category);

  const getCategoryProgress = (category: string) => {
    const categoryTasks = getTasksByCategory(category);
    const completedTasks = categoryTasks.filter(task => task.completed);
    return categoryTasks.length > 0 ? completedTasks.length / categoryTasks.length : 0;
  };

  const renderTaskCategory = (
    title: string, 
    category: 'morning' | 'day' | 'evening',
    icon: React.ReactNode,
    color: string
  ) => {
    const categoryTasks = getTasksByCategory(category);
    const progress = getCategoryProgress(category);

    return (
      <View style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <View style={styles.categoryTitleContainer}>
            <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
              {icon}
            </View>
            <Text style={styles.categoryTitle}>{title}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: color + '20' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { backgroundColor: color, width: `${progress * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {categoryTasks.filter(t => t.completed).length}/{categoryTasks.length}
            </Text>
          </View>
        </View>

        {categoryTasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                task.completed && styles.checkboxCompleted,
                task.completed && { backgroundColor: color }
              ]}
              onPress={() => toggleTask(task.id)}
            >
              {task.completed && <Check size={16} color="#FFFFFF" />}
            </TouchableOpacity>
            <Text style={[
              styles.taskText,
              task.completed && styles.taskTextCompleted
            ]}>
              {task.text}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(task.id)}
            >
              <X size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeContainer>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Tagesplaner</Text>
          <Text style={styles.subtitle}>
            {new Date().toLocaleDateString('de-DE', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* Daily Goals */}
        <View style={styles.goalsCard}>
          <View style={styles.goalsHeader}>
            <Target size={20} color="#8B5CF6" />
            <Text style={styles.goalsTitle}>Heutige Ziele</Text>
          </View>
          <Text style={styles.goalItem}>✓ 8 Stunden Schlaf</Text>
          <Text style={styles.goalItem}>✓ 3 Mahlzeiten</Text>
          <Text style={styles.goalItem}>• Mindestens 30 Min Bewegung</Text>
          <Text style={styles.goalItem}>• Positives Gespräch führen</Text>
        </View>

        {/* Task Categories */}
        {renderTaskCategory(
          'Morgenroutine', 
          'morning',
          <Sun size={16} color="#F59E0B" />,
          '#F59E0B'
        )}

        {renderTaskCategory(
          'Tagesaufgaben', 
          'day',
          <Target size={16} color="#3B82F6" />,
          '#3B82F6'
        )}

        {renderTaskCategory(
          'Abendroutine', 
          'evening',
          <Moon size={16} color="#8B5CF6" />,
          '#8B5CF6'
        )}

        {/* Add Task Section */}
        {showAddTask ? (
          <View style={styles.addTaskContainer}>
            <Text style={styles.addTaskTitle}>Neue Aufgabe hinzufügen</Text>
            <TextInput
              style={styles.taskInput}
              placeholder="Was möchtest du heute schaffen?"
              value={newTaskText}
              onChangeText={setNewTaskText}
              multiline
            />
            <View style={styles.categorySelector}>
              {[
                { key: 'morning', label: 'Morgen', color: '#F59E0B' },
                { key: 'day', label: 'Tag', color: '#3B82F6' },
                { key: 'evening', label: 'Abend', color: '#8B5CF6' },
              ].map(cat => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat.key && { backgroundColor: cat.color + '20' }
                  ]}
                  onPress={() => setSelectedCategory(cat.key as any)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === cat.key && { color: cat.color }
                  ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.addTaskActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddTask(false)}>
                <Text style={styles.cancelButtonText}>Abbrechen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>Hinzufügen</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => setShowAddTask(true)}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
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
  goalsCard: {
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
  goalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginLeft: 8,
  },
  goalItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    marginBottom: 6,
    lineHeight: 20,
  },
  categoryContainer: {
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
  categoryHeader: {
    marginBottom: 16,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxCompleted: {
    borderColor: 'transparent',
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 4,
  },
  addTaskContainer: {
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
  addTaskTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categorySelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  addTaskActions: {
    flexDirection: 'row',
    gap: 12,
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
  addButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});