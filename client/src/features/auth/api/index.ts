import API from "@/utils/axios-instance";

export type SignInForm = { username: string; password: string };
export type SignUpForm = SignInForm & { confirmPassword: string };



 export const signIn = (signInForm: SignInForm) => API.post("/auth/sign-in", { ...signInForm });
 export const signUp = (signUpForm: SignUpForm) => API.post("/auth/sign-up", { ...signUpForm });
 export const getSession = () => API.get("/auth/session");
 export const signOut = () => API.post('/auth/sign-out');
