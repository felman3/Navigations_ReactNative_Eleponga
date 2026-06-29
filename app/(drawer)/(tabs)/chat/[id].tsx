import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { loadMessages, saveMessages } from '@/data/chat-storage';
import { chats, doctors, type ChatMessage } from '@/data/doctors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = doctors.find((item) => item.id === id);
  const existingChat = chats.find((chat) => chat.id === id);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<ChatMessage[]>(existingChat?.messages ?? []);
  const [draft, setDraft] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    if (!doctor) return;
    let isCurrent = true;
    setHydrated(false);
    setMessages(existingChat?.messages ?? []);
    loadMessages(doctor.id).then((stored) => {
      if (!isCurrent) return;
      setMessages(stored ?? existingChat?.messages ?? []);
      setHydrated(true);
    });
    return () => {
      isCurrent = false;
    };
  }, [doctor, existingChat]);

  useEffect(() => {
    if (!doctor || !hydrated) return;
    saveMessages(doctor.id, messages);
  }, [doctor, hydrated, messages]);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    const message = {
      id: `${Date.now()}`,
      text,
      fromUser: true,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages((prev) => {
      const nextMessages = [...prev, message];
      void saveMessages(doctor.id, nextMessages);
      return nextMessages;
    });
    setDraft('');
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  if (!doctor) {
    return (
      <View style={styles.center}>
        <Text>Conversation not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: doctor.name,
          headerBackVisible: false,
          headerLeft: () => <DrawerToggleButton tintColor={colors.text} />,
          headerTitleAlign: 'center',
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background, paddingBottom: keyboardHeight }]}> 
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.fromUser ? styles.bubbleUser : styles.bubbleDoc]}>
              <Text style={item.fromUser ? styles.bubbleTextUser : styles.bubbleTextDoc}>
                {item.text}
              </Text>
              <Text style={item.fromUser ? styles.timeUser : styles.timeDoc}>{item.time}</Text>
            </View>
          )}
        />
        <View
          style={[
            styles.inputBar,
            {
              borderColor: colors.icon + '33',
              paddingBottom: keyboardHeight > 0 ? 12 : Math.max(insets.bottom, 12),
            },
          ]}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Message"
            placeholderTextColor={colors.icon}
            style={[styles.input, { color: colors.text, borderColor: colors.icon + '55' }]}
            multiline
          />
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
    gap: 8,
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#0A84FF',
    borderBottomRightRadius: 4,
  },
  bubbleDoc: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  bubbleTextUser: {
    color: '#fff',
    fontSize: 16,
  },
  bubbleTextDoc: {
    color: '#1C1C1E',
    fontSize: 16,
  },
  timeUser: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timeDoc: {
    color: 'rgba(28,28,30,0.55)',
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});