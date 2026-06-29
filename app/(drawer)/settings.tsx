import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { profile } from '@/data/profile';
import { useColorScheme } from '@/hooks/use-color-scheme';

const preferenceItems = [
  { icon: 'notifications-outline', label: 'Notifications & Sounds', tint: '#EF4444' },
  { icon: 'moon-outline', label: 'Dark Mode', tint: '#4B5563' },
  { icon: 'cellular-outline', label: 'Data Saver', tint: '#22C55E' },
] as const;

const accountItems = [
  { icon: 'person-outline', label: 'Account Settings', tint: '#9CA3AF' },
  { icon: 'warning-outline', label: 'Report Technical Problem', tint: '#F59E0B' },
  { icon: 'document-text-outline', label: 'Legal & Policies', tint: '#9CA3AF' },
] as const;

const profileItems = [
  { icon: 'pulse-outline', label: profile.status, tint: '#16A34A' },
  { icon: 'at-outline', label: profile.username, tint: '#4B5563' },
] as const;

function StaticRow({
  icon,
  label,
  tint,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  tint: string;
  colors: { text: string; icon: string };
}) {
  return (
    <View style={styles.optionRow}>
      <View style={[styles.optionDot, { backgroundColor: tint }]} />
      <ThemedText style={[styles.optionLabel, { color: colors.text }]}>{label}</ThemedText>
      <Ionicons name={icon} size={18} color={colors.icon} />
    </View>
  );
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces>
        <View style={[styles.headerCard, { borderColor: colors.icon + '22', backgroundColor: colors.icon + '10' }]}>
          <View style={styles.headerTopRow}>
            <View style={styles.avatarWrap}>
              <Avatar name={profile.name} color={colors.tint} size={86} online={profile.active} />
            </View>
            <View style={styles.headerText}>
              <ThemedText type="title">Profile</ThemedText>
              <View style={styles.statusRow}>
                <View style={[styles.statusPill, { backgroundColor: profile.active ? '#16A34A' : '#6B7280' }]}>
                  <ThemedText style={styles.statusText}>{profile.status}</ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.username, { color: colors.icon }]}>{profile.username}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: colors.icon }]}>Profile</ThemedText>
          <View style={styles.optionList}>
            {profileItems.map((item) => (
              <StaticRow key={item.label} icon={item.icon} label={item.label} tint={item.tint} colors={colors} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: colors.icon }]}>Preferences</ThemedText>
          <View style={styles.optionList}>
            {preferenceItems.map((item) => (
              <StaticRow key={item.label} icon={item.icon} label={item.label} tint={item.tint} colors={colors} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: colors.icon }]}>Account & Legal</ThemedText>
          <View style={styles.optionList}>
            {accountItems.map((item) => (
              <StaticRow key={item.label} icon={item.icon} label={item.label} tint={item.tint} colors={colors} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.sectionLabel, { color: colors.icon }]}>Navigation</ThemedText>
          <Pressable
            style={[styles.backButton, { borderColor: colors.icon + '28' }]}
            onPress={() => router.push('/')}> 
            <Ionicons name="chatbubbles-outline" size={18} color={colors.icon} />
            <ThemedText style={[styles.backButtonText, { color: colors.text }]}>Back to chats</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
    gap: 18,
  },
  headerCard: {
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarWrap: {
    padding: 4,
    overflow: 'visible',
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  username: {
    fontSize: 13,
  },
  statusRow: {
    marginTop: 4,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  optionList: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.15)',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128,128,128,0.14)',
  },
  optionDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  optionLabel: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
