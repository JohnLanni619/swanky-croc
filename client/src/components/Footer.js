import '../styles/footer-styles.css';

export default function Footer() {
    return (
        <footer>
            <div className="grid-layout">
                <div className="col-1">
                    <div>
                        <h4>Support</h4>
                        <p>Help Center</p>
                        <a href="https://twitter.com/rawgtheworld" target="__blank">Api Status</a>
                        <p>Contact Us</p>
                        <p>Documentation</p>
                    </div>
                    <div>
                        <h4>Info</h4>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>Legal</p>
                    </div>
                </div>
                <div className="col-2">
                    <div>
                        <input type="text" placeholder="Enter your email" />
                        <button>Sign Up</button>
                    </div>
                    <div className="icon-container">

                    </div>
                </div>
            </div>
            <h5>Powered by RAWG API | Built by SwankyCroc LLC</h5>

        </footer>
    )
}