import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <>
      <header className="flex flex-col gap-2 overscroll-none p-4 sticky">
        <div className="flex">
          <Badge className="rounded-full size-8 bg-amber-400">재</Badge>
          Search
          <button className="ml-auto">Camera</button>
        </div>
        <Input placeholder="What do you want to listen to?"></Input>
      </header>
    </>
  );
}
