import DashBoardUser from "@/components/template/dashboard/user/DashBoardUser";
const page = ({ params }: { params: { id: string } }) => {
  return <DashBoardUser userId={params.id} />;
};

export default page;
