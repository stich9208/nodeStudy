# Node.JS 스터디 with youtube clone

### 2021.11.27

- 프로젝트 환경설정 (`babel`, `nodemon`... )
- **app.listen(`port number`, `callback`)** 메서드를 사용하여 첫 서버 연결
- **app.get(`route`, `callback`)** 메서드를 사용하여 route handler 사용
- handler가 전달받는 request, response 인자에 대한 이해

### 2021.11.28

- 미들웨어의 개념 이해
- 미들웨어도 결국은 handler, handler는 request, response인자 외에 next 함수도 인자로 받아오는데, 원하는 접근이 아닐 경우 `return`을 통해 다음 handler로의 연결을 끊을 수도 있고, `next` 함수를 통해 다음 handler로 연결을 지속할 수도 있다.
- **app.get(`route`, `middleware` `callback`)**의 형식으로 사용, 미들웨어는 원하는 개수만큼 인자로 받을 수 있다. app.get(`route`, `middleware`, `middleware`, `middleware`... `callback`)
- **app.use(`middleware`...)** 메서드를 통해 미들웨어를 모든 route의 요청에 대해 전역으로 사용할 수 있다. (_이 경우 **app.use**는 페이지의 요청을 받는 모든 **app.get** 메서드의 위치보다 상단에 위치해야 한다._)

### 2021.11.29

- 컨트롤러 로직과 라우터 로직의 분리
- **app.use**를 사용하여 라우터 그룹화 적용
- 변수가 필요한 dynamic routing에서 변수를 handling 하는 방법
  route 작성시 `:변수명`을 사용하여 적용 이후 route에 적용된 변수의 값을 사용해야 할 경우는 `req.params`객체를 통해 접근

### 2021.11.30

- 현재 보고 있는 강의와는 다르게 탬플릿 사용이 아니라 react로 프론트를 진행예정
- express와 react의 연결에 대해 많은 방법을 고민했지만 결과적으로 현업에서 사용시에는 분리될 수 있도록 작성하는 것이 좋을 것 같아서 일단 프로젝트내 별도의 client폴더로 세팅
- 기존에 express로 라우팅을 진행했던 부분을 `react-router-dom`을 사용하여 프론트에서 라우팅을 진행예정 => 이를 위해서는 서범코드에서 별도의 설정이 필요함

### 2021.12.01

- 화면에 필요한 component들을 `atomic design`패턴의 방식으로 설계
- `react-router-dom`를 사용하여 front측에서 라우팅 진행 / 동시에 주소창의 url 직접 변경을 통해 이동시 반영을 위해 서버측 라우팅 작업 진행 (현재는 경로를 \*로 설정하여 모든 경로에 대하여 같은 파일(**client/build/index.html**)을 반환하도록 구현)
- `mongodb` / `mongoose` 설치 및 `mongoose.connect` 메서드를 활용하여 서버와 mongodb 연결
- `mongoose.Schema` 메서드를 활용하여 video model 생성
- `http-proxy-middleware`라이브러리 활용하여 frontend와 backend간의 데이터 통신 테스트 완료!
