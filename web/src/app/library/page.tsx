import { Badge } from '@/components/ui/badge';

export default function Library() {
  return (
    <>
      <header className="flex flex-col gap-2 overscroll-none p-4 sticky">
        <div className="flex gap-2">
          <Badge className="rounded-full size-8 bg-amber-400">재</Badge>
          <span className="text-xl font-semibold">Library</span>
        </div>
      </header>
      <div></div>
    </>
  );
}
