import React from 'react'
import api from '../../api'

const Table = ({isAdmin,rowData,handlerefetch}) => {
  
  return (
    <table className="ui  single line celled table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>DOB</th>
      <th>Created at</th>
      
    </tr>
  </thead>
  <tbody>
    {rowData.map((row)=>{
        // console.log(row);
        return (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.dateOfBirth}</td>
            <td>{row.created_at}</td>
            
            </tr>
            )
    })}
  </tbody>
</table>
  )
}

export default Table