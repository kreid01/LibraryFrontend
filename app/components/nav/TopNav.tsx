import Link from "next/link";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../../slices/userSlice";

interface Props {
  setLogin: () => void;
}

export const TopNav: React.FC<Props> = ({ setLogin }) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jwtData");
      if (saved != "undefined") {
        const initialValue = JSON.parse(saved as any);
        dispatch(setUser(initialValue));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("jwtData", JSON.stringify(user));
  }, [user]);

  const signoutUser = () => {
    setUser({ token: null, userId: null, isAuth: false });
  };

  return (
    <nav className="w-[100vw] h-10 text-white font-medium bg-blue-400 flex justify-items-start">
      <div className="ml-auto text-md mr-6">
        <Link className="mx-1" href="/newbook">
          New Book |
        </Link>
        <Link className="mx-1" href="/admin">
          Admin |
        </Link>
        {user.isAuth ? (
          <>
            <Link className="mx-1" href="/account">
              Account |
            </Link>
            <button onClick={signoutUser}>Signout</button>
          </>
        ) : (
          <>
            <Link className="mx-1" href="/registration">
              Create Account |
            </Link>
            <button onClick={setLogin}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};
