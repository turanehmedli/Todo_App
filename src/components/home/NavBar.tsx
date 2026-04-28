import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "../../stores/themeStore";

const NavBar = () => {
  const [active, setActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { isDarkmodeOn, toggleDarkmode } = useThemeStore();
  const navigate = useNavigate();
  const { clearTokens } = useAuthStore();

  // dışarı tıklama kontrolü
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setActive(false);

  return (
    <div className="w-full px-4 py-3 flex justify-between items-center relative">
      <NavLink to={'/'}>
        <h2 className="font-bold text-2xl">App</h2>
      </NavLink>

      {/* MENU */}
      <div
        ref={menuRef}
        className={`gap-5 md:flex md:items-center md:ml-29 ${
          active
            ? "flex flex-col absolute top-15 right-0 text-black bg-white border w-70 gap-5 h-100 p-5"
            : "hidden"
        }`}
      >
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-xl font-semibold"
        >
          Home
        </NavLink>

        <NavLink
          to="/createTodo"
          onClick={closeMenu}
          className="text-xl font-semibold"
        >
          Create Todo
        </NavLink>

        <NavLink
          to="/account"
          onClick={closeMenu}
          className="text-xl font-semibold md:hidden"
        >
          Account
        </NavLink>

        <button
          onClick={() => {
            clearTokens();
            closeMenu();
            navigate("/login");
          }}
          className="text-xl font-semibold md:hidden text-start"
        >
          Log out
        </button>

        <button
          onClick={toggleDarkmode}
          className="text-xl text-start font-semibold"
        >
          {isDarkmodeOn ? "Light" : "Dark"}
        </button>
      </div>


      <div className="hidden md:flex gap-5 z-10">
        <button
          onClick={() => {
            clearTokens();
            navigate("/login");
          }}
          className="border px-4 py-2 rounded-lg text-lg font-semibold"
        >
          log Out
        </button>
      </div>

  
      <div
        onClick={() => setActive((prev) => !prev)}
        className="flex md:hidden"
      >
        <Menu />
      </div>
    </div>
  );
};

export default NavBar;