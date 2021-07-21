export default function Card({ id, src, title, artist }) {
  return (
    <div className="w-1/2 lg:w-1/5">
      <div className="card">
        <img src={src} className="img-thumbnail" alt={title} />
        <div className="card-body">
          <p className="card-text">
            <strong>Title</strong> :{" "}
            <span className="font-normal ease-in-out">{title}</span>
          </p>
          <p className="card-text">
            <strong>Artist</strong> :{" "}
            <span className="font-normal ease-in-out">{artist}</span>
          </p>
          <a className="btn btn-warning hover:shadow-lg" href={`#${id}`}>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
