import Image from 'next/image'
import Footer from "../components/Footer.jsx";
import Link from 'next/link';

const myLoader = ({ src }) => {
  return `/${src}`
}

function App() {
  return (
    <div className="home">
      <div className="video-container">
        <div className="overlay"></div>
        <div className="video-content">
          <h1>Welcome to The GameDB</h1>
          <p>Where the game is never over</p>
        </div>
        {/* <video autoPlay loop muted id="video">
          <source src={video} type="video/mp4" />
        </video> */}
      </div>

      <div className="content">
        <div className="layout">
          <div className="split-column">
            <p>
              Here at The GameDB, our goal is to introduce to games you haven't
              played before. Whether it's browsing through our extensive museum
              of gaming history and finding something that catches your eye or
              choosing to play our featured game of the month. Each month, our
              users will vote for next month's game of the month! Create an
              account to participate in the voting process.
            </p>
          </div>
          <div className="game-of-the-month">
            <h2>Check out the game of the month</h2>
            <Link href="/gameofthemonth" className='image-container'>
              <Image
                loader={myLoader}
                src="question-mark.jpg"
                alt="game of the month"
                fill
              />
            </Link>
          </div>
          <div className="browse">
            <h2>Browse the Collection</h2>
            <div className="sort-by">
              <Link href="/Games" className='image-container'>
                <h4>Games</h4>
                <Image
                  loader={myLoader}
                  src="collection.jpg" 
                  alt="collection"
                  fill 
                />
                <div className="overlay overlay-border-radius"></div>
              </Link>
              <Link href="/Platforms" className='image-container'>
                <h4>Platforms</h4>
                <Image
                  loader={myLoader} 
                  src="platform.jpg"
                  alt="platform"
                  fill 
                />
              </Link>
              <Link href="/Decades" className='image-container'>
                <h4>Decade </h4>
                <Image
                  loader={myLoader} 
                  src="hourglass.jpg"
                  alt="collection"
                  fill 
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
