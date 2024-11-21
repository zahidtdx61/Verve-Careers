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

const SignIn = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>
          Please sign in to access your account and explore new opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Email</Label>
          <Input type="email" id="name" placeholder="Enter your Email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Password</Label>
          <Input
            type="password"
            id="username"
            placeholder="Enter your password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Log In</Button>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
