import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { profile } from '@/data/profile';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.hero, { borderColor: colors.icon + '22', backgroundColor: colors.icon + '10' }]}>
        <Avatar name={profile.name} color={colors.tint} size={72} online={profile.active} />
        <View style={styles.heroText}>
          <View style={styles.nameRow}>
            <ThemedText type="title">{profile.name}</ThemedText>
            <View style={[styles.statusPill, { backgroundColor: profile.active ? '#1F8A4C' : '#8A8A8A' }]}>
              <ThemedText style={styles.statusText}>{profile.status}</ThemedText>
            </View>
          </View>
          <ThemedText style={[styles.username, { color: colors.icon }]}>{profile.username}</ThemedText>
          <ThemedText style={[styles.role, { color: colors.text }]}>{profile.role}</ThemedText>
          <ThemedText style={[styles.bio, { color: colors.icon }]}>{profile.bio}</ThemedText>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle">Profile details</ThemedText>
        <View style={styles.card}>
          {profile.details.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.detailRow,
                index !== profile.details.length - 1 && { borderBottomColor: colors.icon + '1F' },
              ]}>
              <View style={[styles.detailIcon, { backgroundColor: colors.tint + '18' }]}>
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={18} color={colors.tint} />
              </View>
              <View style={styles.detailText}>
                <ThemedText style={[styles.detailLabel, { color: colors.icon }]}>{item.label}</ThemedText>
                <ThemedText style={styles.detailValue}>{item.value}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={[styles.accountButton, { backgroundColor: colors.tint }]}
        onPress={() => router.push('/account')}>
        <Ionicons name="open-outline" size={18} color="#fff" />
        <ThemedText style={styles.accountButtonText}>Open full account</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 18,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroText: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  username: {
    fontSize: 14,
  },
  role: {
    fontSize: 16,
    fontWeight: '600',
  },
  bio: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  section: {
    gap: 10,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.15)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    flex: 1,
    gap: 2,
  },
  detailLabel: {
    fontSize: 12,
  },
  detailValue: {
    fontSize: 15,
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 16,
    paddingVertical: 14,
  },
  accountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
