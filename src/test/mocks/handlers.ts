import { http, HttpResponse } from 'msw'
import type { Review } from '../../types/review'
import type { Comment } from '../../types/comment'
import type { User } from '../../types/user'

// MSW 핸들러용 목 데이터
const mockReviews: Review[] = [
  {
    id: 1,
    userId: 1,
    title: '테스트 리뷰',
    content: '테스트 내용입니다.',
    category: '영화',
    rating: 4,
    images: [],
    tags: ['태그1'],
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

const mockComments: Comment[] = [
  {
    id: 1,
    reviewId: 1,
    userId: 1,
    content: '테스트 댓글',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

const mockUsers: User[] = [
  {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    nickname: '테스터',
  },
]

// dev(json-server) · prod(정적 JSON) 양쪽 엔드포인트 핸들러
export const handlers = [
  // json-server 엔드포인트 (dev)
  http.get('http://localhost:3001/reviews', () =>
    HttpResponse.json(mockReviews),
  ),
  http.get('http://localhost:3001/reviews/:id', ({ params }) => {
    const id = Number(params['id'])
    const review = mockReviews.find((r) => r.id === id)
    if (!review) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(review)
  }),
  http.get('http://localhost:3001/comments', () =>
    HttpResponse.json(mockComments),
  ),
  http.get('http://localhost:3001/users', () => HttpResponse.json(mockUsers)),

  // 정적 JSON 엔드포인트 (prod)
  http.get('/reviews.json', () => HttpResponse.json(mockReviews)),
  http.get('/comments.json', () => HttpResponse.json(mockComments)),
]
