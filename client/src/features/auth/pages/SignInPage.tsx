
import { NavLink } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { TaskKitten } from "../../../components/ui/TaskKitten";
import { useSignIn } from "../hooks/useSignIn";




const SignInPage = () => {

  const { handleSignIn, handleChangeForm, form, isSigningIn } = useSignIn();

  return (
    <form id="signin-form" onSubmit={(e) => handleSignIn(e)} className="mx-auto space-y-5   align-y ">
      <div className="space-y-2 text-2xl flex items-center gap-4">
        <img
          src="/cat22.png "
          className="rounded-full bg-white object-cover mx-auto  outline-4 outline-offset-4 outline-indigo-600 size-20 overflow-hidden"
        />
        <TaskKitten size = {10} />
      </div>
      <div className="space-y-1  w-10/12">
        <label>Username</label>
        <Input required form="signin-form" name = 'username' value = {form.username} onChange={handleChangeForm}  placeholder="Your @username" />
      </div>
      <div className="space-y-1  w-10/12">
        <label>Password</label>
        <Input required form="signin-form" name = 'password' value = {form.password} onChange={handleChangeForm} placeholder="Your password" type="password" />
      </div>
      <div>
        <p className="text-xs">
          Doesn't have an account?{" "}
          <NavLink className={"text-indigo-500 hover:underline"} to="/sign-up">
            Create here!
          </NavLink>
        </p>
      </div>
      <button form="signin-form" type = 'submit' disabled = {isSigningIn} className="p-2 w-full align-x button-bg rounded-lg hover:bg-muted outline-1 outline-black/20 shadow-md">
        <img src="/star108.gif" /> Sign in!
      </button>
    </form>
  );
}

export default SignInPage;
