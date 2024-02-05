"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getInitialProgress(videoId) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  // fetch progress data
  const { data: progressData, error } = await supabase
    .from("uservideoprogresses")
    .select("*")
    .eq("user_id", user.id) // Match user ID
    .eq("video_id", videoId); // Match video ID

  if (error) {
    console.error("Error fetching progress", error);
    return;
  }
  return { progressData: progressData };
}
