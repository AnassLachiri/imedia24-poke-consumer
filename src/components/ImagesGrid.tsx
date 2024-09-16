import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import axios from "axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

const IMAGES_ENDPOINT = "https://picsum.photos/v2/list";

interface Image {
    id: number,
    author: string,
    width: number,
    height: number,
    url: string,
    download_url: string
}

const ImagesGrid = () => {
    const [images, setImages] = useState<Image[]>([]);

  async function getImages(page: number) {

    try {
      const res = await axios.get<Image[]>(IMAGES_ENDPOINT, {
        params: {
          page,
          limit: 10
        }
      });
      setImages([...images, ...res.data]);
    } catch (error) {
        console.log(error);
    }
  }

    return (
        <InfiniteScroll
      pageStart={0}
      loadMore={getImages}
      hasMore={true}
      loader={
        <div className="loader" key="loader">
          Loading ...
        </div>
      }
    >
      <Grid container spacing={2}>
        {images.map(image => (
          <Grid key={image.id}>
            <Image image={image} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
    );
}

const cardMediaStyle = {
    height: 0,
    paddingTop: "56.25%" // 16:9
  };
  
  function Image({ image }) {
    return (
      <Card>
        <CardMedia
          style={cardMediaStyle}
          image="https://i.picsum.photos/id/160/3200/2119.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {image.author}
          </Typography>
        </CardContent>
      </Card>
    );
  }
export default ImagesGrid;