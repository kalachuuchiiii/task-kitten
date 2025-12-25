
import { create } from "zustand";


import type { Session } from "../types/auth.types";
import { API } from "@/utils";
import { extractErrorCodeKeys } from "@/utils/error";


const initialSession: Omit<Session, "getSession" | "clearSession" | 'setAccessToken'> = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLookingForSession: true,
  totalOwnedTasks: 0
};

export const useSession = create<Session>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLookingForSession: true,
  totalOwnedTasks: 0,
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
     const { user, accessToken, isAuthenticated, totalOwnedTasks } = response.data;

     if(!user) throw new Error('No user found in this session.');
     if(!accessToken) throw new Error('No access token found in this session.')

     set({
      isAuthenticated,
      user,
      totalOwnedTasks,
      accessToken
     })
   }catch(error){
     console.error(extractErrorCodeKeys(error))
   }finally{
    set({ isLookingForSession: false });
   }
  }
}));