import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { doctors } from '@/data/doctors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(q) || doctor.specialization.toLowerCase().includes(q)
    );
  }, [query]);

  const activeDoctors = doctors.filter((doctor) => doctor.online);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchSection}>
        <View style={[styles.searchBar, { backgroundColor: colors.icon + '16', borderColor: colors.icon + '18' }]}> 
          <Ionicons name="search" size={18} color={colors.icon} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for a doctor"
            placeholderTextColor={colors.icon}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>
        <ThemedText style={[styles.sectionLabel, { color: colors.icon }]}>Active now {activeDoctors.length}</ThemedText>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.icon + '18' }]} />}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => router.push(`/chat/${item.id}`)}>
            <View style={styles.rowLeft}>
              <Avatar name={item.name} color={item.color} online={item.online} />
              <View style={styles.rowText}>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                <ThemedText style={[styles.cardSpecialization, { color: colors.icon }]}>
                  {item.specialization}
                </ThemedText>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, { backgroundColor: item.online ? '#21C55D' : '#94A3B8' }]} />
                  <ThemedText style={[styles.statusText, { color: colors.icon }]}> 
                    {item.online ? 'Active now' : 'Offline'}
                  </ThemedText>
                </View>
              </View>
            </View>
            <View style={[styles.chatButton, { borderColor: colors.icon + '28' }]}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.icon} />
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>
            {query.trim() ? `No chats found "${query.trim()}"` : 'No chats found.'}
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionLabel: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    marginLeft: 80,
  },
  row: {
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  cardSpecialization: {
    fontSize: 13,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
  },
  chatButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
  },
});
