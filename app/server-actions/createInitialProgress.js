"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function createInitialProgress(videoId, duration) {
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

  const { data, error } = await supabase.from("uservideoprogresses").insert([
    {
      duration: duration,
      progress_time: 0,
      user_id: user.id,
      video_id: videoId,
    },
  ]);

  if (error) {
    console.error("Error inserting data", error);
    return;
  }

  return { message: "Success" };
}
