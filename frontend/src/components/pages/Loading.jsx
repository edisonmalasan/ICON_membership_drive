import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Loading({ className, message = "Loading...", ...props }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-10 overflow-hidden z-10">
        <div className="w-full max-w-sm md:max-w-md">
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center gap-6">
                  {/* ICON Logo */}
                  <div className="relative">
                    <img
                      src="ICON.png"
                      alt="ICON Logo"
                      className="h-20 w-20 object-contain animate-pulse"
                    />
                  </div>

                  {/* Loading Spinner */}
                  <div className="relative">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>

                  {/* Loading Text */}
                  <div className="space-y-2">
                    <h1 className="text-xl font-semibold text-foreground">
                      {message}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Please wait while we process your request
                    </p>
                  </div>

                  {/* Loading Dots Animation */}
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optional additional info */}
            <div className="text-center text-xs text-muted-foreground">
              <p>This should only take a moment...</p>
            </div>
          </div>
        </div>

        {/* Background decoration - consistent with other pages */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
    </ThemeProvider>
  );
}

// Alternative compact version for use as a component
export function LoadingSpinner({ size = "md", message }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <div className={`border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin ${sizeClasses[size]}`}></div>
      {message && (
        <p className="text-sm text-muted-foreground text-center">{message}</p>
      )}
    </div>
  );
}

// Inline loading component for buttons and small areas
export function InlineLoading({ className, ...props }) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <div className="w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
