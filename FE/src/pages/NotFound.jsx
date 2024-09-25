import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button
        onClick={() => navigate("/")}
        className="w-24 absolute bottom-10 hover:opacity-70 transition-all"
      >
        {/* <img src={logoWhite} alt="Logo Premium Portal" /> */}
      </button>
      <h1 className="poppins text-3xl font-bold mb-3 tracking-widest">
        404 Not Found
      </h1>
      <p className="tracking-widest mb-6">This page doesn&apos;t exist</p>
      <button
        onClick={() => navigate("/")}
        className="text-xs underline underline-offset-4 transition-all"
      >
        Back home
      </button>
    </div>
  );
}

export default NotFound;
