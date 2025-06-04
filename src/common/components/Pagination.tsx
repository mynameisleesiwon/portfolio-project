import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // 블록 사이즈
  const blockSize = 5;

  // 페이지 범위 계산
  const getBlockPageRange = () => {
    const range: number[] = [];
    const startPage = Math.floor((currentPage - 1) / blockSize) * blockSize + 1;
    const endPage = Math.min(totalPages, startPage + blockSize - 1);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  };

  // 현재 블록 정보 계산
  const getCurrentBlockInfo = () => {
    const currentBlockIndex = Math.floor((currentPage - 1) / blockSize); // 0부터 시작

    const startPage = currentBlockIndex * blockSize + 1; // 이 블록의 첫 페이지
    const endPage = Math.min(totalPages, startPage + blockSize - 1); // 이 블록의 마지막 페이지

    return {
      blockIndex: currentBlockIndex,
      startPage,
      endPage,
      isFirstBlock: currentBlockIndex === 0,
      isLastBlock: endPage === totalPages,
    };
  };

  // 이전/다음 블록 페이지 계산
  const getBlockNavigation = () => {
    const blockInfo = getCurrentBlockInfo();

    // 이전 블록의 마지막 페이지
    const prevBlockPage = blockInfo.isFirstBlock
      ? null
      : blockInfo.startPage - 1;

    // 다음 블록의 첫 페이지
    const nextBlockPage = blockInfo.isLastBlock ? null : blockInfo.endPage + 1;

    return {
      prevBlockPage,
      nextBlockPage,
      showPrevButton: !blockInfo.isFirstBlock,
      showNextButton: !blockInfo.isLastBlock,
    };
  };

  // 클릭 핸들러
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // 블록 이동 핸들러
  const handleBlockNavigation = (targetPage: number) => {
    handlePageClick(targetPage);
  };

  const blockNav = getBlockNavigation();

  return (
    <nav className="flex justify-center items-center">
      <ul className="flex items-center space-x-1">
        {/* 이전 블록 버튼 */}
        {blockNav.showPrevButton && (
          <li>
            <button
              onClick={() => handleBlockNavigation(blockNav.prevBlockPage!)}
              disabled={currentPage === 1}
              className="p-2 rounded-md focus:outline-none transition-colors text-text hover:bg-card-hover"
              aria-label={`이전 블록 (${blockNav.prevBlockPage}페이지로)`}
            >
              이전
            </button>
          </li>
        )}

        {/* 페이지 번호 */}
        {getBlockPageRange().map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageClick(page)}
              className={`min-w-[36px] h-9 px-3 rounded-md focus:outline-none 
                ${
                  page === currentPage
                    ? 'bg-primary text-white font-medium'
                    : 'hover:bg-card-hover text-text'
                }`}
              aria-label={`페이지 ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {/* 다음 블록 버튼*/}
        {blockNav.showNextButton && (
          <li>
            <button
              onClick={() => handleBlockNavigation(blockNav.nextBlockPage!)}
              className="p-2 rounded-md focus:outline-none transition-colors text-text hover:bg-card-hover"
              aria-label={`다음 블록 (${blockNav.nextBlockPage}페이지로)`}
            >
              다음
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
