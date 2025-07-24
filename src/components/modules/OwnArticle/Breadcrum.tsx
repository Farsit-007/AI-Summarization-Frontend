"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthServices";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Breadcrum = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useUser();
  const handleLogout = async () => {
    await logout();
    setIsLoading(true);
    router.refresh();
    router.push("/");
  };
  if (isLoading) {
    return <div className="h-16">Loading..</div>;
  }
  return (
    <div className="flex flex-col my-10 sm:flex-row gap-4 items-center justify-end p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between gap-2">
        <Button asChild className="bg-black  cursor-pointer text-white hover:bg-gray-800">
          <Link href="/">All Article</Link>
        </Button>{" "}
        <div className="flex  gap-2">
          <Button asChild className="bg-black cursor-pointer text-white hover:bg-gray-800">
            <Link href="/create-article"> Create Article</Link>
          </Button>{" "}
          <Button
            variant="outline"
            className="border-black text-black cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrum;
