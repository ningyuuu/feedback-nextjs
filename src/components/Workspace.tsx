import { getFullUrl } from "@/lib/fetch"

export const Workspace = () => {
  return <div className="flex-grow-1 d-flex">
    <iframe src={getFullUrl('/api/scripts/file/1')} height="100%" width="50%" />
    <div className="h-100 w-50">hi</div>
  </div>
}
