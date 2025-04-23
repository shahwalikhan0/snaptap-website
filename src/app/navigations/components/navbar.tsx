const Navbar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const NAVBAR_ITEMS = [
    "Home",
    "Profile",
    "Settings",
    "Payment",
    "Help",
    "Favourites",
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <ul>
        {NAVBAR_ITEMS.map((item) => (
          <li key={item} className="mx-4">
            {item}
          </li>
        ))}
        {isLoggedIn ? <li>Login</li> : <li>Register</li>}
      </ul>
    </div>
  );
};

export default Navbar;
