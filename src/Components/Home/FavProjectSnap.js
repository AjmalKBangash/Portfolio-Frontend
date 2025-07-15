import "./Snapshots.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { favoritesRefreshState, showFavourites } from "../../Store/store";
// RAECT ICONS
import { MdOpenWith } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";

function FavProjectSnap() {
  // const [expanded, setExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  let [carousel, setCarousel] = useState(false);
  let [imgSrc, setImgSrc] = useState("");
  let [imgID, setImgID] = useState();
  const [wideView, setWideView] = useState(false);
  const dispatch = useDispatch();
  const showFavourites_var = useSelector((state) => state.showFavourites);
  const favoritesRefreshState_var = useSelector(
    (state) => state.favoritesRefreshState
  );
  const [favoritesLocalState, setFavouritesLocalState] = useState(
    JSON.parse(Cookies.get("favoritePictures") || "[]")
  );
  const controls = useAnimation();
  ////////////// EXTRACTING IMAGES
  useEffect(() => {
    setFavouritesLocalState(
      JSON.parse(Cookies.get("favoritePictures") || "[]")
    );
  }, [favoritesRefreshState_var]);
  function ViewImage(e) {
    setCarousel(true);
    setImgSrc(e.image);
    setImgID(e.img_no);
  }
  function closeCarouselFun() {
    setCarousel(!carousel);
    setWideView(false);
  }

  function preFunCarousel() {
    //   EXTRACTING FAV SNAPS FROM COOKIES
    const favorites = JSON.parse(Cookies.get("favoritePictures") || "[]");
    const isFirstSlide = imgID === 0;
    if (isFirstSlide) {
      // setImgID(8);
      setImgID(favorites.length - 1);
    } else {
      setImgID(imgID - 1);
    }
  }
  function nxtFunCarousel() {
    const favorites = JSON.parse(Cookies.get("favoritePictures") || "[]");
    const isLastSlide = imgID === favorites.length - 1;
    if (isLastSlide) {
      setImgID(0);
    } else {
      setImgID(imgID + 1);
    }
    setImgSrc(favorites[imgID]);
  }
  // THIS USEEFFECT IS FOR PREFUNCAROUSEL AND NXTFUNCAROUSEL
  useEffect(() => {
    const favorites = JSON.parse(Cookies.get("favoritePictures") || "[]");
    setImgSrc(favorites[imgID]);
  }, [imgID]);
  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  // DELETING COOKIES
  function removeItemFromArray(arr, item) {
    const index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  function handleClick(photoOnly) {
    const favorites = JSON.parse(Cookies.get("favoritePictures") || "[]");

    // Remove the photoOnly from favorites array
    removeItemFromArray(favorites, photoOnly);

    // Update the cookie with the new favorites array
    Cookies.set("favoritePictures", JSON.stringify(favorites), {
      expires: 7,
    }); // Expires in 7 days
    dispatch(favoritesRefreshState(favoritesRefreshState_var + 1));
  }
  // ANIMATING FAVOURITES FROM RIGHT TO LEFT AND FROM LEFT TO RIHT
  useEffect(() => {
    if (showFavourites_var) {
      // When display becomes true, animate from right to left
      controls.start({ x: 0, display: "flex" }); // Animate to x: 0 (visible position)
    } else {
      // When display becomes false, animate from left to right and then hide
      controls
        .start({ x: "100%" })
        .then(() => controls.set({ display: "none" }));
    }
  }, [showFavourites_var, controls]);
  return (
    <motion.div
      className={`my-fav-top ${wideView ? "my-fav-top3" : ""}`}
      initial={{ x: "100%", display: "none" }} // Initial position off-screen to the right and hidden
      animate={controls} // Use the controls for animation
      transition={{ duration: 0.3 }} // Adjust duration as needed
    >
      <IoIosCloseCircle
        className="close-fav"
        onClick={() => {
          dispatch(showFavourites(false));
        }}
      />
      <div className="snapshots-fav">
        <h1>MT FAVOURITES</h1>
        <h4 style={{ margin: "0px 8px" }}>
          Please don't hesitate to get in touch!
        </h4>
        {/* <h4>
          Please feel free to reach out for any previously saved projects or if
          you need assistance with any of your projects.
        </h4> */}
        <div className="gallary-fav">
          {favoritesLocalState && favoritesLocalState.length > 0 ? (
            favoritesLocalState.map((img, index) => {
              return (
                <div
                  key={index}
                  className={`gallary-inside-fav ${
                    hoveredIndex === index ? "gallary-inside02-fav" : ""
                  }`}
                  onMouseOver={() => handleMouseOver(index)}
                  onMouseOut={handleMouseOut}
                >
                  <img src={img} alt="project images" />
                  <span
                    className={`view-img-icon ${
                      hoveredIndex === index ? "view-img-icon02" : ""
                    }`}
                    onClick={() => {
                      ViewImage({ image: img, img_no: index });
                      setWideView(true);
                    }}
                  >
                    <MdOpenWith />
                  </span>
                  <span
                    className={`fav-img-icon ${
                      hoveredIndex === index ? "fav-img-icon02" : ""
                    }`}
                    onClick={() => handleClick(img)}
                  >
                    <MdFavorite />
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{ marginTop: "10px" }}>No saved Project-Snapshots!</div>
          )}
        </div>
        <div className={carousel ? "carousel open" : ""}>
          <span
            onClick={preFunCarousel}
            className={carousel ? "slidingCarousel" : "slidingCarouselClose"}
            style={{ marginRight: "80%" }}
          >
            <FaChevronLeft />
          </span>
          <span
            onClick={closeCarouselFun}
            className={carousel ? "closeCarousel" : "slidingCarouselClose"}
          >
            <MdClose />
          </span>

          <img
            className={carousel ? "" : "slidingCarouselClose"}
            src={imgSrc}
            alt="saved favourites project"
          />
          <span
            onClick={nxtFunCarousel}
            className={carousel ? "slidingCarousel" : "slidingCarouselClose"}
            style={{ marginLeft: "80%" }}
          >
            <FaChevronRight />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default FavProjectSnap;
