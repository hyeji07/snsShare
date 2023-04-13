import { useEffect } from 'react';
import facebook from '@assets/images/ico-user_facebook.png';
import naver from '@assets/images/naver.png';
import kakao from '@assets/images/ico-user-kakao.png';
import './snsShare.scss';

export default function SnsShare() {
  const link = 'http://www.naver.com';
  const link2 = 'http://localhost:3000/main';

  const snsLists = [
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
      `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      '페이스북 공유하기',
      'width=600,height=800,location=no,status=no,scrollbars=yes'
    );
  };

  //naver
  const shareNaver = () => {
    window.open(
      `https://share.naver.com/web/shareView?url=${link}&title=네이버 공유하기`
    );
  };

  //kakao
  const shareKakao = () => {
    if (window.Kakao === undefined) {
      return;
    }

    if (window.Kakao) {
      //카카오 스크립트가 로드된 경우
      const kakao = window.Kakao;

      //인증이 안되어있는 경우 인증한다.
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }

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
    }
  };

  //kakao
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className='snsShareContainer'>
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
              : ''
          }
          key={item.name}
        >
          <img className='shareicon' src={item.src} alt={`${item.name} logo`} />
        </button>
      ))}
    </div>
  );
}
