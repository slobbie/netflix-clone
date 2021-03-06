import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Search from './components/Search';
import Tv from './page/Tv';
import Nav from './layout/Nav';
import { theme } from './theme';
import Movie from './page/Movie';
import Detail from './components/Detail';
import NotFound from './components/NotFound';
import Home from './page/Home';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movie />}>
          <Route path=':movieId' element={<Detail />} />
        </Route>
        <Route path='/tv' element={<Tv />}>
          <Route path=':tvId' element={<Detail />} />
        </Route>
        <Route path='/search' element={<Search />}>
          <Route path='movies/:movieId' element={<Detail />} />
          <Route path='tv/:tvId' element={<Detail />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>

      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`

  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp, 
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
   color: ${(props) => props.theme.white.darker} ;
 
}
a{
  text-decoration: none;
  color: inherit;
} 
`;
