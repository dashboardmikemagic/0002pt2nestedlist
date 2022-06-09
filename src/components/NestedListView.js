import React from 'react'

export default function NestedListView({ handleItemClick, renderItems}) {
  console.log(`renderItems: ${renderItems}`)
  return (
    <div>
      <p>NestedListView</p>
      {renderItems.map((item) => (
        <button  key={item.menu['id']} clicktype='forwards' id={item.menu['id']} onClick={handleItemClick}>{item['text']}</button>
      )
      )

      }
    </div>

  )
}

