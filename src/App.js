
import './App.css';
import { useEffect, useState } from "react";
import NestedListView from './components/NestedListView';
import BreadcrumbHeader from './components/BreadcrumbHeader';
import { data } from './data';

function App() {
  const [breadcrumbs,setBreadcrumbs] = useState([])

  const [currentView, setCurrentView] = useState('ROOT')

  const [renderItems, setRenderItems] = useState([])

  const handleGoForward = (id) => {
    setBreadcrumbs([...breadcrumbs, id])
    setCurrentView(id)
  }

  const handleGoBack = (id) =>{
    let truncatedPath = [...breadcrumbs]
    truncatedPath.pop()
    setBreadcrumbs(truncatedPath)
    setCurrentView(id)
  }

  const handleItemClick = (id) => {
    if(id === breadcrumbs[breadcrumbs.length-1]){
      handleGoBack(id)
    } else{
      handleGoForward(id)
    }
  }

  useEffect(() => {
    let displayItems = findNestedMenu(data, currentView, 'id')
    setRenderItems(displayItems)
  }, [currentView])
  
  const findNestedMenu = (array, menuId, key) => (
    array.reduce((a, menu) => {
      if (a) return a;
      if (menu.id === menuId) return menu.items;
      if (menu[key]) return findNestedMenu(menu[key], menu, key)
    }, null)
  )
  
  
  return (
    <div className="App">
      <BreadcrumbHeader handleItemClick={handleItemClick} breadcrumbs={breadcrumbs} />
      <NestedListView handleItemClick={handleItemClick} renderItems={renderItems} />

    </div>
  );
}

export default App;
