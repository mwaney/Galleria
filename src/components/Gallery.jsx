import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Search from "./Search";
import SignOutButton from "./SignOutButton";
import Spinner from "./Spinner";
import GridLayout from "react-grid-layout";
import "./Gallery.css";

const Gallery = ({ galleryImages }) => {
  const [imageArrangement, setImageArrangement] = useState(galleryImages);
  const [searchTag, setSearchTag] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredImages = imageArrangement.filter((image) =>
    image.tag.includes(searchTag.toLowerCase())
  );

  function handleImageLoad() {
    setLoading(false);
  }

  const onLayoutChange = (layout) => {
    // Update the imageArrangement state when the layout changes
    setImageArrangement((prevArrangement) =>
      layout.map((item) => {
        const image = prevArrangement.find((img) => img.id === item.i);
        return { ...image, x: item.x, y: item.y };
      })
    );
  };

  const layout = filteredImages.map((image, index) => ({
    i: image.id,
    x: index % 3,
    y: Math.floor(index / 3),
    w: 1,
    h: 2,
  }));

  return (
    <div className="galleryApp centerColumn">
      <div className="searchGal">
        <Search searchTag={searchTag} setSearchTag={setSearchTag} />
      </div>
      <div className="galleryContainer">
        {loading ? (
          <Spinner />
        ) : filteredImages.length > 0 ? (
          <GridLayout
            className="layout"
            layout={layout}
            cols={3}
            rowHeight={200}
            width={900}
            isResizable={true}
            isDraggable={true}
            onLayoutChange={onLayoutChange}
          >
            {filteredImages.map((image) => (
              <div key={image.id}>
                <img
                  src={image.url}
                  alt=""
                  onLoad={handleImageLoad}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </GridLayout>
        ) : (
          <div className="no-matching-images">
            No images match the search criteria.
          </div>
        )}
      </div>
      <SignOutButton />
    </div>
  );
};

Gallery.propTypes = {
  galleryImages: PropTypes.array,
};

export default Gallery;
