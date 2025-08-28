import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { seasonDetail } from "../api/tmdb/tmdb";
import LoadingSpinner from "../components/LoadingSpinner";
import { SeasonDetailProps, TvDetailProps } from "../types/tv";
import { getContentId } from "../api/backend/getContent";
import {
  createContentSeason,
  createContentSeries,
} from "../api/backend/createContent";
import { Helmet } from "react-helmet-async";
import { PlatformProvider } from "../types/platformType";

const Season = () => {
  const { number } = useParams();
  const { tv } = useOutletContext<{ tv: TvDetailProps }>();
  const { data: season, isLoading } = useQuery<SeasonDetailProps>({
    queryKey: ["tv", tv.id, "season", number],
    queryFn: () => seasonDetail(tv.id, Number(number)),
    enabled: !!tv,
  });

  const { data: seasonId, refetch } = useQuery<string | null>({
    queryKey: ["TMDB", tv.id, "contentId"],
    queryFn: () =>
      getContentId({
        platformId: PlatformProvider.TMDB,
        id: `season_${season!.id}`,
      }),
    enabled: !!tv && !!season,
    retry: false,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!season) return <div>TV 정보가 없습니다.</div>;

  const saveContent = async () => {
    let seriesId = await getContentId({
      platformId: PlatformProvider.TMDB,
      id: `tv_${tv.id}`,
      throwable: false,
    });
    if (!seriesId) {
      const series = await createContentSeries({
        platformId: PlatformProvider.TMDB,
        data: tv,
      });
      seriesId = series.id;
    }
    const content = await createContentSeason({
      parentId: seriesId,
      platformId: PlatformProvider.TMDB,
      data: season,
      genres: tv.genres,
    });

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
          genres: tv.genres,
          saveSeason: saveContent,
        }}
      />
    </>
  );
};

export default Season;
