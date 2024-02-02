"use server";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addWatch(formData) {
  // getting data from the form
  const model = formData.get("model");
  const brand = formData.get("brand");
  const referenceNumber = formData.get("referenceNumber");

  const cookieStore = cookies();
  const supabase = createClientComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  // check if user is authenticated
  if (!user) {
    console.error("User not authenticated within addWatch server action");
    return;
  }

  // insert data into the table
  const { data, error } = await supabase.from("watches").insert([
    {
      model,
      brand,
      reference_number: referenceNumber,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error("Error inserting data", error);
    return;
  }

  // if success
  revalidatePath("/watch-list");

  return { message: "Success" };
}
