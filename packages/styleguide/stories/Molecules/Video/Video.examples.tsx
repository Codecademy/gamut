import { Video } from '@codecademy/gamut';

export const VideoWithPlaceholder = () => {
  return (
    <Video
      placeholder="https://i.ytimg.com/vi/1y_kfWUCFDQ/maxresdefault.jpg"
      videoUrl="https://www.youtube.com/watch?v=Yl8yy5tpVIM"
      videoTitle="Workout with Rick Sanchez"
      placeholderImage="https://placekitten.com/400/300"
      autoplay
    />
  );
};

export const VimeoVideo = () => {
  return (
    <Video
      videoUrl="https://vimeo.com/773539409"
      videoTitle="CODECADEMY | Develop Yourself"
    />
  );
};
