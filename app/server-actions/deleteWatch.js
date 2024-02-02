import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteWatch(formData) {
  // getting data from the form
  const watchId = formData.get("id");

  const cookieStore = cookies();
  const supabase = createClientComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  // check if user is authenticated
  if (!user) {
    console.error("User not authenticated within deleteWatch server action");
    return;
  }

  // dalete watch with this id for this authenticated user
  const { error } = await supabase.from("watches").delete().match({
    id: watchId,
    user_id: user.id,
  });
  if (error) {
    console.error("Error deleting data", error);
    return;
  }

  // if success
  revalidatePath("/watch-list");

  return { message: "Success" };
}
