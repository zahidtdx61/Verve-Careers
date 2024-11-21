import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Registration = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-12 flex flex-col lg:flex-row justify-center gap-8">
      <div className="w-full lg:w-[35%] p-4">
        <h1 className="text-3xl font-bold text-center">Join us</h1>
        <p className="text-center text-gray-500 mt-2">
          Create an account to start using our services.
        </p>
        <img
          src="https://png.pngtree.com/png-vector/20240807/ourlarge/pngtree-programmer-creating-new-projects-png-image_13123814.png"
          className="rounded-md mt-4"
        />
      </div>
      <div className="w-full lg:w-[40%] p-4">
        <Tabs defaultValue="signin" className="mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignIn />
          </TabsContent>
          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Registration;
