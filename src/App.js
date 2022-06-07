
import './App.css';
import { useEffect, useState } from "react";
import NestedListView from './components/NestedListView';
import BreadcrumbHeader from './components/BreadcrumbHeader';

function App() {
  const [breadcrumbs,setBreadcrumbs] = useState([])

  const [currentView, setCurrentView] = useState('ROOT')

  const [renderItems, setRenderItems] = useState([])

  const handleSelection = (id) => {
    setBreadcrumbs([...breadcrumbs, id])
    setCurrentView(id)
  }

  const handleGoBack = () =>{
    let truncatedPath = [...breadcrumbs]
    truncatedPath.pop()
    setBreadcrumbs(truncatedPath)
    setCurrentView(...breadcrumbs.slice(-1))
  }

  useEffect(() => {
    setRenderItems(currentView)  
  }, [currentView])
  
  
  return (
    <div className="App">
      <BreadcrumbHeader handleGoBack={handleGoBack} breadcrumbs={breadcrumbs} />
      <NestedListView handleSelection={handleSelection} renderItems={renderItems} />

    </div>
  );
}

export default App;
