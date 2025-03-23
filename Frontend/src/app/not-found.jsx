import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeftToLine } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex pt-10 pb-[10rem]  flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-destructive" />
        </div>

        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl">404</h1>

        <h2 className="text-3xl font-semibold tracking-tight">
          Page Not Found
        </h2>

        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. The page might
          have been removed, had its name changed, or is temporarily
          unavailable.
        </p>

        <div className="flex justify-center pt-4">
          <Button asChild size="lg">
            <div>
              <ArrowLeftToLine/>
              <Link href="/">Return to Home</Link>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
