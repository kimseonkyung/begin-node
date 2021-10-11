import './App.css';
import {
  BrowserRouter as Router,
  Switch /* Switch로 Route를 감싸게되면 첫번째 component를 발견시 나머지 component는 버린다. */,
  Route /* path와 매칭되는 component만 보여준다. */,
  Link /* a태그와 비슷하나 페이지를 새로고침 하지 않고 이동한다. */,
  NavLink /* 링크 클릭시 해당 돔에 class="active" 가 생김 */,
} from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
