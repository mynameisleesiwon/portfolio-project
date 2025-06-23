import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// User 엔티티 - 사용자 정보를 담는 데이터베이스 테이블
@Entity('users') // 데이터베이스 테이블명을 'users'로 지정
export class User {
  // 기본키 (Primary Key) - 자동으로 증가하는 고유 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 사용자 ID - 로그인 시 사용하는 고유한 식별자
  @Column({ unique: true }) // unique: true로 설정하여 중복 방지
  userId: string;

  // 비밀번호 - 로그인 인증에 사용 (나중에 해시화해서 저장)
  @Column()
  password: string;

  // 닉네임 - 사용자가 표시될 이름
  @Column({ unique: true }) // unique: true로 설정하여 중복 방지
  nickname: string;

  // 생성일시 - 사용자가 가입한 시간 (자동 생성)
  @CreateDateColumn()
  createdAt: Date;

  // 수정일시 - 사용자 정보가 마지막으로 수정된 시간 (자동 업데이트)
  @UpdateDateColumn()
  updatedAt: Date;
}
