import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ReviewActions from '../ReviewActions'

describe('ReviewActions — isOwner 권한 분기', () => {
  it('showActions=true 일 때 수정·삭제 버튼이 표시된다', () => {
    render(
      <ReviewActions
        onBack={() => undefined}
        onEdit={() => undefined}
        onDelete={() => undefined}
        showActions={true}
      />
    )
    expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument()
  })

  it('showActions=false 일 때 수정·삭제 버튼이 숨겨진다', () => {
    render(
      <ReviewActions
        onBack={() => undefined}
        showActions={false}
      />
    )
    expect(screen.queryByRole('button', { name: '수정' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '삭제' })).not.toBeInTheDocument()
  })

  it('뒤로가기 버튼은 showActions 값과 무관하게 항상 표시된다', () => {
    render(
      <ReviewActions onBack={() => undefined} showActions={false} />
    )
    expect(screen.getByRole('button', { name: /뒤로가기/ })).toBeInTheDocument()
  })

  it('isDeleting=true 일 때 삭제 버튼이 비활성화된다', () => {
    render(
      <ReviewActions
        onBack={() => undefined}
        onEdit={() => undefined}
        onDelete={() => undefined}
        isDeleting={true}
        showActions={true}
      />
    )
    expect(screen.getByRole('button', { name: '삭제 중...' })).toBeDisabled()
  })
})
