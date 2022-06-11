import React from 'react'

export default function NestedListView({ handleItemClick, renderItems}) {
  console.log(`renderItems: ${renderItems}`)
  return (
    <div>
      {renderItems.map((item) => (
        <li key={item['text']}>
          {item.hasOwnProperty('menu') ? (
            <button className='forwards-button' id={item.menu['id']} onClick={handleItemClick}>{item['text']}</button>
          ) : (
            <button 
              onClick={(e) => {
              e.preventDefault()
              window.location.href=item['link']}}
              >
              {item['text']}
            </button>
          )}
          
        </li>
      ))}
    </div>

  )
}

