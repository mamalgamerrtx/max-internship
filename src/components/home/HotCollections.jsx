import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

const URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const carouselOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 },
  },
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCollections() {
      try {
        const response = await axios.get(URL);
        setCollections(response.data);
      } catch (error) {
        console.error("Failed to load hot collections:", error);
      } finally {
        setLoading(false);
      }
    }
    getCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading
            ? (
              <div className="col-lg-12">
                <OwlCarousel key="skeleton" className="owl-theme" {...carouselOptions}>
                  {new Array(4).fill(0).map((_, index) => (
                  <div className="nft_coll" key={index}>
                    <div className="nft_wrap">
                      <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="60px" height="60px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="100px" height="20px" />
                      <br />
                      <Skeleton width="60px" height="16px" />
                    </div>
                  </div>
                  ))}
                </OwlCarousel>
              </div>
            )
            : (
              <div className="col-lg-12">
                <OwlCarousel key="loaded" className="owl-theme" {...carouselOptions}>
                  {collections.map((collection) => (
                  <div className="nft_coll" key={collection.id}>
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                  ))}
                </OwlCarousel>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
