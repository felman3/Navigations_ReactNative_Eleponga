import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { profile } from '@/data/profile';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AccountScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <>
      <Stack.Screen options={{ title: 'Account' }} />
      <ThemedView style={styles.container}>
        <View style={[styles.hero, { borderColor: colors.icon + '22', backgroundColor: colors.icon + '10' }]}>
          <View style={[styles.avatar, { backgroundColor: colors.tint + '22' }]}>
            <Ionicons name="person" size={34} color={colors.tint} />
          </View>
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
                  <Ionicons name={item.icon as any} size={18} color={colors.tint} />
                </View>
                <View style={styles.detailText}>
                  <ThemedText style={[styles.detailLabel, { color: colors.icon }]}>{item.label}</ThemedText>
                  <ThemedText style={styles.detailValue}>{item.value}</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Pressable
            style={[styles.backButton, { backgroundColor: colors.tint }]}
            onPress={() => router.replace('/')}>
            <Ionicons name="chatbubbles-outline" size={20} color="#fff" />
            <ThemedText style={styles.backButtonText}>Back to chats</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </>
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
    gap: 14,
    alignItems: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 16,
    paddingVertical: 14,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});