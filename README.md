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
