import { fetchBlogCategories, fetchBlogs } from "@/store/blogSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./cards/BlogCards";

export default function BlogSection() {
  const dispatch = useDispatch();
  const { list, categories, loading, categoryLoading } = useSelector(
    (s) => s.blog
  );

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  const blogSections = [
    {
      id: 1,
      title: "The Fiction You Need to Read in 2026",
      description:
        "From George Saunders to Naomi Ishiguro, here is our pick of the fiction you need to read in 2026.",
      booksimg: "/img/blog/blog-1.webp",
      link: "/",
    },
    {
      id: 2,
      title: "The Romantasy You Need to Read in 2026",
      description:
        "From Sarah A. Parker to Briar Boleyn, here is our pick of the romantasy you need to read in 2026.",
      booksimg: "/img/blog/blog-2.webp",
      link: "/",
    },
    {
      id: 3,
      title: "The Non-Fiction You Need to Read in 2026",
      description:
        "From Mary Berry to Patrick Radden Keefe, here is our pick of the non-fiction you need to read in 2026.",
      booksimg: "/img/blog/blog-2.webp",
      link: "/",
    },
    {
      id: 4,
      title: "The Children's Books You Need to Read in 2026",
      description:
        "From Alice Oseman to Julia Donaldson, here is our pick of the children's books you need to read in 2026.",
      booksimg: "/img/blog/blog-3.webp",
      link: "/",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
