import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Gallery.css";
import PropTypes from "prop-types";
import { useState } from "react";
import Search from "./Search";
import SignOutButton from "./SignOutButton";

const Gallery = ({ galleryImages }) => {
  const [imageArrangement, setImageArrangement] = useState(galleryImages);
  const [searchTag, setSearchTag] = useState("");

  const filteredImages = imageArrangement.filter((image) =>
    image.tag.includes(searchTag.toLowerCase())
  );
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(imageArrangement);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImageArrangement(items);
  }
  return (
    <div>
      <Search searchTag={searchTag} setSearchTag={setSearchTag} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="imageId">
          {(provided) => (
            <div
              className="galleryContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredImages.length > 0 ? (
                filteredImages.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="image"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img src={image.url} alt="" />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                // Display a message when no images match the search criteria
                <div className="no-matching-images">
                  No images match the search criteria.
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <SignOutButton />
    </div>
  );
};

Gallery.propTypes = {
  galleryImages: PropTypes.array,
};

export default Gallery;