import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ChatMessage } from '@/data/doctors';

const KEY_PREFIX = 'chat-messages:';

export async function loadMessages(doctorId: string): Promise<ChatMessage[] | null> {
  const raw = await AsyncStorage.getItem(`${KEY_PREFIX}${doctorId}`);
  return raw ? (JSON.parse(raw) as ChatMessage[]) : null;
}

export async function saveMessages(doctorId: string, messages: ChatMessage[]): Promise<void> {
  await AsyncStorage.setItem(`${KEY_PREFIX}${doctorId}`, JSON.stringify(messages));
}
