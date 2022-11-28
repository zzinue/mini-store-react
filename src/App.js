
import { useEffect, useState } from 'react';
import './App.css';
import Category from './components/Category';
function App() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCategories(data)
      })
  }, [])
  const handleCategoryClick = id => {
    fetch("http://localhost:3001/products?catId=" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProducts(data)
      })
  }
  const renderCategories = () => {
    return categories.map(c =>
      <Category key={c.id} id={c.id} title={c.title} onCategoryClick={() => handleCategoryClick(c.id)} />
    )
  }
  const renderProducts = () => {
    return products.map(p => (
      <div key={p.id}>{p.title}</div>
    ))
  }

  return (
    <>
      <header>My Store</header>
      <section>
        <nav>
          {
            categories &&
            renderCategories()
          }
        </nav>
        <article>
          <h1>Products</h1>
          {products && renderProducts()}
        </article>
      </section>
      <footer>Footer</footer>
    </>
  );
}

export default App;
