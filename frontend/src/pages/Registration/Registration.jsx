import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./SignIn";

const Registration = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-12 flex flex-col lg:flex-row justify-center items-center gap-8">
      <div className="w-[400px]">
        <h1 className="text-3xl font-bold text-center">Join us</h1>
        <p className="text-center text-gray-500 mt-2">
          Create an account to start using our services.
        </p>
        <img
          src="https://png.pngtree.com/png-vector/20240807/ourlarge/pngtree-programmer-creating-new-projects-png-image_13123814.png"
          className="rounded-md mt-4"
        />
      </div>
      <div className="w-[400px]">
        <Tabs defaultValue="signin" className="w-[400px] mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">sign-in</TabsTrigger>
            <TabsTrigger value="signup">sign-up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignIn />
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Registration;
