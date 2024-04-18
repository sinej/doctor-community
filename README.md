# Doctor Community

## 초기설치
```git
npm create vite@latest
```

## 기술스택
- Vite: 
- React: `17.0.2`
- TailwindCSS: `3.0.7`
- typescript: `4.5.4`
- Next-auth

## 디렉토리 구조
- pages
    - api
        - auth
            - [...nextauth]
    - auth
        - signin
        - 404
    - _app
    - index
- components


## 구현

- [X] 프론트엔드 기술환경(Nextjs) 세팅 및 전체 기능 구현
- [X] next-auth 세팅 및 로그인 구현
- [X] route 별 상세페이지 레이아웃 구현
- [X] tailwindCSS 레이아웃 및 스타일 추가


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