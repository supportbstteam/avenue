"use client";
import { fetchUserCategories } from "@/store/userCategorySlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();

  const fetchCategory = async()=>{
    dispatch(fetchUserCategories());
  }

  useEffect(()=>{
    fetchCategory();
  },[]);
  return (
    <div>
      <div>Category: </div>
    </div>
  );
};

export default Category;
