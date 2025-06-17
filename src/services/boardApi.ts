import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  Query,
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import type {
  Post,
  PostCreateData,
  PostUpdateData,
  PostSearchParams,
  Category,
} from '../types';

const POSTS_COLLECTION = 'posts';
const CATEGORIES_COLLECTION = 'categories';

export const boardApi = {
  // 게시글 목록 조회
  async getPosts(
    params: PostSearchParams = {}
  ): Promise<{ data: Post[]; totalCount: number }> {
    try {
      let postsQuery = query(collection(db, POSTS_COLLECTION));

      // 카테고리 필터링
      if (params.category) {
        postsQuery = query(
          postsQuery,
          where('category', '==', params.category)
        );
      }

      // 검색어 필터링
      if (params.title_like) {
        postsQuery = query(
          postsQuery,
          where('title', '>=', params.title_like),
          where('title', '<=', params.title_like + '\uf8ff')
        );
      } else if (params.content_like) {
        postsQuery = query(
          postsQuery,
          where('content', '>=', params.content_like),
          where('content', '<=', params.content_like + '\uf8ff')
        );
      } else if (params.author_like) {
        postsQuery = query(
          postsQuery,
          where('author', '>=', params.author_like),
          where('author', '<=', params.author_like + '\uf8ff')
        );
      }

      // 정렬
      postsQuery = query(postsQuery, orderBy('createdAt', 'desc'));

      // 페이지네이션
      const pageSize = params._limit || 10;
      const page = params._page || 1;

      // 이전 페이지의 마지막 문서 스냅샷을 기준으로 startAfter 적용
      if (page > 1) {
        const prevPageSnapshot = await getDocs(
          query(postsQuery, limit((page - 1) * pageSize))
        );
        const lastDoc = prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];
        if (lastDoc) {
          postsQuery = query(postsQuery, startAfter(lastDoc), limit(pageSize));
        } else {
          postsQuery = query(postsQuery, limit(pageSize));
        }
      } else {
        postsQuery = query(postsQuery, limit(pageSize));
      }

      const querySnapshot = await getDocs(postsQuery);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      // 전체 개수 조회
      let totalQuery: Query<DocumentData> = collection(db, POSTS_COLLECTION);

      // 카테고리 필터링
      if (params.category) {
        totalQuery = query(
          totalQuery,
          where('category', '==', params.category)
        );
      }

      // 검색어 필터링
      if (params.title_like) {
        totalQuery = query(
          totalQuery,
          where('title', '>=', params.title_like),
          where('title', '<=', params.title_like + '\uf8ff')
        );
      } else if (params.content_like) {
        totalQuery = query(
          totalQuery,
          where('content', '>=', params.content_like),
          where('content', '<=', params.content_like + '\uf8ff')
        );
      } else if (params.author_like) {
        totalQuery = query(
          totalQuery,
          where('author', '>=', params.author_like),
          where('author', '<=', params.author_like + '\uf8ff')
        );
      }

      const totalSnapshot = await getDocs(totalQuery);
      const totalCount = totalSnapshot.size;

      return { data: posts, totalCount };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('게시글 목록을 불러오는데 실패했습니다.');
    }
  },

  // 단일 게시글 조회
  async getPost(id: string): Promise<Post | null> {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Post;
      }
      return null;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw new Error('게시글을 불러오는데 실패했습니다.');
    }
  },

  // 게시글 작성
  async createPost(data: PostCreateData): Promise<Post> {
    try {
      const newPost = {
        ...data,
        createdAt: Timestamp.now(),
        views: 0,
      };

      const docRef = await addDoc(collection(db, POSTS_COLLECTION), newPost);
      const docSnap = await getDoc(docRef);

      return { id: docRef.id, ...docSnap.data() } as Post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('게시글 작성에 실패했습니다.');
    }
  },

  // 게시글 수정
  async updatePost(id: string, data: PostUpdateData): Promise<Post> {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      await updateDoc(docRef, data);

      const docSnap = await getDoc(docRef);
      return { id: docSnap.id, ...docSnap.data() } as Post;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('게시글 수정에 실패했습니다.');
    }
  },

  // 게시글 삭제
  async deletePost(id: string): Promise<void> {
    try {
      const docRef = doc(db, POSTS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('게시글 삭제에 실패했습니다.');
    }
  },

  // 카테고리 목록 조회
  async getCategories(): Promise<Category[]> {
    try {
      const querySnapshot = await getDocs(
        collection(db, CATEGORIES_COLLECTION)
      );
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('카테고리 목록을 불러오는데 실패했습니다.');
    }
  },
};
