import * as admin from 'firebase-admin';
import { Page, User } from './core';
import { createError } from './util';

export class DB {
  private static db: FirebaseFirestore.Firestore;
  private static pages: FirebaseFirestore.CollectionReference;
  private static users: FirebaseFirestore.CollectionReference;

  static init() {
    this.db = admin.firestore();

    this.pages = this.db.collection('pages');
    this.users = this.db.collection('users');
  }

  static async getPage(pageId: string): Promise<Page> {
    const doc = await this.pages.doc(pageId).get();
    if (!doc.exists) {
      throw createError('NotFoundError', 'The specified page was not found');
    }

    return doc.data() as Page;
  }

  static async getUsers(): Promise<User[]> {
    const docs = await this.users.orderBy('name').get();
    if (docs.empty) {
      return [];
    }

    const results: User[] = [];
    docs.forEach((doc) => {
      results.push(doc.data() as User);
    });

    return results;
  }
}
