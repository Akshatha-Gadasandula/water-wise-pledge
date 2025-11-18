/**
 * Firestore helper functions using Firebase v9 modular SDK.
 *
 * Functions:
 * - addPledge({ name, pledgeText })
 * - getTips()
 * - addTip({ text, date })
 *
 * Each function is async and includes basic error handling (console.error and rethrow).
 */

import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Add a pledge document to the 'pledges' collection.
 * @param {{name: string, pledgeText: string}} param0
 * @returns {{id: string}} - object with created document id
 */
export async function addPledge({ name, pledgeText }) {
  try {
    const docRef = await addDoc(collection(db, 'pledges'), {
      name,
      pledgeText,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error adding pledge:', error);
    throw error;
  }
}

/**
 * Fetch tips from the 'tips' collection ordered by `date` descending.
 * @returns {Array<Object>} - list of tip objects { id, ...data }
 */
export async function getTips() {
  try {
    const q = query(collection(db, 'tips'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching tips:', error);
    throw error;
  }
}

/**
 * Add a tip to the 'tips' collection. If `date` is not provided, uses server timestamp.
 * @param {{text: string, date?: any}} param0
 * @returns {{id: string}} - object with created document id
 */
export async function addTip({ text, date }) {
  try {
    const payload = {
      text,
      date: date || serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'tips'), payload);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error adding tip:', error);
    throw error;
  }
}
