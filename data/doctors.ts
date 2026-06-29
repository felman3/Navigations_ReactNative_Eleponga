export type ChatMessage = {
  id: string;
  text: string;
  time: string;
  fromUser: boolean;
};

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  online: boolean;
  color: string;
};

export type Chat = Doctor & {
  lastMessage: string;
  time: string;
  messages: ChatMessage[];
};

export const doctors: Doctor[] = [
  { id: 'calvin', name: 'Doc Calvin', specialization: 'Cardiologist', online: true, color: '#4F8EF7' },
  { id: 'harrold', name: 'Doc Harrold', specialization: 'Dermatologist', online: false, color: '#F2994A' },
  { id: 'oliver', name: 'Doc Oliver', specialization: 'Pediatrician', online: true, color: '#27AE60' },
  { id: 'stella', name: 'Doc Stella', specialization: 'Neurologist', online: true, color: '#9B51E0' },
  { id: 'felix', name: 'Doc Felix', specialization: 'Cardiologist', online: false, color: '#EB5757' },
];

export const chats: Chat[] = [
  {
    ...doctors[0],
    lastMessage: 'Please come to the clinic today so we can run an ECG.',
    time: '9:05 AM',
    messages: [
      { id: '1', text: 'Hi Doc, I have chest pains since yesterday.', fromUser: true, time: '9:00 AM' },
      { id: '2', text: 'I see. Can you describe the pain, is it sharp or dull?', fromUser: false, time: '9:02 AM' },
      { id: '3', text: 'It is more of a sharp pain on the left side.', fromUser: true, time: '9:03 AM' },
      { id: '4', text: 'Please come to the clinic today so we can run an ECG.', fromUser: false, time: '9:05 AM' },
    ],
  },
  {
    ...doctors[1],
    lastMessage: 'Apply the cream twice a day and avoid direct sunlight.',
    time: 'Yesterday',
    messages: [
      { id: '1', text: 'Hi Doc, I have an itchy rash on my arm.', fromUser: true, time: '4:10 PM' },
      { id: '2', text: 'Can you send a photo of the affected area?', fromUser: false, time: '4:12 PM' },
      { id: '3', text: 'Sure, sending it now.', fromUser: true, time: '4:13 PM' },
      { id: '4', text: 'Apply the cream twice a day and avoid direct sunlight.', fromUser: false, time: '4:20 PM' },
    ],
  },
  {
    ...doctors[2],
    lastMessage: 'Great, the checkup is confirmed for Friday at 10 AM.',
    time: 'Monday',
    messages: [
      { id: '1', text: 'Hi Doc, I would like to schedule a checkup for my son.', fromUser: true, time: '11:00 AM' },
      { id: '2', text: 'Sure! How old is he and any concerns right now?', fromUser: false, time: '11:01 AM' },
      { id: '3', text: 'He is 5 years old, just a routine checkup.', fromUser: true, time: '11:02 AM' },
      { id: '4', text: 'Great, the checkup is confirmed for Friday at 10 AM.', fromUser: false, time: '11:05 AM' },
    ],
  },
];
