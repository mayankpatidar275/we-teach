import { StaticImageData } from "next/image";
import ActivityCard from "./ActivityCard";

type Activity = {
  id: string;
  title: string;
  imageUrl: StaticImageData;
  category: string;
  activityUrl: string;
};

interface ActivitiesListProps {
  items: Activity[];
}

const ActivitiesList = ({ items }: ActivitiesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          // since we know that this card will be rendered when course is published so we can put the !
          // typescript does not know so gives error.
          <ActivityCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            category={item?.category!}
            activityUrl={item?.activityUrl}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No activities found
        </div>
      )}
    </div>
  );
};

export default ActivitiesList;
