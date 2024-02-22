import {BrowserRouter, Route, Routes} from 'react-router-dom'

import router from './router'
import MainLayout from './layouts/Main';
import OnlyContent from './layouts/OnlyContent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            router.map((route, index) => {
      
              let Layout = MainLayout

              const Comp = route.element

              if(route.layout){
                Layout = route.layout
              }else if(route.layout === null){
                Layout = OnlyContent
              }
              
              return <Route key={index} path={route.path} element={<Layout><Comp /></Layout>}/>
            })
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
