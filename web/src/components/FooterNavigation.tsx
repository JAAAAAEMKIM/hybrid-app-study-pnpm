'use client';

import {
  faBookAtlas,
  faHome,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const FooterNavigation = () => {
  return (
    <div className="bg-background text-primary flex justify-around align-center border-t-[1px] border-t-border">
      <Link className="h-16 flex place-items-center" href="/">
        <div className="flex flex-col place-content-center text-md gap-2">
          <FontAwesomeIcon icon={faHome} />
          <span className="text-xs">Home</span>
        </div>
      </Link>
      <Link className="h-16 flex place-items-center" href="/search">
        <div className="flex flex-col place-content-center text-md gap-2">
          <FontAwesomeIcon icon={faSearch} />
          <span className="text-xs">Search</span>
        </div>
      </Link>
      <Link className="h-16 flex place-items-center" href="/library">
        <div className="flex flex-col place-content-center text-md gap-2">
          <FontAwesomeIcon icon={faBookAtlas} />
          <span className="text-xs">Library</span>
        </div>
      </Link>
      <Link className="h-16 flex place-items-center" href="/create">
        <div className="flex flex-col place-content-center text-md gap-2">
          <FontAwesomeIcon icon={faPlus} />
          <span className="text-xs">Create</span>
        </div>
      </Link>
    </div>
  );
};

export default FooterNavigation;
