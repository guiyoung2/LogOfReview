import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import ReviewsPage from '../ReviewsPage'
import { server } from '../../test/mocks/server'
import type { Review } from '../../types/review'
import { useUserStore } from '../../store/userStore'

const testReviews: Review[] = [
  {
    id: 1,
    userId: 1,
    title: '최신 리뷰',
    content: '최신 내용입니다',
    category: '영화',
    rating: 5,
    images: [],
    tags: [],
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2024-03-01T00:00:00.000Z',
  },
  {
    id: 2,
    userId: 2,
    title: '오래된 리뷰',
    content: '오래된 내용입니다',
    category: '책',
    rating: 2,
    images: [],
    tags: [],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

// URL 쿼리스트링 캡처용 헬퍼 컴포넌트
const LocationDisplay = () => {
  const location = useLocation()
  return <div data-testid="location">{location.search}</div>
}

// 테스트마다 새 QueryClient 생성 (실패가 빠르게 드러나도록 retry 비활성화)
const makeQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } })

// MemoryRouter + QueryClientProvider 래퍼
const renderPage = (initialUrl = '/') => {
  const queryClient = makeQueryClient()
  render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <QueryClientProvider client={queryClient}>
        <ReviewsPage />
        <LocationDisplay />
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('ReviewsPage', () => {
  beforeEach(() => {
    // 테스트 간 스토어 상태 격리
    useUserStore.setState({ user: null, token: null, isLoggedIn: false })
    // 기본 핸들러를 두 개의 리뷰를 반환하도록 오버라이드
    server.use(
      http.get('http://localhost:3001/reviews', () =>
        HttpResponse.json(testReviews)
      )
    )
  })

  it('리뷰 목록이 렌더링된다', async () => {
    renderPage()
    await screen.findByText('최신 리뷰')
    expect(screen.getByText('오래된 리뷰')).toBeInTheDocument()
  })

  it('기본 정렬(latest)은 URL에 sort 파라미터가 없다', async () => {
    renderPage()
    await screen.findByText('최신 리뷰')
    expect(screen.getByTestId('location').textContent).toBe('')
  })

  it('정렬 변경 시 URL sort 파라미터가 갱신된다', async () => {
    renderPage()
    await screen.findByText('최신 리뷰')

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'oldest' } })

    await waitFor(() => {
      const params = new URLSearchParams(
        screen.getByTestId('location').textContent ?? ''
      )
      expect(params.get('sort')).toBe('oldest')
    })
  })

  it('검색 실행 시 URL q 파라미터가 갱신된다', async () => {
    renderPage()
    await screen.findByText('최신 리뷰')

    fireEvent.change(
      screen.getByPlaceholderText('제목, 내용, 태그로 검색...'),
      { target: { value: '최신' } }
    )
    fireEvent.click(screen.getByRole('button', { name: '검색' }))

    await waitFor(() => {
      const params = new URLSearchParams(
        screen.getByTestId('location').textContent ?? ''
      )
      expect(params.get('q')).toBe('최신')
    })
  })

  it('검색 결과가 필터링된다', async () => {
    renderPage()
    await screen.findByText('최신 리뷰')

    fireEvent.change(
      screen.getByPlaceholderText('제목, 내용, 태그로 검색...'),
      { target: { value: '최신' } }
    )
    fireEvent.click(screen.getByRole('button', { name: '검색' }))

    // 검색 완료 후 결과가 렌더링될 때까지 대기
    await screen.findByText('최신 리뷰')
    expect(screen.queryByText('오래된 리뷰')).not.toBeInTheDocument()
  })
})
