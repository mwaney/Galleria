import PropTypes from "prop-types";
import { useState } from "react";
import "./Gallery3.css";
import Search from "./Search";
import SignOutButton from "./SignOutButton";

const Gallery3 = ({ images }) => {
  const [draggedImage, setDraggedImage] = useState(null);
  const [imageOrder, setImageOrder] = useState(images);
  const [searchTag, setSearchTag] = useState("");

  const handleDragStart = (e, image) => {
    setDraggedImage(image);
    e.dataTransfer.setData("text/plain", image.id);
  };

  const handleDragEnd = () => {
    setDraggedImage(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImage) => {
    e.preventDefault();

    if (draggedImage && targetImage) {
      const updatedImages = [...imageOrder];
      const draggedIndex = imageOrder.findIndex(
        (img) => img.id === draggedImage.id
      );
      const targetIndex = imageOrder.findIndex(
        (img) => img.id === targetImage.id
      );

      // Swap the positions of the dragged image and the target image
      [updatedImages[draggedIndex], updatedImages[targetIndex]] = [
        updatedImages[targetIndex],
        updatedImages[draggedIndex],
      ];

      setImageOrder(updatedImages);
    }
  };

  const filteredImages = imageOrder.filter((image) =>
    image.tag.includes(searchTag.toLowerCase())
  );

  return (
    <div className="gallery-cont">
      <Search searchTag={searchTag} setSearchTag={setSearchTag} />
      <div className="tags">
        You can search with these Tags: <em>Nature,</em> <em>Food,</em>{" "}
        <em>Sports,</em> <em>Cars</em>
      </div>
      <div className="gallery-container">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className={`gallery-item ${
              draggedImage === image ? "dragging" : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, image)}
          >
            <img
              src={image.url}
              alt={image.alt}
              className={draggedImage === image ? "dragged-over" : ""}
            />
          </div>
        ))}
      </div>
      <SignOutButton />
    </div>
  );
};

Gallery3.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Gallery3;
