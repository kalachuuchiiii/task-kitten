
import { create } from "zustand";


import type { Session } from "../types/auth.types";
import { API } from "@/utils";
import { extractErrorMessage } from "@/utils/error";


const initialSession: Omit<Session, "getSession" | "clearSession" | 'setAccessToken'> = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLookingForSession: true,
};

export const useSession = create<Session>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLookingForSession: true,
  setAccessToken: (accessToken: string) => set({ accessToken }),
  clearSession: () => {  //logging out
    set((state) => ({ 
      ...state,
      ...initialSession,
      isLookingForSession: false
    }));
  },
  getSession: async() => {
    set({ isLookingForSession: true });
   try{ 
     const response = await API.get('/auth/session');
     const { user, accessToken, isAuthenticated } = response.data;

     if(!user) throw new Error('No user found in this session.');
     if(!accessToken) throw new Error('No access token found in this session.')

     set({
      isAuthenticated,
      user,
      accessToken
     })
   }catch(error){
     console.error(extractErrorMessage(error))
   }finally{
    set({ isLookingForSession: false });
   }
  }
}));