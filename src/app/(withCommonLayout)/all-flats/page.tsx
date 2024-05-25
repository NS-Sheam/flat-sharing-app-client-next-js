"use server";
import { isLoggedIn } from "@/services/auth.services";
import { redirect } from "next/navigation";

import React from "react";

const AllFlatPage = () => {
  if (!isLoggedIn()) {
    redirect("/login");
  }
  return (
    <div>
      <h1>AllFlatPage</h1>
    </div>
  );
};

export default AllFlatPage;
