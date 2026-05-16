# LogOfReview — 프로젝트 가이드

리뷰 콘텐츠를 작성·검색·평가하는 블로그형 SPA. 클라이언트 아키텍처(서버/클라이언트/URL 상태) 학습용 개인 프로젝트. 백엔드는 dev에서 json-server, prod에서 정적 JSON으로 모킹.

## 기술 스택

- 빌드: Vite 7 / 언어: TypeScript (strict)
- UI: React 19, Styled Components 6, React Router 7
- 상태: TanStack Query 5(서버 데이터·캐시), Zustand 5(인증, persist)
- HTTP: Axios 1 / Mock API: json-server

## 코드 규칙

- CRITICAL: `any` 타입 금지. 도메인 타입(`Review`/`Comment`/`User`)을 정확히 사용한다.
- CRITICAL: API 호출·환경 분기는 `src/api/` 레이어에서만 처리한다. 컴포넌트에서 직접 `import.meta.env.PROD`를 분기하지 않는다.
- 함수·컴포넌트 위에는 한 줄 한글 핵심 주석을 단다(15자 내외). 당연한 내용은 주석 금지.
- 에러가 날 수 있는 경계(네트워크·입력)에는 방어 코드를 둔다.
- 컴포넌트는 `src/components/`, 페이지는 `src/pages/`, 타입은 `src/types/`에 둔다.
- 코드 수정 후 타입 에러·린트 경고가 없는지 반드시 확인한다.

## 명령어

```
npm run dev      # 개발 서버 (localhost:5173)
npm run server   # Mock API (json-server, localhost:3001)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

## 커밋·푸시 규칙

커밋 메시지는 작업 종류에 따라 아래 형식을 **반드시** 따른다.

| 작업 종류 | 형식 | 예시 |
|-----------|------|------|
| 새 파일 생성 | `feat. <무엇> 구현` | `feat. ProtectedRoute 구현` |
| 파일 수정 | `fix. <무엇> 수정` | `fix. ReviewsPage URL 상태 수정` |
| 리팩토링 | `refactor. <무엇> 변경` | `refactor. API 분기 추상화 변경` |

- 커밋 후 항상 `git push`로 원격 브랜치에 반영한다.
- Co-Authored-By 서명은 붙이지 않는다.
- 한 번의 작업에 여러 파일이 섞이면 가장 대표적인 변경 종류의 형식을 쓴다.

## 작업 워크플로우 — 하네스 (중요)

이 프로젝트는 진단·리팩토링을 **하네스로 반자동 진행** 중이다.

- **흐름·시작 방법**: `.claude/harness/README.md`에 전체 흐름과 작업 시작 방법이 사람이 읽기 쉽게 정리돼 있다. 새 세션은 먼저 이 문서를 읽는다.
- **실행**: `python .claude/harness/engine/run.py value_refactor` 한 줄이면 5개 phase의 모든 step이 끝까지 자동 실행된다. step마다 새 `claude -p` 프로세스로 실행돼 컨텍스트가 초기화되고, 연속성은 코드 파일·git 커밋·`index.json`의 step `summary`로 유지된다.
- **진행 현황**: `.claude/harness/runtime/value_refactor/PROGRESS.md`를 연다. step이 끝날 때마다 자동 갱신되는 체크리스트다. 원본 상태는 `runtime/value_refactor/index.json` 및 각 `runtime/value_refactor/phases/{phase}/index.json`.
- **phase 순서**: `diagnosis` → `refactor` → `test` → `measure` → `resume-docs`. 각 step의 지시는 `workflows/value_refactor/phases/{phase}/step{N}.md`에 자기완결적으로 있다.
- **선택적 모듈 `resume-notion`**: 5개 phase 완료 후 Notion MCP로 이력서·블로그 글을 작성할 때 사용. 주 파이프라인과 분리돼 있고 필요할 때만 실행한다. 주 사용법은 Claude Code 대화에서 `/resume-notion` 스킬 호출. 상세 설명: `.claude/harness/resume-notion/memo.md`.
- **멈췄을 때**: error(3회 재시도 후 실패)/blocked(브라우저 측정·이력서 승인 등 사람 개입 필요)면 `.claude/harness/runtime/value_refactor/NOTES.md`에 사유·재개법이 기록되고 실행이 멈춘다. 해결 후 해당 step status를 `pending`으로 되돌려 `runtime/value_refactor/phases/{phase}/index.json`에서 수정하고 다시 `python .claude/harness/engine/run.py value_refactor`를 실행한다.
- **diagnosis.md**: 진단·측정 결과는 repo 루트 `diagnosis.md`에 기록한다. `.gitignore` 대상(로컬 보관, 면접·이력서 근거).
- `.claude/` 폴더는 git에 커밋하지 않는다(재사용 원천은 별도 repo `gy_harness_framework`에서 관리 예정).

## 유지보수 규칙

- 하네스 구조(phase·step·파일 위치 등)나 프로젝트 구조가 바뀌면 **이 `CLAUDE.md`와 `.claude/harness/README.md`를 같은 작업에서 함께 갱신**한다. 문서가 실제 구조와 어긋나면 안 된다.
