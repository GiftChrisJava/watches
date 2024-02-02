import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text mb-6">
          Welcome To Watch List
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Your personal space to curate and manage a wishList of your favourite
          watches. Sign in to create, view, edit and delete items from your
          watchlist
        </p>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
