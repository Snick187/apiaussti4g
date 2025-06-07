import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Phone, MessageCircle, Shield, Heart, Users, BookOpen, Headphones, ExternalLink } from 'lucide-react-native';
import SafeContainer from '@/components/SafeContainer';

interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  available: string;
}

interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: any;
}

export default function EmergencyTab() {
  const [emergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Sucht-Hotline',
      description: 'Kostenlose bundesweite Beratung',
      phone: '+49 180 365 24 07',
      available: '24/7',
    },
    {
      id: '2',
      name: 'Telefonseelsorge',
      description: 'Vertrauliche Gespräche in Krisen',
      phone: '0800 111 0 111',
      available: '24/7',
    },
    {
      id: '3',
      name: 'Krisendienst Bayern',
      description: 'Professionelle Krisenintervention',
      phone: '0800 655 3000',
      available: '24/7',
    },
    {
      id: '4',
      name: 'Nummer gegen Kummer',
      description: 'Beratungstelefon für alle Altersgruppen',
      phone: '116 117',
      available: 'Mo-Sa 14-20 Uhr',
    },
  ]);

  const [copingStrategies] = useState<CopingStrategy[]>([
    {
      id: '1',
      title: 'Atemübung 4-7-8',
      description: 'Atme 4 Sekunden ein, halte 7 Sekunden, atme 8 Sekunden aus. Wiederhole 4x.',
      duration: '2 Min',
      icon: Heart,
    },
    {
      id: '2',
      title: 'Kälteschock',
      description: 'Halte Eiswürfel oder wasche dein Gesicht mit kaltem Wasser.',
      duration: '1 Min',
      icon: Shield,
    },
    {
      id: '3',
      title: '5-4-3-2-1 Technik',
      description: 'Benenne 5 Dinge die du siehst, 4 die du hörst, 3 die du fühlst, 2 die du riechst, 1 das du schmeckst.',
      duration: '3 Min',
      icon: Users,
    },
    {
      id: '4',
      title: 'Progressive Muskelentspannung',
      description: 'Spanne für 5 Sekunden verschiedene Muskelgruppen an und entspanne dann.',
      duration: '10 Min',
      icon: Headphones,
    },
  ]);

  const makePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Fehler', 'Telefonfunktion nicht verfügbar');
        }
      })
      .catch(() => Alert.alert('Fehler', 'Anruf konnte nicht getätigt werden'));
  };

  const openWebsite = (url: string) => {
    Linking.openURL(url).catch(() => 
      Alert.alert('Fehler', 'Website konnte nicht geöffnet werden')
    );
  };

  return (
    <SafeContainer backgroundColor="#FEF2F2">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Notfallhilfe</Text>
          <Text style={styles.subtitle}>Du bist nicht allein. Hier findest du sofortige Hilfe.</Text>
        </View>

        {/* Emergency Action Button */}
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => makePhoneCall('0800 111 0 111')}
        >
          <Shield size={24} color="#FFFFFF" />
          <Text style={styles.emergencyButtonText}>SOFORT HILFE</Text>
          <Text style={styles.emergencyButtonSubtext}>Telefonseelsorge: 0800 111 0 111</Text>
        </TouchableOpacity>

        {/* Crisis Message */}
        <View style={styles.crisisCard}>
          <Text style={styles.crisisTitle}>In einer akuten Krise?</Text>
          <Text style={styles.crisisText}>
            Das Verlangen geht vorbei. Du hast schon so viel geschafft. 
            Nutze die Strategien unten oder rufe sofort Hilfe.
          </Text>
          <Text style={styles.crisisReminder}>
            Notfall (Lebensgefahr): 112
          </Text>
        </View>

        {/* Quick Coping Strategies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sofort-Strategien</Text>
          <Text style={styles.sectionSubtitle}>Schnelle Hilfe bei akutem Verlangen</Text>
          
          {copingStrategies.map(strategy => {
            const IconComponent = strategy.icon;
            return (
              <TouchableOpacity key={strategy.id} style={styles.strategyCard}>
                <View style={styles.strategyHeader}>
                  <View style={styles.strategyIcon}>
                    <IconComponent size={20} color="#3B82F6" />
                  </View>
                  <View style={styles.strategyInfo}>
                    <Text style={styles.strategyTitle}>{strategy.title}</Text>
                    <Text style={styles.strategyDuration}>{strategy.duration}</Text>
                  </View>
                </View>
                <Text style={styles.strategyDescription}>{strategy.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notfall-Kontakte</Text>
          <Text style={styles.sectionSubtitle}>Professionelle Hilfe rund um die Uhr</Text>
          
          {emergencyContacts.map(contact => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactDescription}>{contact.description}</Text>
                <Text style={styles.contactAvailable}>{contact.available}</Text>
              </View>
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => makePhoneCall(contact.phone)}
              >
                <Phone size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weitere Ressourcen</Text>
          
          <TouchableOpacity 
            style={styles.resourceCard}
            onPress={() => openWebsite('https://www.drogenberatung.de')}
          >
            <View style={styles.resourceIcon}>
              <BookOpen size={20} color="#10B981" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Online-Beratung</Text>
              <Text style={styles.resourceDescription}>Chat und E-Mail Beratung</Text>
            </View>
            <ExternalLink size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resourceCard}
            onPress={() => openWebsite('https://www.selbsthilfe.de')}
          >
            <View style={styles.resourceIcon}>
              <Users size={20} color="#8B5CF6" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Selbsthilfegruppen</Text>
              <Text style={styles.resourceDescription}>Gruppen in deiner Nähe finden</Text>
            </View>
            <ExternalLink size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resourceCard}
            onPress={() => openWebsite('https://www.therapie.de')}
          >
            <View style={styles.resourceIcon}>
              <MessageCircle size={20} color="#F59E0B" />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>Therapie finden</Text>
              <Text style={styles.resourceDescription}>Therapeuten in deiner Region</Text>
            </View>
            <ExternalLink size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Safety Plan */}
        <View style={styles.safetyPlan}>
          <Text style={styles.safetyTitle}>Dein Sicherheitsplan</Text>
          <View style={styles.safetyStep}>
            <Text style={styles.safetyStepNumber}>1.</Text>
            <Text style={styles.safetyStepText}>Erkenne die Warnsignale früh</Text>
          </View>
          <View style={styles.safetyStep}>
            <Text style={styles.safetyStepNumber}>2.</Text>
            <Text style={styles.safetyStepText}>Verlasse sofort die Situation</Text>
          </View>
          <View style={styles.safetyStep}>
            <Text style={styles.safetyStepNumber}>3.</Text>
            <Text style={styles.safetyStepText}>Wende eine Bewältigungsstrategie an</Text>
          </View>
          <View style={styles.safetyStep}>
            <Text style={styles.safetyStepNumber}>4.</Text>
            <Text style={styles.safetyStepText}>Kontaktiere Unterstützung</Text>
          </View>
          <View style={styles.safetyStep}>
            <Text style={styles.safetyStepNumber}>5.</Text>
            <Text style={styles.safetyStepText}>Professionelle Hilfe holen</Text>
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
  emergencyButton: {
    backgroundColor: '#EF4444',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  emergencyButtonSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FECACA',
  },
  crisisCard: {
    backgroundColor: '#FEF3E2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  crisisTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 8,
  },
  crisisText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  crisisReminder: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#EF4444',
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
  strategyCard: {
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
  strategyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  strategyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  strategyInfo: {
    flex: 1,
  },
  strategyTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  strategyDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  strategyDescription: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    lineHeight: 18,
  },
  contactCard: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    marginBottom: 2,
  },
  contactAvailable: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceCard: {
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
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  resourceDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  safetyPlan: {
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
  safetyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  safetyStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  safetyStepNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
    width: 20,
    marginRight: 8,
  },
  safetyStepText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    flex: 1,
    lineHeight: 20,
  },
});