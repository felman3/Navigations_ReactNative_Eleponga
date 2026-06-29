import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { chats } from '@/data/doctors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ChatsScreen() {
  const [query, setQuery] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chats;
    return chats.filter((chat) => chat.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchBar, { backgroundColor: colors.icon + '22' }]}>
        <Ionicons name="search" size={18} color={colors.icon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search chats"
          placeholderTextColor={colors.icon}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => router.push(`/chat/${item.id}`)}>
            <Avatar name={item.name} color={item.color} online={item.online} />
            <View style={styles.rowText}>
              <View style={styles.rowHeader}>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                <ThemedText style={[styles.time, { color: colors.icon }]}>{item.time}</ThemedText>
              </View>
              <ThemedText numberOfLines={1} style={[styles.preview, { color: colors.icon }]}>
                {item.lastMessage}
              </ThemedText>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    marginLeft: 80,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
  },
  preview: {
    fontSize: 14,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
  },
});
