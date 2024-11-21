import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Avatar, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


const UserInfo = () => {
  const { user, logOut, setIsLoading } = useAuth();
  const { photoURL, displayName } = user || {};
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await logOut();
      await axiosSecure.get("/user/logout");
      console.log("Sign out successful");
      navigate("/");
      toast.success("Sign out successful");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <Dropdown>
          <MenuButton>
            <Avatar src={photoURL} />
          </MenuButton>
          <Menu>
            <MenuItem>{displayName}</MenuItem>
            <MenuItem onClick={handleSignOut}>Log out</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default UserInfo;