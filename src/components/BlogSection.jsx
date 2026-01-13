import Link from "next/link";

export default function BlogSection() {
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
        {blogSections.map((section) => (
          <Link key={section.id} href={section.link}>
            <div className="flex flex-col items-start">
              <div className="grid mb-4">
                <div className="relative w-full h-full mb-4">
                  <img
                    src={section.booksimg}
                    alt={section.title}
                    className="object-cover rounded shadow"
                  />
                </div>
              </div>

              <h3 className="text-lg font-serif mb-2 text-black">
                {section.title}
              </h3>

              <p className="text-gray-700 mb-2">{section.description}</p>

              <button className="text-black font-bold mt-auto">➔</button>

              <hr className="mt-4 border-t border-gray-300 w-full" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
