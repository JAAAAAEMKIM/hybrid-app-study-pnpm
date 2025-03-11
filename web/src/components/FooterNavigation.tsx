"use client";

import Link from "next/link";

const FooterNavigation = () => {
  return (
    <>
      <Link className="h-16 flex place-items-center" href="/">
        Home
      </Link>
      <Link className="h-16 flex place-items-center" href="/search">
        Search
      </Link>
      <Link className="h-16 flex place-items-center" href="/library">
        Library
      </Link>
      <Link className="h-16 flex place-items-center" href="/create">
        Create
      </Link>
    </>
  );
};

export default FooterNavigation;
