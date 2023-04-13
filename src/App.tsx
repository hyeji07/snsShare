import KakaoChannelBtn from '@components/KakaoChannelBtn';
import SnsShare from '@components/SnsShare';
import Main from '@pages/Main';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SnsShare />} />
          {/*  <Route path='/channel' element={<KakaoChannelBtn />} /> */}
          <Route path='/main' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
