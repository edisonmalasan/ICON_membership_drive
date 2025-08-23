import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useSignupViewModel } from "./SignupViewModel";

export function SignupForm({ className, ...props }) {
  const {
    form,
    loading,
    responseMessage,
    handleChange,
    handleSubmit,
  } = useSignupViewModel();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-10 overflow-hidden z-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground text-balance">
                      Sign up for your ICON account
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      type="text"
                      placeholder="XXXXXXX"
                      maxLength={7}
                      value={form.idNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@slu.edu.ph"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                  </Button>

                  {responseMessage && (
                    <p className="text-center text-sm">{responseMessage}</p>
                  )}

                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="/" className="underline underline-offset-4">
                      Log in
                    </a>
                  </div>
                </div>
              </form>

              <div className="bg-muted relative hidden md:flex items-center justify-center">
                <img
                  src="ICON.png"
                  alt="Image"
                  className="h-110 w-110 object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="/terms-policy?returnTo=/signup">Terms of Service</a>{" "}
            and{" "}
            <a href="/terms-policy?returnTo=/signup">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
