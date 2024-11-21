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

const SignUp = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Bloom Hire Today!</CardTitle>
        <CardDescription>
          Create your account and take the first step toward your dream career.
          Let opportunities bloom with us! 🌟
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your Name" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Email</Label>
          <Input type="email" id="name" placeholder="Enter your Email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="grid w-full items-center gap-2 space-y-1">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Enter your password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Sign Up</Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
