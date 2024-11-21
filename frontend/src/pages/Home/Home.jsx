import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bloom Hire | Home</title>
      </Helmet>
      <div>
        Home
        <Button
          onClick={() => {
            toast({
              position: "top-right",
              title: "Scheduled: Catch up ",
              variant: "destructive",
              description: "Friday, February 10, 2023 at 5:57 PM",
              // action: (
              //   // <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              // ),
            });
          }}
          variant="outline"
        >
          Click me
        </Button>
      </div>
    </>
  );
};

export default Home;
