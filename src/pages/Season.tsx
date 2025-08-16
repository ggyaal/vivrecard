import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { TvProps } from "./Tv";
import { useQuery } from "@tanstack/react-query";
import { seasonDetail } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";

interface PersonProps {
  adult: boolean;
  character: string;
  credit_id: string;
  gender: number;
  id: string;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface CrewProps {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface EpisodeProps {
  air_date: string;
  crew: CrewProps[];
  episode_number: number;
  episode_type: string;
  guest_stars: PersonProps[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface SeasonProps {
  air_date: string;
  episodes: EpisodeProps[];
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  _id: string;
}

const Season = () => {
  const { number } = useParams();
  const { tv } = useOutletContext<{ tv: TvProps }>();
  const { data: season, isLoading } = useQuery<SeasonProps>({
    queryKey: ["tv", tv.id, "season", number],
    queryFn: () => seasonDetail(tv.id, Number(number)),
  });

  if (isLoading) return <LoadingSpinner />;

  if (!season) return <div>TV 정보가 없습니다.</div>;

  return <Outlet context={{ season }} />;
};

export default Season;
