import { describe, it, expect, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../../test/mocks/server'
import { sortReviews, searchReviews } from '../reviews'
import type { Review } from '../../types/review'

// 정렬·검색 테스트용 목 데이터 (날짜·평점 다양)
const testReviews: Review[] = [
  {
    id: 1,
    userId: 1,
    title: '오래된 리뷰',
    content: '오래된 내용',
    category: '영화',
    rating: 3,
    images: [],
    tags: ['오래된태그'],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    userId: 1,
    title: '최신 리뷰',
    content: '최신 내용입니다',
    category: '책',
    rating: 5,
    images: [],
    tags: ['최신태그', '검색태그'],
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2024-03-01T00:00:00.000Z',
  },
  {
    id: 3,
    userId: 2,
    title: '중간 리뷰',
    content: '중간 내용',
    category: '영화',
    rating: 1,
    images: [],
    tags: ['일반태그'],
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
  },
]

describe('sortReviews', () => {
  it('latest: createdAt 내림차순 정렬', () => {
    const result = sortReviews(testReviews, 'latest')
    expect(result.map((r) => r.id)).toEqual([2, 3, 1])
  })

  it('oldest: createdAt 오름차순 정렬', () => {
    const result = sortReviews(testReviews, 'oldest')
    expect(result.map((r) => r.id)).toEqual([1, 3, 2])
  })

  it('ratingHigh: 평점 내림차순 정렬', () => {
    const result = sortReviews(testReviews, 'ratingHigh')
    expect(result.map((r) => r.rating)).toEqual([5, 3, 1])
  })

  it('ratingLow: 평점 오름차순 정렬', () => {
    const result = sortReviews(testReviews, 'ratingLow')
    expect(result.map((r) => r.rating)).toEqual([1, 3, 5])
  })

  it('원본 배열을 변경하지 않는다', () => {
    const originalIds = testReviews.map((r) => r.id)
    sortReviews(testReviews, 'latest')
    expect(testReviews.map((r) => r.id)).toEqual(originalIds)
  })
})

describe('searchReviews', () => {
  beforeEach(() => {
    server.use(
      http.get('http://localhost:3001/reviews', () =>
        HttpResponse.json(testReviews),
      ),
    )
  })

  it('제목으로 검색', async () => {
    const result = await searchReviews('오래된')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('내용으로 검색', async () => {
    const result = await searchReviews('최신 내용')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('태그로 검색', async () => {
    const result = await searchReviews('검색태그')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('카테고리 + 검색어 조합', async () => {
    const result = await searchReviews('리뷰', '영화')
    expect(result.map((r) => r.id).sort()).toEqual([1, 3])
  })

  it('빈 검색어: 전체 반환', async () => {
    const result = await searchReviews('')
    expect(result).toHaveLength(3)
  })
})
