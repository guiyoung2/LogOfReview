import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from '../userStore'
import type { User } from '../../types/user'

const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  nickname: '테스터',
}

describe('userStore', () => {
  // 각 테스트 전 store 상태 초기화
  beforeEach(() => {
    useUserStore.setState({ user: null, token: null, isLoggedIn: false })
  })

  it('초기 상태: user·token null, isLoggedIn false', () => {
    const { user, token, isLoggedIn } = useUserStore.getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
    expect(isLoggedIn).toBe(false)
  })

  it('login: user·token·isLoggedIn 올바르게 설정', () => {
    useUserStore.getState().login(mockUser, 'test-token-123')
    const { user, token, isLoggedIn } = useUserStore.getState()
    expect(user).toEqual(mockUser)
    expect(token).toBe('test-token-123')
    expect(isLoggedIn).toBe(true)
  })

  it('logout: 상태 초기화', () => {
    useUserStore.getState().login(mockUser, 'test-token-123')
    useUserStore.getState().logout()
    const { user, token, isLoggedIn } = useUserStore.getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
    expect(isLoggedIn).toBe(false)
  })
})
