import { Video } from '@codecademy/gamut';

export const VideoWithPlaceholder = () => {
  return (
    <Video
      videoUrl="https://player.vimeo.com/video/188237476"
      videoTitle="A Dream Within a Dream"
      placeholderImage="https://placekitten.com/400/300"
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
