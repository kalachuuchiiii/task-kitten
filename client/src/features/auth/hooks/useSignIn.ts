import { useState, type FormEvent } from 'react';
import { signIn, type SignInForm } from '../api/index';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useSession } from './useSession';

export const useSignIn = () => {
    const [form, setForm] = useState<SignInForm>({
        username: '',
        password: ''
    })

    const nav = useNavigate();
    const { getSession } = useSession();

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev, 
            [name]: value
        }))
    }

    const { mutate: handleSignIn, isPending} = useMutation({
        mutationFn: async(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const p = signIn({ ...form});
            toast.promise(p, {
                loading: 'Signing you in...',
                success: 'Sign in successful!',
                error: (err) => getErrorMessage(err)
            })
            return await p;
        },
        onSuccess: async() => {
            await getSession();
            nav('/home');
        }
    })

    return {
        form,
        handleChangeForm,
        handleSignIn,
        isSigningIn: isPending
    }

}