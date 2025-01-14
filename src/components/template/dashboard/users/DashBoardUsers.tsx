"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import UserFilters from "./parts/UserFilters";
import { useGetAllUsersQuery } from "@/hooks/queries/users";
import UserList, { UserListMock } from "./parts/UserList";
import { PaginationList, PaginationMock } from "@/components/shared/Pagination";

export default function DashBoardUsers() {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams({
    page: searchParams.get("page") || "1",
    pageSize: searchParams.get("pageSize") || "20",
    search: searchParams.get("search") || "",
  });

  const { data, isLoading, isError, refetch, isPending, status } =
    useGetAllUsersQuery({
      queryParams: queryParams.toString(),
    });
  useEffect(() => {
    refetch();
  }, [searchParams]);
  return (
    <div className="flex  flex-col py-10 gap-10">
      <UserFilters
        totalUsers={data?.pagination?.totalUsers?.toString() || "0"}
        searchParams={searchParams.toString()}
      />
      <div className="w-full min-h-[400px]">
        {isError && <p>There Is An Error While Fetching Products</p>}
        {status == "pending" ? (
          <UserListMock />
        ) : data && data.users.length > 0 ? (
          <UserList users={data.users} />
        ) : (
          <p className="w-full text-center text-primary text-3xl font-semibold my-[200px] ">
            No Users Found
          </p>
        )}
      </div>
      {status === "success" ? (
        <PaginationList
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
        />
      ) : (
        <PaginationMock />
      )}
    </div>
  );
}
