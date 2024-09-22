import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Google = ({from}) => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        const googleUser = result.user;
        const role = "user";
        const user = {
          name: googleUser.displayName,
          role: role,
          email: googleUser.email,
        };

        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Added to database",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="divider"></div>
      <div
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center shadow-lg duration-700 hover:shadow-[#5572e6] shadow-[#3b3737] gap-2  py-3 my-2 text-xl font-semibold text-blue-700 bg-white border rounded-lg "
      >
        <FcGoogle /> Login With Google
      </div>
    </div>
  );
};

export default Google;
