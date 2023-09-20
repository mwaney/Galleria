// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./Gallery.css";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import Search from "./Search";
// import SignOutButton from "./SignOutButton";

// const Gallery = ({ galleryImages }) => {
//   const [imageArrangement, setImageArrangement] = useState(galleryImages);
//   const [searchTag, setSearchTag] = useState("");

//   const filteredImages = imageArrangement.filter((image) =>
//     image.tag.includes(searchTag.toLowerCase())
//   );
//   function handleOnDragEnd(result) {
//     if (!result.destination) return;
//     const items = Array.from(imageArrangement);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setImageArrangement(items);
//   }
//   return (
//     <div className="galleryApp centerColumn">
//       <Search searchTag={searchTag} setSearchTag={setSearchTag} />
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <Droppable droppableId="imageId">
//           {(provided) => (
//             <div
//               className="galleryContainer"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {filteredImages.length > 0 ? (
//                 filteredImages.map((image, index) => (
//                   <Draggable
//                     key={image.id}
//                     draggableId={image.id}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <div
//                         className="image"
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}
//                       >
//                         <img src={image.url} alt="" />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))
//               ) : (
//                 <div className="no-matching-images">
//                   No images match the search criteria.
//                 </div>
//               )}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       <SignOutButton />
//     </div>
//   );
// };

// Gallery.propTypes = {
//   galleryImages: PropTypes.array,
// };

// export default Gallery;

import { useState, useEffect } from "react"; // Import useEffect
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Gallery.css";
import PropTypes from "prop-types";
import Search from "./Search";
import SignOutButton from "./SignOutButton";
import Spinner from "./Spinner"; // Import or create a Spinner component

const Gallery = ({ galleryImages }) => {
  const [imageArrangement, setImageArrangement] = useState(galleryImages);
  const [searchTag, setSearchTag] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(false);
  }, []);

  const filteredImages = imageArrangement.filter((image) =>
    image.tag.includes(searchTag.toLowerCase())
  );

  const [loadedImageCount, setLoadedImageCount] = useState(0);
  useEffect(() => {
    setLoadedImageCount(0);
  }, [filteredImages]);

  function handleImageLoad() {
    // Increment the loadedImageCount when an image loads
    setLoadedImageCount((prevCount) => prevCount + 1);

    if (loadedImageCount === filteredImages.length) {
      setLoading(false);
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(imageArrangement);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setImageArrangement(items);
  }

  return (
    <div className="galleryApp centerColumn">
      <Search searchTag={searchTag} setSearchTag={setSearchTag} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="imageId">
          {(provided) => (
            <div
              className="galleryContainer"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {loading ? ( // Display the spinner while loading
                <Spinner />
              ) : filteredImages.length > 0 ? (
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
                        <img src={image.url} alt="" onLoad={handleImageLoad} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
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
