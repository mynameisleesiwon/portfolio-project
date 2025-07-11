import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

// CommentLike 엔티티 - 댓글 좋아요를 담는 데이터베이스 테이블
@Entity('comment_likes') // 데이터베이스 테이블명을 'comment_likes'로 지정
@Unique(['userId', 'commentId']) // 한 사용자가 한 댓글에 좋아요는 한 번만 가능
export class CommentLike {
  // 기본키 (Primary Key) - UUID 타입으로 고유 ID 자동 생성
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 좋아요한 사용자 ID - User 엔티티의 id와 연결
  @Column({ name: 'user_id' })
  userId: number;

  // 좋아요한 댓글 ID - Comment 엔티티의 id와 연결
  @Column({ name: 'comment_id' })
  commentId: string;

  // 좋아요한 사용자 정보 - User 엔티티와의 관계 설정
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // 사용자 삭제 시 좋아요도 삭제
  @JoinColumn({ name: 'user_id' }) // user_id 컬럼으로 관계 연결
  user: User;

  // 좋아요한 댓글 정보 - Comment 엔티티와의 관계 설정
  @ManyToOne(() => Comment, { onDelete: 'CASCADE' }) // 댓글 삭제 시 좋아요도 삭제
  @JoinColumn({ name: 'comment_id' }) // comment_id 컬럼으로 관계 연결
  comment: Comment;

  // 생성일시 - 좋아요를 누른 시간 (자동 생성)
  @CreateDateColumn({
    name: 'created_at', // 데이터베이스 컬럼명
    type: 'timestamp', // 타임스탬프 타입
  })
  createdAt: Date;
}
