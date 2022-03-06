import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies } from '../Api/Api';
import { IGetMoviesDataModel } from '../Api/model/movie-data-model';
import { makeImgePath } from './utils';

const rowVariants = {
  // 보이지 않을때
  hidden: {
    // 사용자 화면의 시작점
    x: window.outerWidth + 5,
  },
  // 보일때
  visble: {
    x: 0,
  },
  // 사라질때
  exit: {
    x: -window.outerWidth - 5,
  },
};

const Home = () => {
  // API 에서 사용할 정보를 받아온다.useQuery 는 두가지 키값을 제공해줘야한다.
  //  사용할 데이터의 아이디를 제공해주는것 key / value  / 사용할  API를 선언한 함수
  // useQuery 사용할 데이터와 로딩중인지 체크 해준다.
  const { data, isLoading } = useQuery<IGetMoviesDataModel>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  console.log(data, isLoading);

  //AnimatePresence 는 컴포넌트가 render 되거나 destroy 될때 효과를 줄수 있다.
  // slide 이벤트를 위해 index를 만들어 준다.
  const [index, setIndex] = useState(0);
  //setIndex 의 이전 상태를 기억하고 그 상태에서 index + 1
  const incrassIndex = () => {
    if (data) {
      // indx 를 증가시키기전 체크
      if (leaving) return; // leaving 이 true 라면  아무것도 하지 않는다.
      setLeaving(true); // 사용자가 클릭이벤트를 발생 시키면 상태를 true로 바꿔준다.
      // 총 영화의 갯수   -1 인 이유 이미 메인 화면에서 한장의 사용하고 있기 떄문에다.
      const totalMovie = data?.results.length - 1;
      // 영화를 총갯수 구하는법  내림 처리 20개 여서 한개가 남기때문에 내림 처리해준다
      const maxIndex = Math.floor(totalMovie / offset) - 1; // page 가 0 에서 시작하기 때문에 -1
      // index 가 max로 되돌아가면 0 아니면 증가시킨다.
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); // 최초에 false로 실행되었지만 상태값이 true 로 바뀌었기때문에 exit 이 중복되지 않는다.
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  // exit 버그를 해결을 위한 상태값
  const [leaving, setLeaving] = useState(false);
  // 페이지의 크기
  const offset = 6;

  // index
  let page = 0;
  return (
    <Wrapper style={{ height: '200vh' }}>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* 이미지가 존재 하지 않으면 ""  출력 */}
          <Banner
            onClick={incrassIndex}
            bgPhoto={makeImgePath(data?.results[0].backdrop_path || '')}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            {/* //onExitComplete 에 함수를 넣으면 exit 이 끝났을때 실행된다. */}
            {/* // 기본 셋팅 false */}
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial='hidden'
                animate='visble'
                exit='exit'
                key={index}
                transition={{ type: 'tween', duration: 1 }}
              >
                {/* // 이미 사용한 이미지는 제외 시킨다 */}
                {/* // 페이지크기만큼 인덱스를 곱해준다 ,페이지 크기 곱하기 보여지는 페이지 더하기 페이크 크기 */}
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgPhoto={makeImgePath(movie.backdrop_path, 'w500')}
                    ></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 50px;
  margin-bottom: 12px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;
