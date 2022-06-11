
import './App.css';
import { useEffect, useState } from "react";
import NestedListView from './components/NestedListView';
import BreadcrumbHeader from './components/BreadcrumbHeader';
import { data } from './data';

function App() {
  const [breadcrumbs,setBreadcrumbs] = useState(['home'])

  const [currentView, setCurrentView] = useState('home')

  const [renderItems, setRenderItems] = useState(getNestedItems(data,'home'))

  const handleGoForward = (id) => {
    setBreadcrumbs([...breadcrumbs, id])
    setCurrentView(id)
  }

  const handleGoBack = (id) =>{
    console.log(`backid: ${id}`)
    let truncatedPath = [...breadcrumbs]
    truncatedPath.pop()
    setBreadcrumbs(truncatedPath)
    setCurrentView(id)
  }

  const handleItemClick = (event) => {
    console.log('Handle Triggered')
    console.log(`event: ${event.target.id}`)
    console.log(`clicktype: ${event.target.className}`)
    if(event.target.className === 'backwards-button'){
      handleGoBack(event.target.id)
    } else{
      handleGoForward(event.target.id)
    }
  }

  useEffect(() => {
    let displayItems = getNestedItems(data, currentView)
    console.log(`displayItems: ${displayItems}`)
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
