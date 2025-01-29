"use server";

import { revalidatePath } from "next/cache";

export default async function RevalidateSite(path) {
    revalidatePath(path || "/");
}
