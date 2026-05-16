import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Node 환경(Vitest)용 MSW 서버
export const server = setupServer(...handlers)
