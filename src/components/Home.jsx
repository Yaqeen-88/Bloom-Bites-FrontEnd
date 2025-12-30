import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home">
      <section className="main">
        <h1>Welcome to Bloom-bites</h1>
        <p>
          Discover meaningful gifts for every occasion, from stunning blooms to
          delicious treats and soothing candles, all in one place.
        </p>
      </section>
      <section className="categories">
        <div className="card" onClick={() => navigate("/flowers")}>
          <img
            src="https://i.pinimg.com/736x/a6/52/2c/a6522c053a912205faf451bf7732fe51.jpg"
            alt="Flowers"
          />
          <h3>Flowers</h3>
          <p>Explore our flowers collection</p>
        </div>
        <div className="card" onClick={() => navigate("/candles")}>
          <img
            src="https://m.media-amazon.com/images/I/71CIs17-OzL.jpg"
            alt="Candles"
          />
          <h3>Candles</h3>
          <p>Explore our candles collection</p>
        </div>
        <div className="card" onClick={() => navigate("/cake")}>
          <img
            src="https://i.pinimg.com/736x/23/bd/65/23bd65437e45f02562a867a0afd8044d.jpg"
            alt="Cake"
          />
          <h3>Cakes</h3>
          <p>Explore our cakes collection</p>
        </div>
      </section>
    </div>
  )
}

export default Home
