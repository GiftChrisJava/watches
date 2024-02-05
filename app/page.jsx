import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text mb-6">
          Malawi Edu Enhancement Programs
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Expand your knowledge and understand complex lessons taught in class
          by watching videos, reading docs and practice quizez
        </p>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
