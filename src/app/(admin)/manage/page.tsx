import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      jam
      <Suspense fallback={"Loading..."}>
        {setTimeout(() => {}, 5000) && <span>loaded value</span>}
      </Suspense>
    </div>
  );
}
