import { NavLink } from "react-router-dom";
import { Input } from "../../../components/ui/input";
import { TaskKitten } from "../../../components/ui/TaskKitten";
import { useSignUp } from "../hooks/useSignUp";

const SignUpPage = () => {
  const { form, handleChangeForm, handleSignUp, isCreatingAccount } =
    useSignUp();

  return (
    <form
      onSubmit={(e) => handleSignUp(e)}
      className="mx-auto space-y-5 align-y  "
    >
      <div className="text-4xl">
        <TaskKitten size={20} />
      </div>
      <div className="space-y-1 w-10/12">
        <label>Username</label>
        <Input
          required
          name="username"
          value={form.username}
          onChange={handleChangeForm}
          className="w-full"
          placeholder="@bunbunny"
        />
        <p className="text-xs opacity-30">
          6-36 characters. (a-Z, 1-10) Special cases{" "}
          <span className="text-red-600">NOT</span> allowed
        </p>
      </div>
      <div className="space-y-1 w-10/12">
        <label>Password</label>
        <Input
          required
          name="password"
          value={form.password}
          onChange={handleChangeForm}
          placeholder="Make it hard to guess!"
          className="w-full"
          type="password"
        />
        <p className="text-xs opacity-30">
          8-36 characters. (a-Z, 1-10) Special cases allowed
        </p>
      </div>
      <div className="space-y-1  w-10/12">
        <label>Confirm password</label>
        <Input
          required
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChangeForm}
          placeholder="Confirm your password"
          type="password"
        />
      </div>
      <div>
        <p className="text-xs ">
          Already have an account?{" "}
          <NavLink
            className={"text-indigo-500 mx-1 hover:underline"}
            to="/sign-in"
          >
            Sign in here!
          </NavLink>
        </p>
      </div>
      <button
        type="submit"
        disabled={isCreatingAccount}
        className="p-2 w-full align-x button-bg rounded-lg hover:bg-muted outline-1 outline-black/20 shadow-md"
      >
        <img src="/star108.gif" /> Create account
      </button>
    </form>
  );
};

export default SignUpPage;
