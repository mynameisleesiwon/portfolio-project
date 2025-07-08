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
import { Feed } from './feed.entity';

// FeedLike 엔티티 - 피드 좋아요를 담는 데이터베이스 테이블
@Entity('feed_likes') // 데이터베이스 테이블명을 'feed_likes'로 지정
@Unique(['userId', 'feedId']) // 한 사용자가 한 피드에 좋아요는 한 번만 가능
export class FeedLike {
  // 기본키 (Primary Key) - UUID 타입으로 고유 ID 자동 생성
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 좋아요한 사용자 ID - User 엔티티의 id와 연결
  @Column({ name: 'user_id' })
  userId: number;

  // 좋아요한 피드 ID - Feed 엔티티의 id와 연결
  @Column({ name: 'feed_id' })
  feedId: string;

  // 좋아요한 사용자 정보 - User 엔티티와의 관계 설정
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // 사용자 삭제 시 좋아요도 삭제
  @JoinColumn({ name: 'user_id' }) // user_id 컬럼으로 관계 연결
  user: User;

  // 좋아요한 피드 정보 - Feed 엔티티와의 관계 설정
  @ManyToOne(() => Feed, { onDelete: 'CASCADE' }) // 피드 삭제 시 좋아요도 삭제
  @JoinColumn({ name: 'feed_id' }) // feed_id 컬럼으로 관계 연결
  feed: Feed;

  // 생성일시 - 좋아요를 누른 시간 (자동 생성)
  @CreateDateColumn({
    name: 'created_at', // 데이터베이스 컬럼명
    type: 'timestamp', // 타임스탬프 타입
  })
  createdAt: Date;
}
