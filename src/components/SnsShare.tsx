import { useEffect } from 'react';
import facebook from '@assets/images/ico-user_facebook.png';
import naver from '@assets/images/naver.png';
import kakao from '@assets/images/ico-user-kakao.png';
import './snsShare.scss';
import KakaoChannelBtn from './KakaoChannelBtn';
import { SnsList } from 'interface/SnsInterface';

export default function SnsShare() {
  const link1 = 'https://www.naver.com/'; //페이스북, 네이버는 localhost연결이 안돼서 네이버로 설정해둠
  const link2 = 'http://localhost:3000/main';

  const snsLists: SnsList[] = [
    {
      name: 'faceBook',
      src: facebook,
    },
    {
      name: 'naver',
      src: naver,
    },
    {
      name: 'kakao',
      //src: kakao, //내가 저장한 이미지 사용시
      src: 'https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png', //카카오톡 이미지 사용시
    },
  ];

  //faceBook
  const shareFaceBook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${link1}`,
      '페이스북 공유하기',
      'width=600,height=800,location=no,status=no,scrollbars=yes'
    );
  };

  //naver
  const shareNaver = () => {
    window.open(
      `https://share.naver.com/web/shareView?url=${link1}&title=네이버 공유하기`
    );
  };

  //kakao
  const shareKakao = () => {
    //카카오 스크립트가 로드된 경우
    const kakao = window.Kakao;

    kakao.Share.sendDefault({
      objectType: 'feed', // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: 'title', // 인자값으로 받은 title(공유톡에서 나타남)
        description: '설명 #딸기 #카페', // 인자값으로 받은 title(공유톡에서 나타남)
        imageUrl:
          'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png', //공유받은 메시지 위에 뜨는 대표사진
        link: {
          mobileWebUrl: link2, // 인자값으로 받은 route(uri 형태)/카카오는 개발자에서 허용한 도메인만 가능
          webUrl: link2,
        },
      },
      /* social: {
          likeCount: 286, //좋아요수
          commentCount: 45, //댓글수
          sharedCount: 845, //공유수
        }, */ //안해도 상관 없음
      buttons: [
        {
          title: '사이트로 이동',
          link: {
            mobileWebUrl: link2,
            webUrl: link2,
          },
        },
        /*  {
          title: 'title',
          link: {
            mobileWebUrl: route,
            webUrl: route,
          },
        }, */ //2개버튼 만들기도 가능(버튼 클릭시 이동)
      ],
    });
  };

  //kakao (SnsShare, KakaoChannelBtn에서 공통사용하고 있음)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js'; //script 실행 src
    script.async = true; //다운완료시 바로 실행
    document.body.appendChild(script); //태그 생성 (크롬에서 확인 가능)

    /* script.onerror = () => console.error('Failed to load Kakao SDK'); //스크립트 로드 실패 시 에러 메시지 출력 */

    // 스크립트 로딩이 완료될 때 수행할 로직 (첫번째 인자인 load event는 정해져있는 것 꺼내씀/ 두번째 인자는 실행시키는 함수)
    script.addEventListener('load', () => {
      // Kakao SDK 로딩 완료 후 수행할 작업(init:SDK초기화,키설정)
      window.Kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY); //카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출
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

  return (
    <div className='snsShareContainer'>
      {/* SNS 공유하기(faceBook,naver,kakao) */}
      {snsLists.map((item, i) => (
        <button
          className='share-wrapper'
          onClick={
            item.name === 'faceBook'
              ? shareFaceBook
              : item.name === 'naver'
              ? shareNaver
              : item.name === 'kakao'
              ? shareKakao
              : undefined
          }
          key={item.name}
        >
          <img className='shareicon' src={item.src} alt={`${item.name} logo`} />
        </button>
      ))}

      {/* kakao 채널 추가 */}
      <KakaoChannelBtn />
    </div>
  );
}
