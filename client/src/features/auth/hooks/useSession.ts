import type { Session } from "@/types/session";
import { create } from "zustand";
import { getSession as get_session } from "../api";
import { getErrorMessage } from "@/utils/getErrorMessage";

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
  clearSession: () => {  //used while logging out
    set((state) => ({ 
      ...state,
      ...initialSession,
      isLookingForSession: false
    }));
  },
  getSession: async() => {
    set({ isLookingForSession: true });
   try{ 
     const response = await get_session();
     const { user, accessToken, isAuthenticated } = response.data;

     if(!user) throw new Error('No user found in this session.');
     if(!accessToken) throw new Error('No access token found in this session.')

     set({
      isAuthenticated,
      user,
      accessToken
     })
   }catch(error){
     console.error(getErrorMessage(error))
   }finally{
    set({ isLookingForSession: false });
   }
  }
}));