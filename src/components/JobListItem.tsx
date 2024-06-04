import { typeJob } from "@/types"
import Image from "next/image"
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png"
import companyLogoUrl from "@/assets/logo.png"
import { Banknote, BriefcaseIcon, Clock, Globe2, MapPin } from "lucide-react"
import { distanceTimeFromNow, formatMoney, relativeData } from "@/lib/utils"
import Badge from "./Badge"

type Props = {
  job: typeJob
}

export default function JobListItem({ job: {
  title,
  locationType,
  location,
  salary,
  companyName,
  aplicationEmail,
  aplicationUrl,
  //companyLogoUrL,
  approved,
  description,
  type,
  createdAt
} }: Props) {
  const formattedSalary = formatMoney(salary)
  const formattedDate = distanceTimeFromNow(createdAt)
  console.log(createdAt);
  return (
    <article className="flex gap-3 border rounded-lg p-5 hover:bg-muted/60 text-slate-500">
      <Image src={companyLogoPlaceholder || companyLogoUrl}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="rounded-lg self-center"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <BriefcaseIcon size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formattedSalary}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {formattedDate}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>
          {type}
        </Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {formattedDate}
        </span>
      </div>

    </article>
  )
}


