import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../../../hooks/Board/useCategories';
import { usePostDetail } from '../../../hooks/Board/usePostDetail';
import { useUpdatePost } from '../../../hooks/Board/useUpdatePost';
import type { PostCreateData } from '../../../types';
import ErrorMessage from '../../../common/components/ErrorMessage';

const BoardEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // 카테고리 데이터
  const { categories } = useCategories();

  // 기존 게시글 데이터
  const { post, error: postError, refetch } = usePostDetail(id || '');

  // 게시글 수정 훅
  const { updatePost, isLoading } = useUpdatePost();

  // 폼 상태 관리
  const [formData, setFormData] = useState<PostCreateData>({
    title: '',
    content: '',
    author: '',
    category: '',
  });

  // 유효성 검사 에러
  const [errors, setErrors] = useState<Partial<PostCreateData>>({});

  // 기존 데이터로 폼 초기화
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
      });
    }
  }, [post]);

  // 입력값 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // 에러 상태 초기화
    if (errors[name as keyof PostCreateData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Partial<PostCreateData> = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }

    if (!formData.author.trim()) {
      newErrors.author = '작성자를 입력해주세요.';
    }

    if (!formData.category) {
      newErrors.category = '카테고리를 선택해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !post) {
      return;
    }

    const success = await updatePost(post.id, formData);

    if (success) {
      alert('게시글이 성공적으로 수정되었습니다!');

      const targetUrl = location.search
        ? `/tech-demo/board/${post.id}/${location.search}`
        : `/tech-demo/board/${post.id}`;

      navigate(targetUrl);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (!post) {
      navigate('/tech-demo/board');
      return;
    }

    // 원본 데이터와 비교해서 변경사항 확인
    const hasChanges =
      formData.title !== post.title ||
      formData.content !== post.content ||
      formData.author !== post.author ||
      formData.category !== post.category;

    if (hasChanges) {
      const confirmed = window.confirm(
        '수정 중인 내용이 있습니다.\n정말로 나가시겠습니까?'
      );

      if (!confirmed) return;
    }

    const targetUrl = location.search
      ? `/tech-demo/board/${post.id}/${location.search}`
      : `/tech-demo/board/${post.id}`;

    navigate(targetUrl);
  };

  //  에러 표시
  if (postError) {
    return (
      <ErrorMessage
        title="게시글을 불러올 수 없습니다"
        message={postError}
        onRetry={refetch}
      />
    );
  }

  // 게시글이 없는 경우
  if (!post) {
    return;
  }

  return (
    <div className="w-full my-6 px-2 max-w-screen-lg mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-text">
            게시글 수정
          </h1>
        </div>
      </div>

      {/* 수정 폼 */}
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="p-6 space-y-6">
          {/* 카테고리 선택 */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-text mb-2"
            >
              카테고리
            </label>

            <div className="relative">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 rounded-lg border bg-card text-text
                  appearance-none focus:outline-none cursor-pointer ${
                    errors.category
                      ? 'border-red-500'
                      : 'border-border focus:border-primary'
                  }`}
              >
                <option value="" className="text-gray-500">
                  카테고리를 선택해주세요
                </option>
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    value={category.name}
                    className="text-gray-700"
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              {/* 커스텀 화살표 */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          {/* 제목 입력 */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-text mb-2"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="제목을 입력해주세요."
              className={`w-full px-4 py-3 rounded-lg border bg-card text-text placeholder-text-muted focus:outline-none ${
                errors.title
                  ? 'border-red-500'
                  : 'border-border focus:border-primary'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* 작성자 입력 */}
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-text mb-2"
            >
              작성자
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="작성자 이름을 입력해주세요."
              className={`w-full px-4 py-3 rounded-lg border bg-card text-text placeholder-text-muted focus:outline-none ${
                errors.author
                  ? 'border-red-500'
                  : 'border-border focus:border-primary'
              }`}
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-500">{errors.author}</p>
            )}
          </div>

          {/* 내용 입력 */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-text mb-2"
            >
              내용
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="게시글 내용을 입력해주세요..."
              rows={12}
              className={`w-full px-4 py-3 rounded-lg border bg-card text-text placeholder-text-muted focus:outline-none resize-none ${
                errors.content
                  ? 'border-red-500'
                  : 'border-border focus:border-primary'
              }`}
              style={{
                lineHeight: '1.8',
                fontFamily: 'inherit',
              }}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          {/* 액션 버튼 영역 */}
          <div className="p-6 border-t border-border bg-card-hover/30 rounded-lg">
            <div className="flex justify-between items-center">
              {/* 취소 버튼 */}
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center cursor-pointer px-4 py-2 text-text-muted hover:text-text border border-border rounded-lg hover:bg-card-hover transition-all duration-200"
              >
                취소
              </button>

              {/* 수정 완료 버튼 */}
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '수정 중...' : '수정'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoardEdit;
