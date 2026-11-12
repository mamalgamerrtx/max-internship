import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

const URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

// rewind instead of loop: Owl's loop clones cards as plain HTML, which would freeze their countdowns.
const carouselOptions = {
  rewind: true,
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

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await axios.get(URL);
        setItems(response.data);
      } catch (error) {
        console.error("Failed to load new items:", error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading
            ? (
              <div className="col-lg-12">
                <OwlCarousel key="skeleton" className="owl-theme" {...carouselOptions}>
                  {new Array(4).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="de_countdown">
                      <Skeleton width="80px" height="14px" borderRadius="7px" />
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton width="100%" borderRadius="8px" />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width="140px" height="18px" />
                      <div className="nft__item_price">
                        <Skeleton width="70px" height="16px" />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width="30px" height="14px" />
                      </div>
                    </div>
                  </div>
                  ))}
                </OwlCarousel>
              </div>
            )
            : (
              <div className="col-lg-12">
                <OwlCarousel key="loaded" className="owl-theme" {...carouselOptions}>
                  {items.map((item) => (
                  <div className="nft__item" key={item.id}>
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
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

export default NewItems;
