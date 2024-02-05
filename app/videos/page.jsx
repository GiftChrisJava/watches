import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import VideoPlayer from "../components/VideoPlayer";

export default async function VideoList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  console.log(user);

  const { data: videos, er } = await supabase.from("videos").select("*");

  if (er) {
    console.error("Error fetching videos");
  }
  console.log(videos);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="flex justify-between items-start">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            My Videos
          </h1>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign out
            </button>
          </form>
        </div>

        <div className="">
          <VideoPlayer video={videos} />
        </div>
      </div>
    </div>
  );
}
