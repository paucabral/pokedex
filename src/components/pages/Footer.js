import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid pb-0 mb-0 justify-content-center text-light footer-fixed">
          <footer>
              <div className="row my-5 justify-content-center py-0">
                  <div className="col-11">
                      <div className="row ">
                          <div className="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                              <Link to={{ pathname: "https://paucabral.github.io" }} target="_blank" style={{ textDecoration: "none" }}><h3 class="text-white mb-md-0 mb-5 bold-text">PAU<span style={{ fontFamily: "Roboto Cn, sans-serif", fontWeight: "1000", color: "#0abdc6" }}>CABRAL</span></h3></Link>
                          </div>
                          <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                              <h6 className="mb-3 mb-lg-4 bold-text text-muted"><b>MENU</b></h6>
                              <ul className="list-unstyled">
                                  <li>
                                    <Link to={{ pathname: "https://paucabral.github.io" }} target="_blank" className="text-white" style={{ textDecoration: "none" }}>Home</Link>
                                  </li>
                                  <li>
                                    <Link to={{ pathname: "https://paucabral.github.io/#hobbies" }} target="_blank" className="text-white" style={{ textDecoration: "none" }}>About</Link>
                                  </li>
                                  <li>
                                    <Link to={{ pathname: "https://paucabral.github.io/blog" }} target="_blank" className="text-white" style={{ textDecoration: "none" }}>Blog</Link>
                                  </li>
                              </ul>
                          </div>
                          <div className="col-xl-2 col-md-4 col-sm-4 col-12 scroll-to-top">
                            {isVisible && (
                              <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><Link to="#" className="text-white" style={{ textDecoration: "none" }} onClick={scrollToTop}><b>BACK TO TOP</b>&nbsp;&nbsp;<FontAwesomeIcon icon={faLevelUpAlt}/> </Link></h6>
                            )}
                          </div>
                      </div>
                      <div className="row ">
                          <div className="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                            <p>All Rights Reserved.</p>
                          </div>
                          <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                              <Link to={{ pathname: "https://github.com/paucabral/pokedex" }} target="_blank" style={{ textDecoration: "none" }}><h6 className="text-white bold-text"><b>View this project on Github</b> <FontAwesomeIcon icon={faGithub}/></h6> </Link>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
      </div>
    </React.Fragment>
  )
}

export default Footer
