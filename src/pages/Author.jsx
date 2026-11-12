import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getAuthor() {
      setLoading(true);
      try {
        const response = await fetch(`${URL}?author=${authorId}`);
        setAuthor(await response.json());
      } catch (error) {
        console.error("Failed to load author:", error);
      } finally {
        setLoading(false);
      }
    }
    getAuthor();
  }, [authorId]);

  function handleCopy() {
    navigator.clipboard.writeText(author.address);
  }

  function handleFollow(event) {
    event.preventDefault();
    setIsFollowing((following) => !following);
  }

  if (!loading && !author) {
    return (
      <div className="container mt90 text-center">
        <h2>Author not found</h2>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {loading ? (
                      <div className="profile_avatar">
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="200px" height="28px" />
                            <span className="profile_username">
                              <Skeleton width="100px" height="16px" />
                            </span>
                            <span className="profile_wallet">
                              <Skeleton width="250px" height="16px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    ) : (
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">@{author.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text" onClick={handleCopy}>
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton width="150px" height="40px" />
                      ) : (
                        <>
                          <div className="profile_follower">
                            {author.followers + (isFollowing ? 1 : 0)} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={handleFollow}>
                            {isFollowing ? "Unfollow" : "Follow"}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || []}
                    authorImage={author?.authorImage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
