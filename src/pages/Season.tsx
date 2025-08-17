import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { seasonDetail } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { SeasonDetailProps, TvDetailProps } from "../types/tv";

const Season = () => {
  const { number } = useParams();
  const { tv } = useOutletContext<{ tv: TvDetailProps }>();
  const { data: season, isLoading } = useQuery<SeasonDetailProps>({
    queryKey: ["tv", tv.id, "season", number],
    queryFn: () => seasonDetail(tv.id, Number(number)),
  });

  if (isLoading) return <LoadingSpinner />;

  if (!season) return <div>TV 정보가 없습니다.</div>;

  return <Outlet context={{ season }} />;
};

export default Season;
