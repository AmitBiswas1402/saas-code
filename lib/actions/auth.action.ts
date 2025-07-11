"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  console.log("SignUp Params:", { uid, name, email });

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    console.log("User record exists:", userRecord.exists);

    if (userRecord.exists) {
      console.warn("User already exists with UID:", uid);
      return { success: false, error: "User already exists" };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    console.log("User successfully created:", { uid, name, email });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-in-use") {
      return { success: false, error: "Email already in use" };
    }

    return {
      success: false,
      error: "Error creating user",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return { success: false, error: "User not found" };
    }

    await setSessionCookie(idToken);
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, error: "Error logging in" };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAuthticated() {
  const user = await getCurrentUser();

  return !!user;
}
