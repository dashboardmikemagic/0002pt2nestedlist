
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
    let displayItems = getNestedItems(data, currentView)
    setRenderItems(displayItems)
  }, [currentView])
  
  function getNestedItems(theObject, menuId) {
    console.log(`Target Menu Id: ${menuId}`)
      var result = null;
      if(theObject instanceof Array) {
          for(var i = 0; i < theObject.length; i++) {
              result = getNestedItems(theObject[i],menuId);
              if (result) {
                  break;
              }   
          }
      }
      else
      {
          for(var prop in theObject) {
              //console.log(prop + ': ' + theObject[prop]);
              if(prop === 'id') {
                  if(theObject[prop] === menuId) {
                      return theObject['items'];
                  }
              }
              if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                  result = getNestedItems(theObject[prop],menuId);
                  if (result) {
                      break;
                  }
              } 
          }
      }
      return result;
  }
  
  
  return (
    <div className="App">
      <BreadcrumbHeader handleItemClick={handleItemClick} breadcrumbs={breadcrumbs} />
      <NestedListView handleItemClick={handleItemClick} renderItems={renderItems} />

    </div>
  );
}

export default App;
