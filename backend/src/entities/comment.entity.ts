import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Feed } from './feed.entity';

// Comment 엔티티 - 피드 댓글을 담는 데이터베이스 테이블
@Entity('comments') // 데이터베이스 테이블명을 'comments'로 지정
export class Comment {
  // 기본키 (Primary Key) - UUID 타입으로 고유 ID 자동 생성
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 댓글 내용 - 댓글의 텍스트 내용 (text 타입으로 긴 내용 지원)
  @Column({ type: 'text' })
  content: string;

  // 작성자 ID - 댓글을 작성한 사용자의 ID (User 엔티티의 id와 연결)
  @Column({ name: 'user_id' })
  userId: number; // User 엔티티의 id 타입(number)과 일치

  // 피드 ID - 댓글이 속한 피드의 ID (Feed 엔티티의 id와 연결)
  @Column({ name: 'feed_id' })
  feedId: string; // Feed 엔티티의 id 타입(string)과 일치

  // 작성자 정보 - User 엔티티와의 관계 설정
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // 한 사용자가 여러 댓글을 작성할 수 있음 (1:N 관계)
  @JoinColumn({ name: 'user_id' }) // user_id 컬럼으로 관계 연결
  user: User; // 사용자 정보를 포함하여 조회 가능

  // 피드 정보 - Feed 엔티티와의 관계 설정
  @ManyToOne(() => Feed, { onDelete: 'CASCADE' }) // 한 피드에 여러 댓글이 있을 수 있음 (1:N 관계)
  @JoinColumn({ name: 'feed_id' }) // feed_id 컬럼으로 관계 연결
  feed: Feed; // 피드 정보를 포함하여 조회 가능

  // 생성일시 - 댓글이 작성된 시간 (자동 생성)
  @CreateDateColumn({
    name: 'created_at', // 데이터베이스 컬럼명
    type: 'timestamp', // 타임스탬프 타입
  })
  createdAt: Date;

  // 수정일시 - 댓글이 마지막으로 수정된 시간 (자동 업데이트)
  @UpdateDateColumn({
    name: 'updated_at', // 데이터베이스 컬럼명
    type: 'timestamp', // 타임스탬프 타입
  })
  updatedAt: Date;
}
