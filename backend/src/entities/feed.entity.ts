import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { FeedLike } from './feed-like.entity';
import { Comment } from './comment.entity';

// Feed 엔티티 - 소셜 피드 게시글을 담는 데이터베이스 테이블
@Entity('feeds') // 데이터베이스 테이블명을 'feeds'로 지정
export class Feed {
  // 기본키 (Primary Key) - UUID 타입으로 고유 ID 자동 생성
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 피드 내용 - 피드의 텍스트 내용 (text 타입으로 긴 내용 지원)
  @Column({ type: 'text' })
  content: string;

  // 작성자 ID - 피드를 작성한 사용자의 ID (User 엔티티의 id와 연결)
  @Column({ name: 'user_id' })
  userId: number; // User 엔티티의 id 타입(number)과 일치

  // 작성자 정보 - User 엔티티와의 관계 설정
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // 한 사용자가 여러 피드를 작성할 수 있음 (1:N 관계)
  @JoinColumn({ name: 'user_id' }) // user_id 컬럼으로 관계 연결
  user: User; // 사용자 정보를 포함하여 조회 가능

  // 생성일시 - 피드가 작성된 시간 (자동 생성)
  @CreateDateColumn({
    name: 'created_at', // 데이터베이스 컬럼명
    type: 'timestamp', // 타임스탬프 타입
  })
  createdAt: Date;

  // 수정일시 - 피드가 마지막으로 수정된 시간 (자동 업데이트)
  @UpdateDateColumn({
    name: 'updated_at', // 데이터베이스 컬럼명
    type: 'timestamp', // 타임스탬프 타입
  })
  updatedAt: Date;

  // 좋아요 목록 - FeedLike 엔티티와의 1:N 관계 설정
  @OneToMany(() => FeedLike, (feedLike) => feedLike.feed, { cascade: true })
  feedLikes: FeedLike[]; // 이 피드에 좋아요를 누른 사용자들의 목록

  // 댓글 목록 - Comment 엔티티와의 1:N 관계 설정
  @OneToMany(() => Comment, (comment) => comment.feed, { cascade: true })
  comments: Comment[]; // 이 피드에 달린 댓글들의 목록

  // 가상 속성 (데이터베이스에 저장되지 않음, API 응답용)
  likeCount?: number; // 좋아요 수
  isLiked?: boolean; // 현재 사용자가 좋아요했는지 여부
  commentCount?: number; // 댓글 수
}
