"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

type FormType = "signin" | "signup";

const authFormSchema = (type : FormType) => {
  return z.object({
    name: type === 'signup' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })
}

const AuthForm = ({type}: {type: FormType}) => {
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type === 'signup') {
        console.log('Signing up', values);
      } else {
        console.log('Signing in', values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was : ${error}`);
    }
  }

  const isSignIn = type === 'signin';

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">Prep</h2>
        </div>

        <h3>Practice Iterviews by yourself</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>

            <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create Account'}</Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}{" "}
          <Link href={!isSignIn ? '/signin' : '/signup'} className="font-bold text-user-primary ml-1">
            {!isSignIn ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AuthForm;
