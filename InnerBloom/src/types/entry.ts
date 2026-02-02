import { Timestamp } from 'firebase/firestore';

export type Entry = {
  id: string;
  title: string;
  content: string;
  //date: Timestamp;
  //mood: string;
};
