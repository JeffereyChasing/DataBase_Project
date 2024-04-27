import React, { useEffect, useState } from 'react'
import axios from 'axios'

const View= () => {
    const [interest,setInterest] = useState([])

    useEffect(()=>{
        axios.get("http://localthost:3600/server/view")
        .then(result => {
            console.log(result.data)
        })
    },[])

  return (
    <div>
        <div>
<table>
    <thead>
        <tr>
            <th>username</th>
        </tr>
    </thead>
    <tbody>

    </tbody>

</table>

        </div>
        

    </div>
  )
}

export default View