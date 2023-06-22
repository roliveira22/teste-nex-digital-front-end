import { useEffect, useState } from 'react'
import api from '../../services/api'

import { Container } from './styles'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    
      async function loadProducts(){
        const clientInfo = await localStorage.getItem('nexDigital:userToken')

        const {data} = await api.get('products', {
          token: JSON.parse(clientInfo)
        })

        setProducts(data)
      }
      loadProducts()
  }, [])
  
  return (
    <Container>
      <h1>Home</h1>
      {products.map( product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <img height={300} src={product.path}/>
        </div>
      ))}
    </Container>
  )
}

export default Home
