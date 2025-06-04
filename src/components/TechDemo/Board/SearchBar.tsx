import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  keyword: string;
  searchType: 'title' | 'content' | 'author';
  onSearch: (
    keyword: string,
    searchType: 'title' | 'content' | 'author'
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  keyword,
  searchType,
  onSearch,
}) => {
  const [inputKeyword, setInputKeyword] = useState(keyword);
  const [inputSearchType, setInputSearchType] = useState(searchType);

  useEffect(() => {
    setInputKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    setInputSearchType(searchType);
  }, [searchType]);

  // 검색어 입력 핸들러
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
  };

  // 검색 타입 변경
  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchType = e.target.value as 'title' | 'content' | 'author';
    setInputSearchType(newSearchType);
  };

  // 검색 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputKeyword, inputSearchType);
  };

  return (
    <form
      className={`relative flex items-center w-full gap-2`}
      onSubmit={handleSubmit}
    >
      {/* 검색 타입 선택 */}
      <select
        value={inputSearchType}
        onChange={handleSearchTypeChange}
        className="py-2 px-3 rounded-lg border border-border focus:border-primary focus:outline-none bg-card text-text transition-colors"
      >
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="author">글쓴이</option>
      </select>

      {/* 검색 입력 필드 */}
      <div className="flex-1">
        <input
          type="text"
          value={inputKeyword}
          onChange={handleKeywordChange}
          placeholder="검색할 단어 입력"
          className="w-full py-2 px-4 pr-10 rounded-lg border border-border focus:border-primary focus:outline-none bg-card text-text placeholder:text-text-muted transition-colors"
        />
      </div>

      {/* 검색 버튼 */}
      <button className="flex items-center justify-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
        검색
      </button>
    </form>
  );
};

export default SearchBar;
