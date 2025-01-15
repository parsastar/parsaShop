import HomePage from "@/components/template/home/Home";
import Shop from "@/components/template/shop/Shop";

export default function Page() {
  return (
    <div className={` py-0 container max-w-[1300px]`}>
      {" "}
      <HomePage />
    </div>
  );
}
