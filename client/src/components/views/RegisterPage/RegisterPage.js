import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'; // .history 사용 목적

// 회원가입 페이지
function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  // 이메일 입력 이벤트
  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  // 이름 입력 이벤트
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };
  // 비밀번호 입력 이벤트
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  // 비밀번호 확인 입력 이벤트
  const onPasswordConfirmHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  // 회원가입 버튼 클릭 이벤트
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    // dispatch를 이용하여 액션을 처리한다.   // dispatch(action)
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Error');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}></input>

        <label>Password</label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onPasswordConfirmHandler}
        ></input>

        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
