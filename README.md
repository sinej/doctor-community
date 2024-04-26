# Doctor Community - 7일 챌린지
(2024-04-22 ~ 2024-04-28)

## 초기설치
```git
npm create vite@latest
```

## 사용 기술 스택

| Types      | Techs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Front      | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) ![Tanstack Query](https://img.shields.io/badge/-tanstack%20Query-FF4154?style=flat&logo=react%20query&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=flat&logo=mui&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=flat&logo=reacthookform&logoColor=white) [zustand](https://github.com/pmndrs/zustand) ![zod](https://img.shields.io/badge/-Zod-3E67B1?style=flat&logo=zod&logoColor=white) |
| Server     | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Build tool | ![Next](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Test       | ![vitest](https://img.shields.io/badge/-vitest-%23FFFFFF?style=flat&logo=vitest&logoColor=058a5e) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=flat&logo=cypress&logoColor=058a5e) ![Testing-Library](https://img.shields.io/badge/-Testing%20Library-%23E33332?style=flat&logo=testing-library&logoColor=white) [MSW](https://mswjs.io/) [Chromatic](https://www.chromatic.com/)                                                                                                                                                                                   |

## 구현

- [X] 프론트엔드 기술환경(Nextjs) 세팅 및 전체 기능 구현
- [X] next-auth 세팅 및 로그인 구현
- [X] route 별 상세페이지 레이아웃 구현
- [X] tailwindCSS 레이아웃 및 스타일 추가
- 2024.04.24
  - [X] 로그인 구현 - validation 체크 및 비번, 아이디 로그인
  - [X] SMS 로그인 구현 - twilio 문자 메시지 인증 연동
- 2024.04.25
  - [X] 커뮤니티 리스트 및 상세페이지 UI 추가
  - [X] 커뮤니티 업로드 추가


## 프로젝트 관련 설명
##### Image
import Image from "next/image"
```javascript
module.exports = {
  // ...,
  images: {
    domains: ["url"]
  }
}

```

#### next-auth
```Git
yarn add next-auth@beta
```

#### cypress
```Git
yarn add cypress --dev

yarn run cypress open
```

#### 회고