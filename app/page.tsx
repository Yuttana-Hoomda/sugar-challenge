import UserLogin from "@/components/UserLogin";
import Beverage from "./beverage/page";
// import '@/app/notification/message'

export default function Home() {
  return (
    <div className="grid place-items-center h-screen">
      <Beverage />
    </div>
  );
}
