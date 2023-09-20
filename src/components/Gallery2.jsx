import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import "./Gallery2.css";
import PropTypes from "prop-types";
import Search from "./Search";
import SignOutButton from "./SignOutButton";

function Gallery2({ galleryImages }) {
  const [images, setImages] = useState(galleryImages);
  const [searchTag, setSearchTag] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);

  useEffect(() => {
    const newFilteredImages = images.filter((image) =>
      image.tag.includes(searchTag.toLowerCase())
    );
    setFilteredImages(newFilteredImages);
  }, [images, searchTag]);

  function handleSearch(tag) {
    setSearchTag(tag);
  }

  function onChange(sourceId, sourceIndex, targetIndex) {
    const nextState = swap(images, sourceIndex, targetIndex);
    setImages(nextState);
  }

  return (
    <div className="galleryApp">
      <Search searchTag={searchTag} setSearchTag={handleSearch} />
      <Box>
        <GridContextProvider onChange={onChange}>
          <div className="container">
            <GridDropZone
              className="dropzone"
              id="items"
              boxesPerRow={4}
              rowHeight={228}
              style={{
                height: 228 * Math.ceil(filteredImages.length / 4),
              }}
            >
              {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                  <GridItem key={image.id}>
                    <div className="grid-item">
                      <div className="grid-item-content">
                        <Card
                          sx={{
                            marginRight: 2,
                            marginBottom: 2,
                            cursor: "-webkit-grab",
                            maxWidth: "100%",
                          }}
                        >
                          <div className="image">
                            <CardMedia
                              component="img"
                              height="90%"
                              image={image.url}
                              alt=""
                            />
                          </div>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {image.tag}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </GridItem>
                ))
              ) : (
                <div className="no-matching-images">
                  No images match the search criteria.
                </div>
              )}
            </GridDropZone>
          </div>
        </GridContextProvider>
      </Box>
      <SignOutButton />
    </div>
  );
}

Gallery2.propTypes = {
  galleryImages: PropTypes.array,
};

export default Gallery2;
