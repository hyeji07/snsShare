import { useEffect } from 'react';

export default function KakaoChannelBtn() {
  /* kakao 채널추가 방법 2가지 
  1: 카카오에서 버튼 생성해주는 방법(알아서 이미지를 넣어주고 onClick안하고 처음 호출되어 작동됨) /kakao.Channel.createAddChannelButton
  2: 직접 버튼 만들어서 onClick으로 적용 /kakao.Channel.addChannel
   */

  //1.
  /*  const addKakaoChannel = () => {
    const kakao = window.Kakao;

    if (window.Kakao) {
      //인증이 안되어있는 경우 인증한다.
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }

      kakao.Channel.createAddChannelButton({
        container: '#kakao-talk-channel-add-button',
        channelPublicId: '_ZeUTxl', //카카오 채널 ID
        size: 'small',
        supportMultipleDensities: true,
      });
    }
  };

  useEffect(() => {
    window.onload = () => addKakaoChannel(); //처음 호출되어 나타나도록 설정(카카오 채널 추가) /script가 불러와져야 함수작동되어 버튼을 가져오므로 onload(페이지로드후 실행)사용
  }, []);
 */

  //2.
  const addKakaoChannel = () => {
    //카카오 스크립트가 로드된 경우
    const kakao = window.Kakao;

    kakao.Channel.addChannel({
      channelPublicId: '_ZeUTxl', //카카오 채널 ID
    });
  };

  //원래는 아래 코드였으나 SnsShare.jsx 에서 이미 SDK 불러와서 위 코드로 사용함
  /* const addKakaoChannel = () => {
    if (window.Kakao) {
      //카카오 스크립트가 로드된 경우
      const kakao = window.Kakao;

      //인증이 안되어있는 경우 인증한다.
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }

      kakao.Channel.addChannel({
        channelPublicId: '_ZeUTxl', //카카오 채널 ID
      });
    }
  }; */

  /* **SnsShare.jsx 에서 이미 SDK 불러와서 주석처리(만약 이 컴포넌트 개별 
   //kakao
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js'; //script 실행 src
    script.async = true; //다운완료시 바로 실행
    document.body.appendChild(script); //태그 생성 (크롬에서 확인 가능)

    script.onerror = () => console.error('Failed to load Kakao SDK'); //스크립트 로드 실패 시 에러 메시지 출력

    // 스크립트 로딩이 완료될 때 수행할 로직 (첫번째 인자인 load event는 정해져있는 것 꺼내씀/ 두번째 인자는 실행시키는 함수)
    script.addEventListener('load', () => {
      // Kakao SDK 로딩 완료 후 수행할 작업
      window.Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
    });

    // useEffect 함수의 반환값으로 이벤트 리스너를 제거하는 함수를 반환
    return () => {
      document.body.removeChild(script);
      script.removeEventListener('load', () => {
        // Kakao SDK 로딩 완료 후 수행할 작업
        window.Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY);
      });
    };
  }, []);
  
    */

  return (
    <>
      {/* 1번시 UI
       <div id='kakao-talk-channel-add-button'></div> */}

      {/* 2번시 UI */}
      <div id='kakao-talk-channel-add-button' onClick={addKakaoChannel}>
        <img
          src='https://developers.kakao.com/tool/resource/static/img/button/channel/add/channel_add_small.png'
          alt='카카오톡 채널 추가하기 버튼'
        />
      </div>
    </>
  );
}
