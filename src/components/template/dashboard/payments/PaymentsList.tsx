import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TGetPayments } from "src/types/api/payments";

const PaymentsList = ({ payments }: { payments: TGetPayments["payments"] }) => {
  const loweStringSize = (val: string) => {
    return val.length > 40 ? val.substring(0, 40) + "..." : val;
  };
  const router = useRouter();
  console.log("pp", payments);
  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">UserName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address </TableHead>
            <TableHead>total </TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <Button
              key={payment._id}
              asChild
              className="w-full table-row  "
              onClick={() => router.push(`/dashboard/payments/${payment._id}`)}
              variant={"none"}
            >
              <TableRow
                className=" font-normal min-h-[100px] my-10 cursor-pointer"
                key={payment._id}
              >
                <TableCell>{payment.user.name}</TableCell>
                <TableCell>{payment.user.email}</TableCell>
                <TableCell>{payment.user.phoneNumber}</TableCell>
                <TableCell>{loweStringSize(payment.address)}</TableCell>
                <TableCell>{payment.amount || 0} $</TableCell>
                <TableCell className="text-right">
                  {new Date(payment.createdAt)
                    .toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .split("/")
                    .reverse()
                    .join("/")}
                </TableCell>
              </TableRow>
            </Button>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsList;

export const UserListMock = () => {
  const mockUsers = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      role: "Admin",
      createdAt: "2022-01-01",
    },
    {
      _id: "2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phoneNumber: "098-765-4321",
      role: "User",
      createdAt: "2022-02-01",
    },
  ];

  return (
    <div className="">
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Pocket</TableHead>
            <TableHead className="text-right">Joined Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(20)
            .fill(null)
            .map((mock, index) => (
              <TableRow className="cursor-pointer" key={index}>
                {Array(6)
                  .fill(null)
                  .map((cell, index) => (
                    <TableCell key={index}>
                      <Skeleton className="w-[80%] h-5" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
