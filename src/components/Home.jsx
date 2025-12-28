import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

return (
  <div className='home'>
    <section className='main'>
      <h1>Welcome to Bloom-bites</h1>
      <p>
        Discover meaningful gifts for every occasion, from stunning blooms to delicious treats and soothing candles, all in one place.
      </p>
      </section>
      <section className='categories'>
        <div className='card' onClick={() => navigate('/flowers')}>
<img src="https://samedayflowers.pk/wp-content/uploads/2024/09/image_b277b755-2518-49c0-90ea-41c782e5ea99_540x-jpg.webp" alt="Flowers"/>
<h3>Flowers</h3>
<p>Explore our flowers collection</p>
        </div>
                <div className='card' onClick={() => navigate('/candles')}>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9mKnZtou4z-1cQzf_4dcUXL5o_W9DPbhLA&s" alt="Candles"/>
<h3>Candles</h3>
<p>Explore our candles collection</p>
        </div>
                <div className='card' onClick={() => navigate('/cakes')}>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1xnFFWOyNy--anTWgCbcnAzy3NIUhp6Bczg&s" alt="Cake"/>
<h3>Cakes</h3>
<p>Explore our cakes collection</p>
        </div>
        </section>
  </div>

)
}

export default Home
