# 아₩₩₩₩₩₩₩₩₩심심해~₩₩₩₩₩₩₩₩₩₩

### TODOS

- [ ] 머스테시이용해서 이메일 템플릿 만드는 라이브러리 (high)
- [ ] aws deploy (low)
- [ ] api 구현 (high)
- [ ] 구글 로그인 구현 (middle)

### 1차 목표

- [ ] queue를 통해서 이메일을 지속으로 보낼 수 있는 서비스구현
- [ ] 이메일을 보내고 DB에 log 쌓기 및 조회 서비스 구현 (templateId, to, status, message)
  - [ ] 이메일 기준으로 검색할 수 있는 서비스구현
  - [ ] 발송 실패 상태를 모아서 보여줄 수 있는 서비스 구현
  - [ ] 재발송했을 경우, 상태를 업데이트한다. FAIL -> RETRIED 상태로 변경 시킨다.
- [ ] 기본 admin 아이디를 통해 로그인으로 token을 발급할 수 있는 서비스구현
