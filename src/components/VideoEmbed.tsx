type VideoEmbedProps = {
  src: string;
  title: string;
  eager?: boolean;
};

export default function VideoEmbed({
  src,
  title,
  eager = false,
}: VideoEmbedProps) {
  return (
    <div className="video-frame">
      <iframe
        src={src}
        title={title}
        loading={eager ? "eager" : "lazy"}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
