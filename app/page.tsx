import Image from "next/image";
import LoginForm from "@/app/components/auth/page";
import Test from "@/app/index";
import Register from '@/app/components/register/page'

export default function Home() {
  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <Register />
    </div>
  );
}
