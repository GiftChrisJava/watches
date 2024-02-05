"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function updateProgressOnServer(videoId, currentTime) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error(
      "User is not authenticated within createInitialProgress server action"
    );
    return;
  }

  // make an update
  const { data, error } = await supabase
    .from("uservideoprogresses")
    .update({
      progress_time: currentTime, // Set new progress time
    })
    .match({
      user_id: user.id, // Match based on user ID
      video_id: videoId, // Match based on video ID
    });

  if (error) {
    console.error("Error updating data", error);
    return;
  }

  console.log("updated");
  return { message: "Success" };
}
