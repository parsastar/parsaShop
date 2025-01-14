import { TGetUsers } from "src/types/api/users";
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

const UserList = ({ users }: { users: TGetUsers["users"] }) => {
  const router = useRouter();
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
          {users.map((user) => (
            // <Link className="table-row-group" key={user._id} href={"hey"}>
            <Button
              key={user._id}
              asChild
              className="w-full table-row"
              onClick={() => router.push(`/dashboard/users/${user._id}`)}
              variant={"outline"}
            >
              <TableRow className=" font-normal cursor-pointer" key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.pocket || 0} $</TableCell>
                <TableCell className="text-right">
                  {new Date(user.createdAt)
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

export default UserList;

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
