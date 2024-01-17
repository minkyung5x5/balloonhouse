# Balloon House

<h4>💡 Wiggle Wiggle 홈페이지를 인터랙티브하게 만들어보기</h4>
<h4>💡 집을 클릭하면 풍선이 하나씩 떠오른다.</h4>
<h4>💡 풍선을 클릭하면 풍선이 터진다.</h4>

### 개발 과정
1. 주요 요소 및 전체적인 레이아웃 구현
- 풍선, 줄, 하늘, 구름, 무지개 CSS로 구현
- 집, 꽃, 곰 요소 이미지 활용해 사용
- 인터랙션 불필요한 요소 Background Component로 구분하여 개발
2. 인터랙션 요소 추가
- 풍선 클릭시 풍선 삭제
- 집 클릭시 풍선 추가
- 풍선의 색과 모양을 랜덤하게 선택
3. 기능 추가
- 첫 화면 랜딩시 풍선이 하나씩 떠오르도록 구현
- 마우스 호버시, 어떤 요소가 선택되었는지 확인되도록 구현
- 집 클릭시, 집에서 풍선이 떠오르도록 애니메이션 구현 - 줄의 길이/각도 계산
- 풍선 클릭시 터지는 애니메이션 구현 - Bust Library 사용
- 모바일 환경에서도 작동되도록 구현 - window.innerWidth 사용 

### 배포 링크
<a href="https://minkyung5x5.github.io/balloonhouse/">https://minkyung5x5.github.io/balloonhouse</a>

### 빌드 방법

1. 깃헙 레포지토리 클론

   ```$ git clone https://github.com/minkyung5x5/balloonhouse.git```
2. Terminal에서 패키지 설치
   
   ```$ npm install```
   
3. Terminal에서 실행
   
   ```$ npm run start```
