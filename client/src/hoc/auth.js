import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
  // SpecificComponent
  // 1. auth에 담을 컴포넌트

  // option
  // 1. null  =>  아무나 출입 가능한 페이지
  // 2. true  =>  로그인한 유저만 출입 가능한 페이지
  // 3. false =>  로그인한 유저는 출입 불가능한 페이지

  // adminRoute = null
  // 1. 기본값이 null 이라는 의미
  // 2. true  =>  admin 계정만 접근 가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }

          // 로그인 한 상태
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            if (!option) {
              props.history.push('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
