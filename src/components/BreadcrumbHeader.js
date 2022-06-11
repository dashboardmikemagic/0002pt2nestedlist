import React from 'react'

export default function BreadcrumbHeader({handleItemClick,breadcrumbs}) {
  console.log(`breadcrumbs: ${breadcrumbs}`)
  return (
    <div>
      {breadcrumbs.length !== 1 ? <button onClick={handleItemClick} className='backwards-button' id={breadcrumbs[breadcrumbs.length-2]}>Back</button> : null }
    </div>
  )
}
