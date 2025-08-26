import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { seasonDetail } from "../api/tmdb/tmdb";
import LoadingSpinner from "../components/LoadingSpinner";
import { SeasonDetailProps, TvDetailProps } from "../types/tv";
import { getPlatformId } from "../api/backend/getPlatform";
import { getContentId } from "../api/backend/getContent";
import {
  createContentSeason,
  createContentSeries,
} from "../api/backend/createContent";
import { Helmet } from "react-helmet-async";

const Season = () => {
  const { number } = useParams();
  const { tv } = useOutletContext<{ tv: TvDetailProps }>();
  const { data: season, isLoading } = useQuery<SeasonDetailProps>({
    queryKey: ["tv", tv.id, "season", number],
    queryFn: () => seasonDetail(tv.id, Number(number)),
    enabled: !!tv,
  });

  const { data: platformId, isLoading: platformIdLoading } = useQuery<
    string | null
  >({
    queryKey: ["platformId", "TMDB"],
    queryFn: () => getPlatformId("TMDB"),
  });

  const { data: seasonId, refetch } = useQuery<string | null>({
    queryKey: ["contentId", "TMDB", tv.id],
    queryFn: () =>
      platformId ? getContentId(platformId, `season_${season!.id}`) : null,
    enabled: !!tv && !!platformId && !!season,
    retry: false,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!season) return <div>TV 정보가 없습니다.</div>;

  if (platformIdLoading || !platformId)
    return <Outlet context={{ season, seasonId }} />;

  const saveContent = async () => {
    let seriesId = await getContentId(platformId, `tv_${tv.id}`, false);
    if (!seriesId) {
      const series = await createContentSeries(platformId, tv);
      seriesId = series.id;
    }
    const content = await createContentSeason(
      seriesId,
      platformId,
      season,
      tv.genres
    );

    if (content) refetch();

    return content.id;
  };

  return (
    <>
      <Helmet>
        <title>{`${tv.name} - ${season.name}`}</title>
        <meta name="description" content="TV season page of Vivre Card" />
      </Helmet>
      <Outlet
        context={{
          season,
          seasonId,
          platformId,
          genres: tv.genres,
          saveSeason: saveContent,
        }}
      />
    </>
  );
};

export default Season;
